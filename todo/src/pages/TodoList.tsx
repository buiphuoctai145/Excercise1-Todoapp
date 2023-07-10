import { useEffect, useRef, useState } from "react";
import { ModalCreateTask } from "../components/modals/ModalCreateTask";
import { TodoItem } from "../components/todoItems/TodoItem";
import { useTodoList } from "../hooks/useTodoList";
import { ModalLogin } from "../components/modals/ModalLogin";
import { Todo } from "../models/todo";

const User1Todo = [
  {
    id: "1",
    name: "hoc",
    description: "study",
    category: "homework",
    isCompleted: false,
    isFlagged: true,
  },
  {
    id: "2",
    name: "react",
    description: "study",
    category: "react",
    isCompleted: true,
    isFlagged: false,
  },
]
const User2Todo = [
  {
    id: "1",
    name: "di nhau",
    description: "nhau",
    category: "enjoy",
    isCompleted: false,
    isFlagged: true,
  },
  {
    id: "1",
    name: "di nhau",
    description: "nhau",
    category: "enjoy",
    isCompleted: false,
    isFlagged: true,
  },
]

export const TodoList = () => {
  const [categories, setCategories] = useState<string[]>(["homework", "job"]);
  const [isModalCreateTaskOpen, setIsModalCreateTaskOpen] = useState(false);
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const [isCheckboxesVisible, setIsCheckboxesVisible] = useState(false);
  const leftSideSelectedTodoItems = useRef<Set<number>>(new Set());
  const rightSideSelectedTodoItems = useRef<Set<number>>(new Set());
  const [loggedInUser, setLoggedInUser] = useState<string | null>(localStorage.getItem('auth'));
  const [todoData, setTodoData] = useState<Todo[]>([]);

  //   const [openModalEditTask, setOpenModalEditTask] = useState<Todo[]>([]);
  const {
    completedTasks,
    incompletedTasks,
    addNewTodoItem,
    makeTodoItemCompleted,
    toggleTodoItemFlag,
    moveTodoItemUpOrDown,
  } = useTodoList(todoData);

  useEffect(() => {
    if(loggedInUser === '1') {
      setTodoData(User1Todo)
    } else {
      setTodoData(User2Todo)
    }
  }, [loggedInUser])

  const toggleCreateTaskModal = () => {
    setIsModalCreateTaskOpen(!isModalCreateTaskOpen);
  };

  const toggleLoginModal = () => {
    setIsModalLoginOpen(!isModalLoginOpen);
  };

  const _addCategory = (category: string) => {
    const findCategory = categories.find((item) => item === category);
    if (!findCategory) {
      setCategories((current) => [...current, category]);
    }
  };

  const _onCreate = (name: string, description: string, category: string) => {
    addNewTodoItem(name, description, category);
    _addCategory(category);
  };

  const _onLogin = (userID: string) => {
    setLoggedInUser(userID)
  };

  const showEditTask = () => {
    setIsCheckboxesVisible(!isCheckboxesVisible);
    leftSideSelectedTodoItems.current.clear();
    rightSideSelectedTodoItems.current.clear();
  };

  const getOnLeftSideCheckboxCheckedCallback = (index: number) => {
    return (isChecked: boolean) => {
      if (isChecked) {
        leftSideSelectedTodoItems.current.add(index);
      } else {
        leftSideSelectedTodoItems.current.delete(index);
      }
    };
  };

  const getOnRightSideCheckboxCheckedCallback = (index: number) => {
    return (isChecked: boolean) => {
      if (isChecked) {
        rightSideSelectedTodoItems.current.add(index);
      } else {
        rightSideSelectedTodoItems.current.delete(index);
      }
    };
  };

  const getOnComleteTaskButtonClickCallback = (
    index: number,
    isCompleted: boolean
  ) => {
    return () => {
      makeTodoItemCompleted(index, isCompleted);
    };
  };

  const getMoveTaskItemCallback = (
    index: number,
    isCompleted: boolean,
    moveUp?: boolean
  ) => {
    return () => {
      moveTodoItemUpOrDown(index, isCompleted, moveUp);
    };
  };

  const getMakeTasksCompleteCallback = (isCompleted: boolean) => {
    return () => {
      const indexesList = isCompleted
        ? leftSideSelectedTodoItems.current
        : rightSideSelectedTodoItems.current;

      indexesList.forEach((index) => {
        makeTodoItemCompleted(index, isCompleted);
      });
    };
  };

  const getOnFlagCallback = (index: number, isCompleted: boolean) => {
    return () => {
      toggleTodoItemFlag(index, isCompleted);
    };
  };


  return (
    <div>
      <ModalCreateTask
        categories={categories}
        isVisible={isModalCreateTaskOpen}
        onCreate={_onCreate}
        onClose={() => setIsModalCreateTaskOpen(false)}
      />
      <ModalLogin isVisible={isModalLoginOpen} onClose={() => setIsModalLoginOpen(false)} onLogin={_onLogin}/>
      <button
        className="mt-3 bg-blue-600 py-1 px-5 rounded-md text-white"
        onClick={toggleLoginModal}
      >
        Login
      </button>
      <div className="header-container test text-center">
        <h3>Todo List</h3>
        <button
          className="mt-3 bg-blue-600 py-1 px-5 rounded-md text-white"
          onClick={toggleCreateTaskModal}
        >
          Create task
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <table>
          <thead>
            <tr>
              <th colSpan={6}>To do</th>
            </tr>
          </thead>
          <tbody>
            {completedTasks.map((task, index) => (
              <TodoItem
                key={index}
                task={task}
                isCheckboxVisible={isCheckboxesVisible}
                actionButtonText=">"
                onCheckboxChecked={getOnLeftSideCheckboxCheckedCallback(index)}
                onActionButtonClick={getOnComleteTaskButtonClickCallback(
                  index,
                  true
                )}
                onFlag={getOnFlagCallback(index, false)}
                onMoveUpButtonClick={getMoveTaskItemCallback(index, false)}
                onMoveDownButtonClick={getMoveTaskItemCallback(
                  index,
                  false,
                  false
                )}
              />
            ))}
          </tbody>
        </table>
        <div className="text-left ">
          <button
            className="w-full bg-blue-500 text-white my-2 px-3 rounded-md"
            onClick={showEditTask}
          >
            Edit
          </button>
          <button
            className="mt-3 bg-blue-600 py-1 px-5 rounded-md text-white"
            onClick={getMakeTasksCompleteCallback(false)}
          >{`<`}</button>
          <button
            style={{
              padding: "20px 5px",
            }}
            onClick={getMakeTasksCompleteCallback(true)}
          >{`>`}</button>
        </div>
        <table>
          <thead>
            <tr>
              <th colSpan={6}>In progress</th>
            </tr>
          </thead>
          <tbody>
            {incompletedTasks.map((task, index) => (
              <TodoItem
                key={index}
                task={task}
                isCheckboxVisible={isCheckboxesVisible}
                actionButtonText="<"
                onCheckboxChecked={getOnRightSideCheckboxCheckedCallback(index)}
                onActionButtonClick={getOnComleteTaskButtonClickCallback(
                  index,
                  false
                )}
                onFlag={getOnFlagCallback(index, true)}
                onMoveUpButtonClick={getMoveTaskItemCallback(index, true)}
                onMoveDownButtonClick={getMoveTaskItemCallback(
                  index,
                  true,
                  false
                )}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* <ModalEditTask categories={categories} isVisible={openModal} /> */}
    </div>
  );
};
