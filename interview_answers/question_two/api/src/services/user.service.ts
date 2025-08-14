import users from "../data/user";
import { LoginDto } from "../dtos/login.dto";
import { User } from "../models/user.model";

export const findAllUsers = (): User[] => {
    return users;
};

export const login = (data: LoginDto): User | null => {
    const user = users.find(
        (u) => u.email === data.email && u.password === data.password
    );

    if (!user) {
        console.log("Invalid Username or Password");
        return null;
    }

    return user;
};
