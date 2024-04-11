import { Client, Meter } from "../models/models.js";

//Creates a new user
export const registerMeter = async (req, res) => {
  console.log(req.body);
  const { serial, status, createdAt } = req.body;

  try {
    const newMeter = new Meter({
      serial,
      status,
      createdAt,
    });

    const saveMeter = await newMeter.save();
    res.send(saveMeter);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//gets an existing meter
export const getMeter = async (req, res) => {
  const { code } = req.params;
  try {
    const existingMeter = await Meter.findOne({ serial: code });

    if (!existingMeter || existingMeter.status === false) {
      return res.status(404).send("Meter not found");
    }

    res.send(existingMeter);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting Meter");
  }
};

export const linkMeter = async (req, res) => {
  const { serial, username } = req.body;
  try {
    const existingMeter = await Meter.findOne({ serial });
    if (!existingMeter || existingMeter.status === false) {
      return res.status(404).send("Meter not found");
    }

    const existingClient = await Client.findOne({ username });
    if (!existingClient) {
      return res.status(404).send("User not found");
    }

    if (existingClient.meter != "") {
      return res.status(404).send("User already linked with another meter");
    }

    if (existingClient.meter === "") {
      existingClient.meter = serial;
      const updatedClient = await existingClient.save();
      res.send(updatedClient)
    } else {
      res.status(200);
    }

  } catch (error) {
    res.status(500).send("Error linking meter");
  }
}