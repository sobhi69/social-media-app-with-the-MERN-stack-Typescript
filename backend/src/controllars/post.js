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
exports.toggleLike = exports.deleteOnePost = exports.getPostMidd = exports.getAllPosts = exports.createPost = void 0;
const cloudinary_1 = __importDefault(require("../lib/cloudinary"));
const post_1 = __importDefault(require("../model/post"));
const account_1 = __importDefault(require("../model/account"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { account, caption } = req.body;
    const file = req.file;
    if (!caption || !account) {
        res.status(400).json({ message: "please provide caption and user id!" });
        return;
    }
    let fileUrl;
    if (file) {
        const cloudResponse = yield cloudinary_1.default.uploader.upload(file.path);
        fileUrl = cloudResponse.secure_url;
    }
    const newPost = yield post_1.default.create({
        caption,
        account,
        photo: (file === null || file === void 0 ? void 0 : file.mimetype.startsWith('image')) ? fileUrl : '',
        video: (file === null || file === void 0 ? void 0 : file.mimetype.startsWith('video')) ? fileUrl : ''
    });
    const updatedAccount = yield account_1.default.findByIdAndUpdate(account, { $push: { posts: newPost._id } }, { new: true });
    try {
        res.status(201).json({ newPost, updatedAccount });
    }
    catch (error) {
        console.error(`error in register ${error}`);
        res.status(500).json({ message: error.message });
    }
});
exports.createPost = createPost;
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allPosts = yield post_1.default.find();
    try {
        res.json(allPosts);
    }
    catch (error) {
        console.error(`error in getAllPosts`);
        res.status(500).json({ message: error.message });
    }
});
exports.getAllPosts = getAllPosts;
const getPostMidd = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let post;
    try {
        post = yield post_1.default.findById(req.params.id);
        if (!post) {
            res.status(404).json({ message: `post with id: ${req.params.id} dosn't exist in DB` });
            return;
        }
    }
    catch (error) {
        console.error(`error in getPostMidd`);
        res.status(500).json({ message: error.message });
        return;
    }
    req.post = post;
    next();
});
exports.getPostMidd = getPostMidd;
const deleteOnePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, userId } = req.query;
    try {
        const deletedPost = yield post_1.default.findByIdAndDelete(postId);
        const updatedAccount = yield account_1.default.findByIdAndUpdate(userId, { $pull: { posts: deletedPost === null || deletedPost === void 0 ? void 0 : deletedPost._id } }, { new: true });
        res.json(updatedAccount);
    }
    catch (error) {
        console.error(`error in deleteOnePost`);
        res.status(500).json({ message: error.message });
        return;
    }
});
exports.deleteOnePost = deleteOnePost;
const toggleLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, likesArr } = req.body;
    try {
        const updatedPost = yield post_1.default.findByIdAndUpdate(postId, { $set: { likes: likesArr } });
        res.json(updatedPost);
    }
    catch (error) {
        console.error(`error in deleteOnePost`);
        res.status(500).json({ message: error.message });
        return;
    }
});
exports.toggleLike = toggleLike;
