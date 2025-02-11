import { Dispatch, FunctionComponent, SetStateAction } from "react"
import "@/components/schedule/task/addtaskbutton/AddTaskButton.css"

interface Props {
    setOpen: Dispatch<SetStateAction<Boolean>>
}

export const AddTaskButton: FunctionComponent<Props> = ({ setOpen }) => {
    return (
        <>
            <button className="add-task-button" onClick={() => setOpen(true)}>
                Criar nova atividade
            </button>
        </>
    )
}