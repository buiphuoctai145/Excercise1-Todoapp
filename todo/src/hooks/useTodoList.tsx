import { useEffect, useState } from "react"
import { Todo } from "../models/todo"

export const useTodoList = (todoItems: Todo[]) => {
    const [completedTasks, setCompletedTasks] = useState<Todo[]>(todoItems.filter(e => e.isCompleted))
    const [incompletedTasks, setIncompletedTasks] = useState<Todo[]>(todoItems.filter(e => !e.isCompleted))

    useEffect(() => {
      setCompletedTasks(todoItems.filter(e => e.isCompleted))
      setIncompletedTasks(todoItems.filter(e => !e.isCompleted))
    }, [todoItems])
    
    const addNewTodoItem = (name: string, description: string, category: string) => {
        const id = (completedTasks.length + incompletedTasks.length + 1).toString()

        const task: Todo = {
            id, name, description, category, isCompleted: false
        }
        setIncompletedTasks([...incompletedTasks, { ...task }])
    }

    const makeTodoItemCompleted = (index: number, isCompleted: boolean) => {
        if (isCompleted) {
            const newIncompletedTasksList = [...incompletedTasks]
            const [completedTask] = newIncompletedTasksList.splice(index, 1)
            completedTask.isCompleted = true
            setCompletedTasks([...completedTasks, completedTask])
            setIncompletedTasks(newIncompletedTasksList)
        } else {
            const newCompletedTasksList = [...completedTasks]
            const [incompletedTask] = newCompletedTasksList.splice(index, 1)
            incompletedTask.isCompleted = false
            setCompletedTasks(newCompletedTasksList)
            setIncompletedTasks([...incompletedTasks, incompletedTask])
        }
    }

    const toggleTodoItemFlag = (index: number, isCompleted: boolean) => {
        const tasksList = isCompleted ? completedTasks : incompletedTasks
        const setStateFunc = isCompleted ? setCompletedTasks : setIncompletedTasks
        const newTasksList = [...tasksList]

        newTasksList[index].isFlagged = !newTasksList[index].isFlagged

        setStateFunc(newTasksList)
    }

    const moveTodoItemUpOrDown = (index: number, isCompleted: boolean, moveUp?: boolean) => {
        moveUp ??= true

        const tasksList = isCompleted ? completedTasks : incompletedTasks

        if ((index === 0 && moveUp) || (index === tasksList.length - 1 && !moveUp)) {
            return
        }

        const setStateFunc = isCompleted ? setCompletedTasks : setIncompletedTasks
        const newTasksList = [...tasksList]
        const targetIndex = moveUp ? index - 1 : index + 1

        const temp = { ...newTasksList[index] }
        newTasksList[index] = { ...newTasksList[targetIndex] }
        newTasksList[targetIndex] = temp

        setStateFunc(newTasksList)
    }

    return {
        completedTasks,
        incompletedTasks,
        addNewTodoItem,
        makeTodoItemCompleted,
        toggleTodoItemFlag,
        moveTodoItemUpOrDown
    }
}