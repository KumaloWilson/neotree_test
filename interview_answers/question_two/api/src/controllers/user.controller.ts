import { Request, Response } from 'express';
import { findAllUsers, login } from '../services/user.service';
import { LoginDto } from '../dtos/login.dto';




export const getUsers = (req: Request, res: Response) => {
    const users = findAllUsers();

    res.json(users);
}

export const loginUser = (req: Request, res: Response) => {
    const email = req.params.email;
    const password = req.params.password;

    
    if(!email){
        res.status(400).json(
            {
                "error":"email is required"
            }
        )
    }


    if(!password){
        res.status(400).json(
            {
                "error":"password is required"
            }
        )
    }
    
    const loginData: LoginDto = {
        email: email,
        password: password
    }


    const user = login(loginData);

    res.json(user);
}