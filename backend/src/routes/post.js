"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_1 = require("../controllars/post");
const router = express_1.default.Router();
const multer_1 = __importDefault(require("../middleware/multer"));
router.post('/create-post', multer_1.default.single('file'), post_1.createPost);
router.get('/get-posts', post_1.getAllPosts);
router.post('/toggle-like', post_1.toggleLike);
router.delete('/delete-post', post_1.deleteOnePost);
exports.default = router;
