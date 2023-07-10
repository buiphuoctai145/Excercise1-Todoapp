import { User } from '../models/user';

const validUser: User[] = [
    { userID: '1', username:'user1', password: '123'},
    { userID: '2', username:'user2', password: '456'}
]
export const login = (username: string, password: string): string | undefined => {    
    const user = validUser.find((user) => user.username === username && user.password === password);
    localStorage.setItem('auth', JSON.stringify(user));
    return user?.userID;
};
