import { Dispatch, FunctionComponent, SetStateAction, useState } from "react"
import "@/components/schedule/task/addtaskbutton/AddTaskButton.css"
import type { TaskType, RenderedDateType } from "@/types/types"

interface Props {
    allTasks: TaskType[],
    setAllTasks: Dispatch<SetStateAction<TaskType[]>>,
    selectedDate: RenderedDateType
}

export const AddTaskButton: FunctionComponent<Props> = ({ allTasks, setAllTasks, selectedDate }) => {
    const [ open, setOpen ] = useState<Boolean>(false)
    const [ titleValue, setTitleValue ] = useState<string>("")
    const [ descriptionValue, setDescriptionValue ] = useState<string>("")

    function addNewTask() {
        const newTask = {
            date: selectedDate,
            title: titleValue,
            description: descriptionValue
        }

        setAllTasks([...allTasks, newTask])
        setOpen(false)
    }

    return (
        <>
                {open
                    ?
                        <div className="add-task-container">
                            <div className="text-content">
                                <input type="text"
                                    className="title"
                                    placeholder="Title"
                                    onChange={(event) => setTitleValue(event.target.value)}
                                />
                                <input type="text"
                                    className="description"
                                    placeholder="Description"
                                    onChange={(event) => setDescriptionValue(event.target.value)}
                                />
                            </div>
                            <div className="icons-container">
                                <div className="confirm-icon" onClick={() => addNewTask()}>
                                    <img src="/check.png" alt="" />
                                </div>
                                <div className="cancel-icon" onClick={() => setOpen(false)}>
                                    <img src="/cancel.png" alt="" />
                                </div>
                            </div>
                        </div>
                    :
                    <div className="add-task-container" onClick={() => setOpen(true)}>
                        Add task
                    </div>
                }
        </>
    )
}