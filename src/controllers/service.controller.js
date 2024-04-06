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
export const getTotalMonthMeasure = async (req, res) => {
  try {
    const { code } = req.params;
    const { startDate, endDate } = req.body;

    const totalMeasure = await Service.aggregate([
      {
        $match: {
          serial: code,
          createdAt: {
            $gte: new Date(new Date(startDate).setHours(0, 0, 0, 0)), //It sets the time at 00:00:00:000
            $lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)) //It sets the time at 23:59:59:999
          }
        },
      },
      {
        $group: {
          _id: null,
          totalMeasure: { $sum: "$measurement" }
        }
      },
    ])

    const total = totalMeasure.length > 0 ? totalMeasure[0].totalMeasure : 0;

    res.json({ totalMeasure: total });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' })
  }
};