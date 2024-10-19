import bcrypt from 'bcrypt';
import UserModel, {IUser} from '../models/user.model';
import RefreshTokenModel, {IRefreshToken} from '../models/token.model';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.utils';
import jwt from "jsonwebtoken";

class AuthService  {
    public async register(username: string, password: string, email: string): Promise<IUser> {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser: IUser = { username, password: hashedPassword, email } as IUser;
      const user = new UserModel(newUser);
      return await user.save();
    }
  
    public async validateUser(username: string, password: string) {
        const user = await UserModel.findOne({ username });

        if(!user) return false;
        
        
        const refreshToken = generateRefreshToken(user._id);
        const accessToken = generateAccessToken(user._id);

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); 
        const userId = user._id    
        const refreshTokenM = new RefreshTokenModel({
            token: refreshToken, 
            user: userId,
            expiresAt
        });
    
        await refreshTokenM.save();   
        
        return {accessToken, refreshToken};
    }

    public async refreshAccessTokenService(refreshToken: string): Promise<string | null>{
        try {
            const savedToken = await RefreshTokenModel.findOne({ token: refreshToken });
            if (!savedToken) {
                return null;
            }

            if (savedToken.expiresAt < new Date()) {
                return null;
            }

            return new Promise((resolve, reject) => {
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: any, decoded: any) => {
                    if (err) {
                        reject(null);
                    } else {
                        const newAccessToken = generateAccessToken(decoded.userId);
                        resolve(newAccessToken);
                    }
                });
            });
        } catch (error) {
            console.error('Error in refresh token service:', error);
            return null;
        }
    }
}


export default new AuthService ();