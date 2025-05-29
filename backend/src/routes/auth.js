"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllars/auth");
const router = express_1.default.Router();
router.post('/sign-in', auth_1.signIn);
router.post('/sign-up', auth_1.signUp);
router.get('/log-out', auth_1.logOut);
exports.default = router;
