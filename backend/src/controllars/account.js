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
exports.deleteAccount = exports.toggleFollow = exports.updateCover = exports.updateProfileImg = exports.patchAccount = exports.getAccountMidd = exports.getAllAccounts = void 0;
const account_1 = __importDefault(require("../model/account"));
const notification_1 = __importDefault(require("../model/notification"));
const cloudinary_1 = __importDefault(require("../lib/cloudinary"));
const getAllAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allAccounts = yield account_1.default.find();
    try {
        res.json(allAccounts);
    }
    catch (error) {
        console.error(`error in getAllAccounts`);
        res.status(500).json({ message: error.message });
    }
});
exports.getAllAccounts = getAllAccounts;
const getAccountMidd = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let account;
    try {
        account = yield account_1.default.findById(req.params.id);
        if (!account) {
            res.status(404).json({ message: `account with id: ${req.params.id} dosn't exist in DB` });
            return;
        }
    }
    catch (error) {
        console.error(`error in getAccountMidd`);
        res.status(500).json({ message: error.message });
        return;
    }
    req.account = account;
    next();
});
exports.getAccountMidd = getAccountMidd;
const patchAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { country, firstname, lastname, livesIn, worksAt, gender, relationshipStatus } = req.body;
    const account = req.account;
    try {
        const updatedUser = yield account_1.default.findByIdAndUpdate(account._id, {
            $set: {
                firstname,
                lastname,
                country,
                livesIn,
                worksAt,
                gender,
                relationshipStatus
            }
        }, { new: true });
        res.json(updatedUser);
    }
    catch (error) {
        console.error(`error in patchAccount`);
        res.status(500).json({ message: error.message });
    }
});
exports.patchAccount = patchAccount;
const updateProfileImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accountId = req.params.id;
    const file = req.file;
    let secret;
    if (file) {
        const cloudRes = yield cloudinary_1.default.uploader.upload(file.path);
        secret = cloudRes.secure_url;
    }
    try {
        const updatedAccount = yield account_1.default.findByIdAndUpdate(accountId, { $set: { profileImg: secret } }, { new: true });
        res.json(updatedAccount);
    }
    catch (error) {
        console.error(`error in updateProfileImg`);
        res.status(500).json({ message: error.message });
    }
});
exports.updateProfileImg = updateProfileImg;
const updateCover = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accountId = req.params.id;
    const file = req.file;
    let secret;
    if (file) {
        const cloudRes = yield cloudinary_1.default.uploader.upload(file.path);
        secret = cloudRes.secure_url;
    }
    try {
        const updatedAccount = yield account_1.default.findByIdAndUpdate(accountId, { $set: { coverImg: secret } }, { new: true });
        res.json(updatedAccount);
    }
    catch (error) {
        console.error(`error in updateProfileImg`);
        res.status(500).json({ message: error.message });
    }
});
exports.updateCover = updateCover;
const toggleFollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { curId, targetId, curFollowingArr, targetFollowersArr, noteType } = req.body;
    try {
        const curAccount = yield account_1.default.findByIdAndUpdate(curId, { $set: { following: curFollowingArr } }, { new: true });
        const targetAccount = yield account_1.default.findByIdAndUpdate(targetId, { $set: { followers: targetFollowersArr } }, { new: true });
        yield notification_1.default.create({
            from: curId,
            to: targetId,
            toAcc: curAccount,
            fromAcc: targetAccount,
            seen: false,
            noteType: noteType
        });
        res.json(curAccount);
    }
    catch (error) {
        console.error(`error in toggleFollow`);
        res.status(500).json({ message: error.message });
    }
});
exports.toggleFollow = toggleFollow;
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accountId = req.params.id;
    try {
        yield account_1.default.findByIdAndDelete(accountId);
        res.json({ message: "deleted!" });
    }
    catch (error) {
        console.error(`error in deleteAccount`);
        res.status(500).json({ message: error.message });
    }
});
exports.deleteAccount = deleteAccount;
