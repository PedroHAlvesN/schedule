"use client"

import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from "react"
import "@/components/schedule/task/Task.css"
import type { TaskType } from "@/types/types"

interface Props {
    task?: TaskType,
    index: number,
    allTasks: TaskType[],
    setAllTasks: Dispatch<SetStateAction<TaskType[]>>,
    editing?: boolean
}

export const Task:FunctionComponent<Props> = ({ task, index, allTasks, setAllTasks, editing = false }) => {
    const [ isEditing, setIsEditing] = useState<Boolean>(editing)
    const [ titleValue, setTitleValue] = useState("")
    const [ descriptionValue, setDescriptionValue] = useState("")
    const [ warning, setWarning ] = useState<Boolean>(false)
    let [ width, setWidth ] = useState<number>(1)

    function editTask() {
        if(titleValue === "") {
            setWarning(true)
            return
        }
        const editedTask = allTasks[index]
        editedTask.title = titleValue
        editedTask.description = descriptionValue
        allTasks[index] = editedTask
        setAllTasks(allTasks)
        setIsEditing(false)
    }

    function removeTask() {
        setAllTasks(allTasks.filter(taskToKeep => {
            return taskToKeep != task
        }))
    }

    useEffect(() => {
        if(!task) return
        setTitleValue(task.title)
        setDescriptionValue(task.description)
    }, [task])

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

    useEffect(() => {
        if(!task) return
        setTitleValue(task.title)
        setDescriptionValue(task.description)
    }, [task])

    return (
        <>
            <div className="task-content">
                { isEditing
                    ?
                    warning
                        ?
                        <div className="text-container">
                            <div className="warning-container">
                                    title field is empty
                                <div className="progress-bar" style={{width: width + "%"}} />
                            </div>
                        </div>
                        :
                        <div className="text-container">
                            <input
                                type="text"
                                className="title-input"
                                placeholder="Title"
                                value={titleValue}
                                onChange={(event) => setTitleValue(event.target.value)}
                            />
                            <input type="text"
                                className="title-input"
                                placeholder="Description"
                                value={descriptionValue}
                                onChange={(event) => setDescriptionValue(event.target.value)}
                            />
                        </div>
                    :
                    <div className="text-container">
                        <p className="title">{task?.title}</p>
                        <p className="description">{task?.description || "sem descrição"}</p>
                    </div>
                }
                <div className="icons-container">
                    <button
                        className={isEditing ? "confirm" : "edit"}
                        onClick={() => !isEditing ? setIsEditing(true) : editTask()}
                    >
                        <img src={isEditing ? "/check.png" : "edit.png"} />
                    </button>
                    <button
                        className="remove"
                        onClick={() => isEditing ? setIsEditing(false) : removeTask()}
                    >
                        <img src={isEditing ? "/cancel.png" : "/trash.png"} alt="Remove" />
                    </button>
                </div>
            </div>
        </>
    )
}