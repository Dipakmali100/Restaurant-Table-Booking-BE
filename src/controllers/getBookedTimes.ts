import client from "../utils/prismaClient";
import { Request, Response } from "express";

const getBookedTimes = async (req: Request, res: Response): Promise<any> => {
  try {
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({
        success: false,
        error: "Please provide a date",
      });
    }

    // Convert date to IST midnight time for comparison
    const now = new Date(date);
    const midNightDateTime = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
    midNightDateTime.setUTCHours(0, 0, 0, 0);
    console.log("Midnight Date Time: ", midNightDateTime);

    const bookedTimes = await client.booking.findMany({
      where: {
        date: midNightDateTime,
      },
      select: {
        time: true,
      },
    });

    const formattedBookedTimes = bookedTimes.map((time) => time.time);

    return res.status(200).json({
      success: true,
      data: formattedBookedTimes,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export default getBookedTimes;
