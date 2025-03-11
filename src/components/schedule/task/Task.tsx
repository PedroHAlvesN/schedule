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

    function editTask() {
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

    return (
        <>
            <div className="task-content">
                <div className="text-container">
                    { isEditing
                        ? <input type="text" className="title-input" value={titleValue} onChange={(event) => setTitleValue(event.target.value)} />
                        : <p className="title">{task?.title}</p>
                    }
                    { isEditing
                        ? <input type="text" className="title-input" value={descriptionValue} onChange={(event) => setDescriptionValue(event.target.value)} />
                        : <p className="description">{task?.description || "sem descrição"}</p>
                    }
                </div>
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