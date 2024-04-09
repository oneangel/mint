import { TariffW } from "../models/models.js";

//Creates a new user
export const registerTariffW = async (req, res) => {
  const { range_from, range_to, percentage } = req.body;

  try {
    const newTariffW = new TariffW({ range_from, range_to, percentage });

    const saveTariffW = await newTariffW.save();
    res.send(saveTariffW);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTariffW = async (req, res) => {
  const { code } = req.params;

  const cubicMeters = code / 1000;
  try {
    const existingTariffW = await TariffW.findOne({
      range_from: { $lte: cubicMeters },
      range_to: { $gte: cubicMeters }
    });

    if (!existingTariffW || existingTariffW.status === false) {
      return res.status(404).send("Tariff not found");
    }

    res.send(existingTariffW);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting Tariff water");
  }
};

