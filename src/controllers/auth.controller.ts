import { Request, Response } from 'express';
import UserService from '../services/auth.service';

class UserController {
    public async register(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;
        try {
            const newUser = await UserService.register(username, password);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: 'User registration failed', error });
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;
        try {
            const isValid = await UserService.validateUser(username, password);
            if (isValid) {
                
                res.status(200).json({ message: 'Login successful' });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Login failed', error });
        }
    }
}

export default new UserController();
