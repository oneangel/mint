import { Service, TariffE, TariffW } from "../models/models.js";
import { startOfDay, endOfDay, parseISO, formatISO } from "date-fns";

//Creates a new user
export const registerService = async (req, res) => {
  const { serial, measurement, type, createdAt } =
    req.body;

  try {
    const searchDate = parseISO(createdAt);
    const startOfDayDate = startOfDay(searchDate);
    const endOfDayDate = endOfDay(searchDate);

    const existingService = await Service.findOne({
      serial, type, createdAt: {
        $gte: new Date(new Date(startOfDayDate).setHours(0, 0, 0, 0)),
        $lte: new Date(new Date(endOfDayDate).setHours(23, 59, 59, 999))
      }
    });

    console.log('Servicio existente');
    console.log(existingService);

    if (!existingService) {
      const newService = new Service({
        serial,
        measurement,
        type,
        createdAt
      });

      const saveService = await newService.save();
      res.send(saveService);
    } else {
      existingService.measurement = measurement;

      const updatedService = await existingService.save();
      res.send(updatedService)
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Gets user's services
export const getTotalEMonthMeasure = async (req, res) => {
  try {
    const { code } = req.params;
    const { startDate, endDate } = req.body;

    const existingService = await Service.findOne({ serial: code });
    if (!existingService) {
      res.send(null);
    }

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

    if (!tariff) {
      return res.status(404).send("Tariff not found");
    }

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
    ]);
    console.log('Total');
    console.log(totalMeasure);

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

    const existingService = await Service.find({ serial: code, type: "water" });

    if (existingService.length === 0) {
      return res.status(404).send("Services not found");
    }

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

    if (totalMeasure.length === 0) {
      return res.status(404).send("TotalMeasure not found");
    }

    const total = totalMeasure.length > 0 ? totalMeasure[0].totalMeasure : 0;
    const cubicMeters = totalMeasure[0].totalMeasure / 1000;

    if (cubicMeters >= 1) {
      const tariff = await TariffW.findOne({
        range_from: { $lte: cubicMeters },
        range_to: { $gte: cubicMeters }
      });
      const totalPay = cubicMeters * tariff.percentage;

      res.json({ totalPay, measure: total });
    } else if (cubicMeters >= 0 && cubicMeters < 1) {
      res.json({ totalPay: 0, measure: total });
    } else {
      res.json({ totalPay: 0, measure: 0 });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' })
  }
};