"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userSchema = joi_1.default.object({
    username: joi_1.default.string().min(3).max(30).required().messages({
        'string.base': 'username must be a string',
        'string.empty': 'username is required',
        'string.min': 'username must be at least 3 characters long',
        'string.max': 'username must be at most 30 characters long',
        'any': 'username is any'
    }),
    email: joi_1.default.string().email().required().messages({
        'string.base': 'email must be a string',
        'string.empty': 'email is required',
        'string.email': 'email must be a valid email',
        'any': 'email is any'
    }),
    password: joi_1.default.string().min(6).max(30).required().messages({
        'string.base': 'password must be a string',
        'string.empty': 'password is required',
        'string.min': 'password must be at least 6 characters long',
        'string.max': 'password must be at most 30 characters long',
        'any.required': 'password is any'
    })
});
