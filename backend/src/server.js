"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// environment variables
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const connectToDb_1 = require("./lib/connectToDb");
const cors_1 = __importDefault(require("cors"));
const corsOptions_1 = require("./lib/corsOptions");
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)(corsOptions_1.corsOptions));
const account_1 = __importDefault(require("./routes/account"));
const auth_1 = __importDefault(require("./routes/auth"));
const post_1 = __importDefault(require("./routes/post"));
const notification_1 = __importDefault(require("./routes/notification"));
// routes
app.use('/api/account', account_1.default);
app.use('/api/auth', auth_1.default);
app.use('/api/post', post_1.default);
app.use('/api/notification', notification_1.default);
// http://localhost:3070/api/auth
(0, connectToDb_1.connectToDb)();
connectToDb_1.connection.once('open', () => {
    console.log(`connected to Database`);
    app.listen(port, () => console.log(`web is alive at http://localhost:${port}`));
});
