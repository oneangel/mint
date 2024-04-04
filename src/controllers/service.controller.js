import { Service } from "../models/models.js";

//Creates a new user
export const registerService = async (req, res) => {
  console.log(req.body);
  const { id, serial, measurement, createdAt } =
    req.body;

  try {
    const newService = new Service({
      id,
      serial,
      measurement,
      createdAt
    });

    const saveService = await newService.save();
    res.send(saveService);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Gets user's services
export const getTotalMeasure = async (req, res) => {
  try {
    const { code } = req.params;



    const totalMeasure = await Service.aggregate([
      {
        $match: {
          serial: code,
        },
      },
      {
        $group: {
          _id: null,
          totalMeasure: { $sum: "$measurement" }
        }
      },
    ])
    res.json(totalMeasure);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' })
  }
};