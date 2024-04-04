import { Meter } from "../models/models.js";

//Creates a new user
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

//gets an existing meter
export const getMeter = async (req, res) => {
  const { username, serial, type } = req.body;
  try {
    const existingMeter = await Meter.findOne({ user: username, serial, type });

    if (!existingMeter || existingMeter.status === false) {
      return res.status(404).send("Meter not found");
    }

    res.send(existingMeter);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting Meter");
  }
};