"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const getBookedTimes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const bookedTimes = yield prismaClient_1.default.booking.findMany({
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
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
});
exports.default = getBookedTimes;
