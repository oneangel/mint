import { TariffE } from "../models/models.js";

//Creates a new user
export const registerTariff = async (req, res) => {
  console.log(req.body);
  const { month, tariffs } = req.body;

  try {
    const newTariffE = new TariffE({ month, tariffs });

    const saveTariffE = await newTariffE.save();
    res.send(saveTariffE);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTariff = async (req, res) => {
  const { code } = req.params;
  try {
    const existingTariffE = await TariffE.findOne({ month: code });

    if (!existingTariffE || existingTariffE.status === false) {
      return res.status(404).send("Tariff not found");
    }

    res.send(existingTariffE);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting TariffE");
  }
};