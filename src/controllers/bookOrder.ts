import client from "../utils/prismaClient";
import { Request, Response } from "express";

const bookOrder = async (req: Request, res: Response): Promise<any> => {
    try {
        const { date, time, guests, name, email, phone } = req.body;

        if (!date || !time || !guests || !name || !email || !phone) {
            return res.status(400).json({
                success: false,
                error: "Please provide all the details",
            });
        }

        // Convert date to IST midnight time for comparison
        const now = new Date(date);
        const midNightDateTime = new Date(now.getTime()+5.5*60*60*1000);
        midNightDateTime.setUTCHours(0, 0, 0, 0);
        console.log("Midnight Date Time: ", midNightDateTime);

        if (isNaN(midNightDateTime.getTime())) {
            return res.status(400).json({
                success: false,
                error: "Invalid date format. Please provide a valid date.",
            });
        }

        const isAlreadyBooked = await client.booking.findFirst({
            where: {
                date: midNightDateTime,
                time,
            },
        });

        if (isAlreadyBooked) {
            return res.status(400).json({
                success: false,
                error: "Oops! This time slot just got booked. Please choose another time slot",
            });
        }

        const currentTimeAccordingToIST = new Date(
            new Date().getTime() + 5.5 * 60 * 60 * 1000
        );

        const booking = await client.booking.create({
            data: {
                date: midNightDateTime,
                time,
                guests,
                name,
                email,
                phone,
                createdAt: currentTimeAccordingToIST,
                updatedAt: currentTimeAccordingToIST,
            },
        });

        return res.status(200).json({
            success: true,
            data: booking,
        });
    } catch (err: any) {
        console.error('Prisma Error:', err);
        return res.status(500).json({
            success: false,
            error: err.message || 'Internal Server Error',
        });
    }
};

export default bookOrder;
