import bcrypt from 'bcrypt';
import UserModel, {IUser} from '../models/user.model';

class UserService {
    public async register(username: string, password: string, email: string): Promise<IUser> {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser: IUser = { username, password: hashedPassword, email } as IUser;
      const user = new UserModel(newUser);
      return await user.save();
    }
  
    public async validateUser(username: string, password: string): Promise<boolean> {
        const user = await UserModel.findOne({ username });
        if(!user) return false;
        return await bcrypt.compare(password, user.password);
    }
}

export default new UserService();