"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notification_1 = require("../controllars/notification");
const router = express_1.default.Router();
router.get('/my-notifications/:id', notification_1.myNotifications);
router.delete('/delete-my-notifications/:id', notification_1.deleteMyNotifications);
router.put('/mark-notes-as-seen/:id', notification_1.markNotesAsSeen);
exports.default = router;
