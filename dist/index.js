"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const getBookedTimes_1 = __importDefault(require("./controllers/getBookedTimes"));
const bookOrder_1 = __importDefault(require("./controllers/bookOrder"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// Use Morgan middleware
app.use((0, morgan_1.default)('dev')); // 'dev' format logs concise output with color coding
app.get('/', (req, res) => {
    res.send('Server is running...');
});
app.post('/api/getBookedTimes', getBookedTimes_1.default);
app.post('/api/bookOrder', bookOrder_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
