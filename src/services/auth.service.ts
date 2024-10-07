import bcrypt from 'bcrypt';
import UserRepositroy from '../repositories/user.repository';
import { IUser } from '../models/user.model';

class UserService {
    public async register(username: string, password: string): Promise<IUser> {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser: IUser = { username, password: hashedPassword } as IUser;
      return await UserRepositroy.createUser(newUser);
    }
  
    public async validateUser(username: string, password: string): Promise<boolean> {
        const user = await UserRepositroy.findByUsername(username);
        if(!user) return false;
        return await bcrypt.compare(password, user.password);
    }
}

export default new UserService();