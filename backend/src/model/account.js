"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const accountSchema = new mongoose_1.default.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        enum: { message: "please provide the gender!", values: ['male', 'female'] }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        min: 6,
        required: true
    },
    token: {
        type: String,
        default: ""
    },
    posts: {
        type: Array,
        default: [],
    },
    followers: {
        type: [String],
        default: []
    },
    following: {
        type: [String],
        default: []
    },
    worksAt: {
        type: String,
        default: "",
        trim: true
    },
    country: {
        type: String,
        default: "",
        trim: true
    },
    livesIn: {
        type: String,
        default: "",
        trim: true
    },
    relationshipStatus: {
        type: String,
        default: "",
    },
    profileImg: {
        type: String,
        default: undefined
    },
    coverImg: {
        type: String,
        default: undefined
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('Account', accountSchema);
