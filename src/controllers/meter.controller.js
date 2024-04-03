import { Meter } from "../models/models.js";

//Create a new user
export const registerMeter = async (req, res) => {
  console.log(req.body);
  const { serial, type, status, createdAt, user } =
    req.body;

  try {
    const newMeter = new Meter({
      serial,
      type,
      status,
      createdAt,
      user
    });

    const saveMeter = await newMeter.save();
    res.send(saveMeter);

  } catch (error) {
    console.log('Hola');
    res.status(500).json({ error: error.message });
  }
};