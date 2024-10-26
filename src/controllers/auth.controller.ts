import { Request, Response } from 'express';
import AuthService  from '../services/auth.service';


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
                res.status(200).json({ message: 'Login successful', accessToken, refreshToken });

            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Login failed', error });
        }
    }

    public async logout(req: Request, res: Response): Promise<void>{
        const {userId} = req.user;
        try{
            const isLogout = await AuthService.logout(userId);
            if(!isLogout){
                console.log(">>>>>>>>>",!isLogout);
                res.status(400).json({message: 'Logout failed!!!'})
            }

            res.status(200).json({message: 'Logout successful'})

        }catch(error){
            res.status(400).json({error, message: 'Logout failed'})
        }

    }
            
    public async refreshAccessToken(req: Request, res: Response):Promise<void>{
        const refreshToken = req.body.refreshToken;

        if (!refreshToken) {
            res.status(400).json({ message: 'Refresh token is required' });
            return
        }

        try {
            const newAccessToken = await AuthService.refreshAccessTokenService(refreshToken);
            
            if (!newAccessToken) {
                res.status(403).json({ message: 'Invalid or expired refresh token' });
                return
            }

            res.status(201).json({ accessToken: newAccessToken });

        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }
}

export default new UserController();
