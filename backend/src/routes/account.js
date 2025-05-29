"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_1 = require("../controllars/account");
const multer_1 = __importDefault(require("../middleware/multer"));
const router = express_1.default.Router();
router.get('/get-all', account_1.getAllAccounts);
router.put('/update-img/:id', multer_1.default.single('file'), account_1.updateProfileImg);
router.put('/update-cover/:id', multer_1.default.single('file'), account_1.updateCover);
router.put('/toggle-follow', account_1.toggleFollow);
router.route('/:id')
    .patch(account_1.getAccountMidd, account_1.patchAccount)
    .delete(account_1.deleteAccount);
exports.default = router;
