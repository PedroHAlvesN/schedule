import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from "react"
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
    const [ warning, setWarning ] = useState<Boolean>(false)
    let [ width, setWidth ] = useState<number>(1)

    function addNewTask() {
        if(titleValue === "" && !warning) {
            setWarning(true);
            return
        }
        const newTask = {
            date: selectedDate,
            title: titleValue,
            description: descriptionValue
        }

        setAllTasks([...allTasks, newTask])
        setOpen(false)
    }

    useEffect(() => {
        setTitleValue("")
        setDescriptionValue("")
    }, [allTasks])

    useEffect(() => {
        setOpen(false)
    }, [selectedDate])

    useEffect(() => {
        const warningTimeId = setInterval(() => {
            if(width >= 100) {
                setWarning(false)
                setWidth(1)
                clearInterval(warningTimeId)
                return
            }
            width++;
            setWidth(width);
        }, 20);
    }, [warning])

    return (
        <>
                {open
                    ?
                    <div className="add-task-container">
                        {warning
                            ?
                            <div className="warning-container">
                                title field is empty
                                <div className="progress-bar" style={{width: width + "%"}} />
                            </div>
                            :
                            <div className="content">
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
                        }
                    </div>
                    :
                    <div className="add-task-container" onClick={() => setOpen(true)}>
                    <img className="add-icon" src="/plus.png" alt="" />
                    </div>
                }
        </>
    )
}