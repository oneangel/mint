import { Service, TariffE, TariffW } from "../models/models.js";

//Creates a new user
export const registerService = async (req, res) => {
  console.log(req.body);
  const { id, serial, measurement, type, createdAt } =
    req.body;

  try {
    const newService = new Service({
      id,
      serial,
      measurement,
      type,
      createdAt
    });

    const saveService = await newService.save();
    res.send(saveService);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Gets user's services
export const getTotalEMonthMeasure = async (req, res) => {
  try {
    const { code } = req.params;
    const { startDate, endDate } = req.body;

    const totalMeasure = await Service.aggregate([
      {
        $match: {
          serial: code,
          type: "electricity",
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

//Gets tariff cost of the month
export const getTarrifCost = async (req, res) => {
  try {
    const { code } = req.params;
    const { startDate, endDate, month } = req.body;

    const tariff = await TariffE.findOne({ month });

    const totalMeasure = await Service.aggregate([
      {
        $match: {
          serial: code,
          type: "electricity",
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

    const totalKw = totalMeasure.length > 0 ? totalMeasure[0].totalMeasure : 0;
    const { basic, middle, excedent } = tariff.tariffs;

    const totalPay =
      totalKw <= basic.limit
        ? totalKw * basic.cost
        : totalKw <= basic.limit + middle.limit
          ? basic.limit * basic.cost + (totalKw - basic.limit) * middle.cost
          : basic.limit * basic.cost + middle.limit * middle.cost + (totalKw - basic.limit - middle.limit) * excedent.cost;

    res.json({ total: totalPay });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' })
  }
};

///get/tariff/water/cost/:code
export const getTarrifWaterCost = async (req, res) => {
  try {
    const { code } = req.params;
    const { startDate, endDate } = req.body;

    console.log(code);

    const totalMeasure = await Service.aggregate([
      {
        $match: {
          serial: code,
          type: "water",
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
    ]);
    console.log(totalMeasure);
    const cubicMeters = totalMeasure[0].totalMeasure / 1000;

    const tariff = await TariffW.findOne({
      range_from: { $lte: cubicMeters },
      range_to: { $gte: cubicMeters }
    });

    const totalPay = cubicMeters * tariff.percentage;

    res.json({ totalPay, measure: totalMeasure[0].totalMeasure });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' })
  }
};