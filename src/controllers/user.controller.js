import { User } from "../models/models.js";
import bcryptjs from "bcryptjs";
import cookie from 'cookie-parser';
import { getToken } from "../config/jwt.config.js"

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Buscar el usuario en la base de datos
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid data" });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid data" });
    }

    // Generar el token JWT
    const token = getToken({ username });
    res.cookie('Authorization', token).json({ token, username });
    res.status(200);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Create a new user
export const register = async (req, res) => {
  console.log(req.body);
  const { username, password, role } =
    req.body;

  try {
    const passwordHash = await bcryptjs.hash(password, 10);
    const newUser = new User({
      username,
      password: passwordHash,
      role,
    });

    const saveUser = await newUser.save();
    res.send(saveUser);

  } catch (error) {
    console.log('Hola');
    res.status(500).json({ error: error.message });
  }
};

//Delete a user logically 
export const deleteUser = async (req, res) => {
  try {
    const { code } = req.params;

    const existingUser = await User.findOne({ username: code });

    if (!existingUser) {
      return res.status(404).send("User not found");
    }

    existingUser.status = false;
    const updatedUser = await existingUser.save();

    res.send(updatedUser);
  } catch (error) {
    res.status(500).send("User cannot be deleted")
  }
}

//Update an existing user
export const updateUser = async (req, res) => {
  const { code } = req.params;
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username: code });
    const passwordHash = await bcryptjs.hash(password, 10);

    if (!existingUser) {
      return res.status(404).send("User not found");
    }

    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      return res.status(409).send("Username already exists.");
    }

    console.log(existingUser);
    existingUser.username = username;
    existingUser.password = passwordHash;

    const updatedUser = await existingUser.save();

    res.send(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("User cannot be updated");
  }
};

//Get an existing user
export const getUser = async (req, res) => {
  const { code } = req.params;
  try {
    const existingUser = await User.findOne({ username: code });

    if (!existingUser || existingUser.status === false) {
      return res.status(404).send("User not found");
    }

    res.send(existingUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting user");
  }
};