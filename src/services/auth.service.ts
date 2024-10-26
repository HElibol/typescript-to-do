import UserModel, {IUser} from '../models/user.model';
import RefreshTokenModel, {IRefreshToken} from '../models/token.model';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.utils';
import jwt from "jsonwebtoken";

class AuthService  {
    public async register(username: string, password: string, email: string): Promise<IUser> {
      const newUser: IUser = { username, password, email } as IUser;
      const user = new UserModel(newUser);
      return await user.save();
    }
  
    public async validateUser(username: string, password: string) {
        const user = await UserModel.findOne({ username });

        if(!user) return false;

        const userId = user._id    

        const isPasswordValid = await user.comparePassword(password);

        if(!isPasswordValid) return false;

        const refreshTokenRecord = await RefreshTokenModel.findOne({user: userId})
        
        // bu mantıkla bir cihazda çalışır başka yerde giriş varsa yeni acces token alamaz
        // postman ile sürekli giriş spamlanabilir(Rate limiter eklendi);
        if(refreshTokenRecord){
            await RefreshTokenModel.deleteOne({ _id: refreshTokenRecord._id });
        }

        const refreshToken = generateRefreshToken(user._id);
        const accessToken = generateAccessToken(user._id);

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); 
        
        const refreshTokenM = new RefreshTokenModel({
            token: refreshToken, 
            user: userId,
            expiresAt
        });
    
        await refreshTokenM.save();   
        
        return {accessToken, refreshToken};
    }

    public async logout(user: string): Promise<boolean> {
        try {
            const deletedToken = await RefreshTokenModel.findOneAndDelete({ user: user });
            return !!deletedToken;
        } catch (error) {
            console.error('Logout error:', error);
            return false;
        }
    }

    public async refreshAccessTokenService(refreshToken: string): Promise<string | null>{
        try {
            const savedToken = await RefreshTokenModel.findOne({ token: refreshToken });
            if (!savedToken) {
                return null;
            }
            if (savedToken.expiresAt < new Date()) {
                await savedToken.deleteOne({ _id: savedToken._id });
                return null;
            }
           
            // verify doğrudan bir promise dönmez. önüne await eklemk mümkün değil.
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