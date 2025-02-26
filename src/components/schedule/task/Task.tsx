"use client"

import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from "react"
import "@/components/schedule/task/Task.css"
import type { TaskType } from "@/types/types"

interface Props {
    task?: TaskType
    setTask?: Dispatch<SetStateAction<Boolean>>
    allTasks: TaskType[],
    setAllTasks: Dispatch<SetStateAction<TaskType[]>>,
    editing?: boolean
}

export const Task:FunctionComponent<Props> = ({ task, setTask, allTasks, setAllTasks, editing = false }) => {
    const [ isEditing, setIsEditing] = useState<Boolean>(editing)
    const [ titleValue, setTitleValue] = useState("")
    const [ descriptionValue, setDescriptionValue] = useState("")

    return (
        <>
            <div className="task-content">
                <div className="text-container">
                    { isEditing ? <input type="text" className="title-input" value={titleValue} /> : <p className="title">{task?.title}</p> }
                    { isEditing ? <input type="text" className="title-input" value={descriptionValue} /> : <p className="description">{task?.description}</p> }
                </div>
                <div className="icons-container">
                    <button
                        className={isEditing ? "confirm" : "edit"}
                        onClick={() => !isEditing ? setIsEditing(true) : ""}
                    >
                        <img src={isEditing ? "/check.png" : "edit.png"} />
                    </button>
                    <button
                        className="remove"
                        onClick={() => isEditing ? setIsEditing(false) : ""}
                    >
                        <img src={isEditing ? "/cancel.png" : "/trash.png"} alt="Remove" />
                    </button>
                </div>
            </div>
        </>
    )
}