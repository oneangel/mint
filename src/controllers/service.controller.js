import { Service } from "../models/models.js";

//Create a new user
export const registerService = async (req, res) => {
  console.log(req.body);
  const { serial, type, status, createdAt, user } =
    req.body;

  try {
    const newService = new Service({
      serial,
      type,
      status,
      createdAt,
      user
    });

    const saveService = await newService.save();
    res.send(saveService);

  } catch (error) {
    console.log('Hola');
    res.status(500).json({ error: error.message });
  }
};