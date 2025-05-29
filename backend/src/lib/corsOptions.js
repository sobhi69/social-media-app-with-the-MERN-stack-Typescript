"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const allowedOrigins = ['http://localhost:3070', "http://localhost:5173"];
exports.corsOptions = {
    origin: (origin, cb) => {
        if (!origin || allowedOrigins.indexOf(origin) != -1) {
            cb(null, true);
        }
        else {
            cb(new Error('Error, not allowed from Cors'));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true
};
