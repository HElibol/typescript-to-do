import jwt from 'jsonwebtoken';

//any geçici çözümü

const generateAccessToken = (userId: any) => {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET as string, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
    });
};

const generateRefreshToken = (userId: any) => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET as string, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
    });
};

export { generateAccessToken, generateRefreshToken };
