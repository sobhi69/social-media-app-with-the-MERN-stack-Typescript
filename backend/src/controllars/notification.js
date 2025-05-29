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
exports.markNotesAsSeen = exports.deleteMyNotifications = exports.myNotifications = void 0;
const notification_1 = __importDefault(require("../model/notification"));
const myNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const curId = req.params.id;
    try {
        const notifications = yield notification_1.default.find({ to: curId }).sort({ 'createdAt': 'desc' });
        res.json(notifications);
    }
    catch (error) {
        console.error(`error in myNotifications ${error}`);
        res.status(500).json({ message: error.message });
    }
});
exports.myNotifications = myNotifications;
const deleteMyNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const curId = req.params.id;
    try {
        yield notification_1.default.deleteMany({ to: curId });
        res.json({ message: "delete seccussfully" });
    }
    catch (error) {
        console.error(`error in myNotifications ${error}`);
        res.status(500).json({ message: error.message });
    }
});
exports.deleteMyNotifications = deleteMyNotifications;
const markNotesAsSeen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const curId = req.params.id;
    try {
        const notificationsIds = yield notification_1.default.find({ to: curId }, { _id: 1 });
        yield notification_1.default.updateMany({ _id: { $in: notificationsIds } }, { $set: { seen: true } });
        res.json({ message: "updated" });
    }
    catch (error) {
        console.error(`error in markNotesAsSeen ${error}`);
        res.status(500).json({ message: error.message });
    }
});
exports.markNotesAsSeen = markNotesAsSeen;
