"use client"

import { Dispatch, FunctionComponent, SetStateAction, useState } from "react"
import "@/components/schedule/task/Task.css"

interface TaskType {
    date: { day: number, month: number, year: number }
    title: string,
    description: string
}

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

    function addTask() {
        console.log("add task")
    }

    function removeTask() {
        console.log("remove task")
    }

    return (
        <>
            <div className="task-content">
                <div className="text-container">
                    { isEditing ? <input type="text" className="title-input" value={titleValue} /> : <p className="title">Task title</p> }
                    { isEditing ? <input type="text" className="title-input" value={descriptionValue} /> : <p className="description">description</p> }
                </div>
                <div className="icons-container">
                    <button
                        className={isEditing ? "confirm" : "edit"}
                        onClick={() => !isEditing ? setIsEditing(true) : addTask()}
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