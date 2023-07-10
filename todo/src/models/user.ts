import { Todo } from "./todo";

export interface User {
    userID: string;
    username: string;
    password: string;
}

export interface UserData {
    todoList: Todo[];
    completedTask: Todo[];
    inCompletedTask: Todo[];
}
