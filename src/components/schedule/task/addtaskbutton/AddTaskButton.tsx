import { Dispatch, FunctionComponent, SetStateAction, useEffect, useRef, useState } from "react"
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
    const progressBarRef = useRef<HTMLDivElement>(null)

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

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

    useEffect(() => {
        if(!warning) return
        const wrapper = async () => {
            if(!progressBarRef.current) return
            for(let i = 1; i <= 100; i++) {
                progressBarRef.current.style.width = i + "%";
                await sleep(20)
            }
            setWarning(false)
            progressBarRef.current.style.width = "60px";
        }
        wrapper()
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
                                <div className="progress-bar" ref={progressBarRef} />
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