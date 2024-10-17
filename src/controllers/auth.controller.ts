import { Request, Response } from 'express';
import AuthService  from '../services/auth.service';
import RefreshToken from '../models/token.model';

class UserController {
    public async register(req: Request, res: Response):Promise<void> {
        const { username, password, email } = req.body;
        try {
            const newUser = await AuthService.register(username, password, email);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: 'User registration failed', error });
        }
    }

    public async login(req: Request, res: Response):Promise<void> {
        const { username, password } = req.body;
        try {
            const isValid = await AuthService.validateUser(username, password);
            if (isValid) {
                const accessToken = isValid.accessToken;
                const refreshToken = isValid.refreshToken;

                res.cookie("token", refreshToken);
                res.status(200).json({ message: 'Login successful', accessToken });

            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Login failed', error });
        }
    } 
    
    public async refreshAccessToken(req: Request, res: Response){
        const accessToken = req;
    }
}

export default new UserController();
