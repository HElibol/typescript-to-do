import UserModel, {IUser} from '../models/user.model';

class UserRepository {
    public async createUser(userData: IUser): Promise<IUser>{
        const user = new UserModel(userData);
        return await user.save();
    }

    public async findByUsername(username: string): Promise<IUser | null> {
        return await UserModel.findOne({ username });
    }
}

export default new UserRepository();