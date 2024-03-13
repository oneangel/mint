import { User, Client } from "../models/models.js";
import { sendEmail } from '../config/mailer.js';
import { getToken, getTokenData } from "../config/jwt.config.js";

//Create a new client
export const registerClient = async (req, res) => {
	console.log(req.body);
	const { username, email, phone, firstname, lastname, totalExpense, totalIncome, status, createdAt, verify } =
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
			totalExpense,
			totalIncome,
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
	const { username, email, phone, firstName, lastName, gender } = req.body;

	try {
		const existingClient = await Client.findOne({ username: code });

		if (!existingClient) {
			return res.status(404).send("Client not found");
		}

		existingClient.username = username;
		existingClient.email = email;
		existingClient.phone = phone;
		existingClient.firstName = firstName;
		existingClient.lastName = lastName;
		existingClient.gender = gender;

		const updatedClient = await existingClient.save();

		res.send(updatedClient);
	} catch (error) {
		console.error(error);
		res.status(500).send("Client cannot be updated");
	}
};

//Update totalIncome
export const updateTotalIncome = async (req, res) => {
	const { code } = req.params;
	const { totalIncome } = req.body;

	try {
		const existingClient = await Client.findOne({ username: code });

		if (!existingClient) {
			return res.status(404).send("Client not found");
		}

		existingClient.totalIncome = totalIncome;

		const updatedClient = await existingClient.save();

		res.send(updatedClient);
	} catch (error) {
		console.error(error);
		res.status(500).send("Total income cannot be updated");
	}
};

//Update totalExpense
export const updateTotalExpense = async (req, res) => {
	const { code } = req.params;
	const { totalExpense } = req.body;

	try {
		const existingClient = await Client.findOne({ username: code });

		if (!existingClient) {
			return res.status(404).send("Client not found");
		}

		existingClient.totalExpense = totalExpense;

		const updatedClient = await existingClient.save();

		res.send(updatedClient);
	} catch (error) {
		console.error(error);
		res.status(500).send("Total expense cannot be updated");
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
		const existingClient = await User.findOne({ username: code });

		if (!existingClient || existingClient.status === false) {
			return res.status(404).send("Client not found");
		}

		res.send(existingClient);
	} catch (error) {
		console.error(error);
		res.status(500).send("Error getting client info");
	}
};