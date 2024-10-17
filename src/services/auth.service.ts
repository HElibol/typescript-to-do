import bcrypt from 'bcrypt';
import UserModel, {IUser} from '../models/user.model';
import RefreshToken, {IRefreshToken} from '../models/token.model';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.utils';

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
        const refreshTokenM = new RefreshToken({
            token: refreshToken, 
            user: userId,
            expiresAt
        });
    
        await refreshTokenM.save();   
        
        return {accessToken, refreshToken};
    }

    public tokenService(resfreshToken: string){
        
    }
}


export default new AuthService ();