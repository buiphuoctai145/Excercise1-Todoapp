import { Todo } from "../../models/todo";

interface TodoItemProps {
  task: Todo,
  isCheckboxVisible: boolean,
  actionButtonText: string,
  onCheckboxChecked: (isChecked: boolean) => void,
  onActionButtonClick: () => void,
  onFlag: () => void,
  onMoveUpButtonClick: () => void,
  onMoveDownButtonClick: () => void
}

export const TodoItem = ({
  task,
  isCheckboxVisible,
  actionButtonText,
  onCheckboxChecked,
  onActionButtonClick,
  onFlag,
  onMoveUpButtonClick,
  onMoveDownButtonClick
}: TodoItemProps) => {

  const _onCheckboxChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChecked(e.target.checked)
  }

  return (
    <tr
      style={{
        height: "50px",
        backgroundColor: task.isFlagged ? 'orange' : 'white',
      }}
    >
      <td
        style={{
          display: `${isCheckboxVisible ? "table-cell" : "none"}`,
        }}
      >
        <input type="checkbox" value={task.id} onChange={_onCheckboxChecked} />
      </td>
      <td>{task.name}</td>
      <td>{task.description}</td>
      <td>{task.category}</td>
      <td>
        <div>
          <button onClick={onFlag}>Flag</button>
          <button>Pin</button>
        </div>
      </td>
      <td
        style={{
          display: `${isCheckboxVisible ? "table-cell" : "none"}`,
        }}
      >
        <button onClick={onActionButtonClick}>{actionButtonText}</button>
      </td>
      <td>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button onClick={onMoveUpButtonClick}>{`˄`}</button>
          <button onClick={onMoveDownButtonClick}>{`˅`}</button>
        </div>
      </td>
    </tr>
  )
}