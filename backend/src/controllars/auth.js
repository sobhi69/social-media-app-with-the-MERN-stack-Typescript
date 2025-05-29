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
exports.logOut = exports.signUp = exports.signIn = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const account_1 = __importDefault(require("../model/account"));
const generateToken_1 = require("../lib/generateToken");
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const foundAccount = yield account_1.default.findOne({ email: email });
    if (!foundAccount) {
        res.status(404).json({ message: "email doen't exist in db!" });
        return;
    }
    const matchPsw = yield bcrypt_1.default.compare(password, foundAccount.password);
    if (!matchPsw) {
        res.status(400).json({ message: "wrong password!" });
        return;
    }
    // jwt token 
    const token = (0, generateToken_1.generateToken)(String(foundAccount._id));
    try {
        const accountToSend = yield account_1.default.findByIdAndUpdate(foundAccount._id, { $set: { token } }, { new: true });
        res.json(accountToSend);
    }
    catch (error) {
        console.error(`error in register ${error}`);
        res.status(500).json({ message: error.message });
    }
});
exports.signIn = signIn;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, password, email, gender } = req.body;
    if (!firstname ||
        !lastname ||
        !email ||
        !password) {
        res.status(400).json({ message: "please fill out the entire form" });
        return;
    }
    const conflictEmail = yield account_1.default.findOne({ email: email });
    if (conflictEmail) {
        res.status(409).json({ message: "Please enter diffrent email, this email already exists!" });
        return;
    }
    const hashedPwd = yield bcrypt_1.default.hash(password, 10);
    const profile = gender == 'male' ? 'https://cdn2.iconfinder.com/data/icons/picons-basic-1/57/basic1-114_user_man-512.png'
        : "data:image/jpeg;base64,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";
    const newAccount = yield account_1.default.create({
        firstname,
        lastname,
        email,
        password: hashedPwd,
        gender,
        profileImg: profile,
        coverImg: "https://leratomonareng.co.za/wp-content/uploads/2021/03/192adf06PCF91kCYu1nPLQg.jpeg"
    });
    const token = (0, generateToken_1.generateToken)(String(newAccount._id));
    try {
        const accountToSend = yield account_1.default.findByIdAndUpdate(newAccount._id, { $set: { token } }, { new: true }).select('-password');
        res.status(201).json(accountToSend);
    }
    catch (error) {
        console.error(`error in register ${error}`);
        res.status(500).json({ message: error.message });
    }
});
exports.signUp = signUp;
const logOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ message: "logged out seccessfully!" });
    }
    catch (error) {
        console.error(`error in logOut`);
        res.status(500).json({ message: error.message });
    }
});
exports.logOut = logOut;
