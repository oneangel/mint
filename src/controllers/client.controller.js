import { User, Client, Meter } from "../models/models.js";
import { sendEmail } from '../config/mailer.js';
import { getToken, getTokenData } from "../config/jwt.config.js";
import { uploadImage } from "../middlewares/cloudinary.middleware.js";

//Create a new client
export const registerClient = async (req, res) => {
	console.log(req.body);
	const { username, email, phone, firstname, lastname, status, createdAt, verify } =
		req.body;

	try {

		const existingUser = await User.findOne({ username });

		if (!existingUser) {
			return res.status(404).send("User not found");
		}

		const newClient = new Client({
			username,
			email,
			phone,
			firstname,
			lastname,
			status,
			createdAt,
			verify
		});

		const saveClient = await newClient.save();
		const token = getToken({ username: username, email: email });
		sendEmail(saveClient, token);
		res.send(token);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

//Delete an existing client
export const deleteClient = async (req, res) => {
	try {
		const { code } = req.params;

		const existingClient = await Client.findOne({ username: code });

		if (!existingClient || existingClient.status === "false") {
			return res.status(404).send("Client not found");
		}

		existingClient.status = false;
		const updatedClient = await existingClient.save();
		res.send(updatedClient);
	} catch (error) {
		res.status(500).send("Client cannot be deleted")
	}
}

//Update an existing client
export const updateClient = async (req, res) => {
	const { code } = req.params;
	const { username, email, meter } = req.body;

	try {
		const existingClient = await Client.findOne({ username: code });

		if (!existingClient) {
			return res.status(404).send("Client not found");
		}

		const existingMeter = await Meter.findOne({ serial: meter });
		if (existingMeter) {
			return res.status(409).send("Meter not found.");
		}

		existingClient.username = username;
		existingClient.email = email;
		existingClient.meter = meter;


		const updatedClient = await existingClient.save();

		res.send(updatedClient);
	} catch (error) {
		console.error(error);
		res.status(500).send("Client cannot be updated");
	}
};

//Verify client account
export const verifyAccount = async (req, res) => {
	//get token
	const { token } = req.params;

	try {
		// Verifica si no hay token
		if (!token) {
			return res.status(401).json({ message: 'No token, authorization denied' });
		}

		//verify data
		const data = await getTokenData(token) || null;

		if (data === null) {
			res.send("Error getting data");
		}

		const { username } = data.data;
		//check user
		const user = await User.findOne({ username });

		if (!user) {
			return res.status(404).send("User not found");
		}

		const existingClient = await Client.findOne({ username });
		existingClient.verify = true;

		const updatedClient = await existingClient.save();

		res.send('User was updated succesfully');
	} catch (error) {
		res.status(401).json({ message: 'Token is not valid' });
	}
};

//Get an existing client
export const getClient = async (req, res) => {
	const { code } = req.params;
	try {
		const existingClient = await Client.findOne({ username: code });

		if (!existingClient || existingClient.status === false) {
			return res.status(404).send("Client not found");
		}
		// Convertir el buffer de avatar a una cadena base64
		const avatarBase64 = existingClient.avatar.toString('base64');
		const userDataWithAvatar = { ...existingClient.toObject(), avatar: avatarBase64 };

		// Enviar los datos del usuario con la imagen del avatar en base64
		res.json(userDataWithAvatar);
	} catch (error) {
		console.error(error);
		res.status(500).send("Error getting client info");
	}
};

//Update an existing user
export const updateImage = async (req, res) => {
	const { code } = req.params;

	try {
		const existingUser = await Client.findOne({ username: code });

		if (!existingUser) {
			return res.status(404).send("User not found");
		}

		if (req.files?.image) {
			try {
				const result = await uploadImage(req.files.image.tempFilePath);
				console.log("Resultado de uploadImage:", result);
				existingUser.avatar = result.secure_url;
			} catch (error) {
				console.error("Error al subir la imagen:", error);
			}
		}

		const updatedUser = await existingUser.save();

		res.send(updatedUser);
	} catch (error) {
		console.error(error);
		res.status(500).send("User cannot be updated");
	}
};