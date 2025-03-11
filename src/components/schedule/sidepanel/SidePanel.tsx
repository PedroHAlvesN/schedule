'use client'

import { Dispatch, FunctionComponent, PropsWithChildren, SetStateAction, useEffect, useState } from "react"
import { AddTaskButton } from "@/components/schedule/task/addtaskbutton/AddTaskButton"
import "./SidePanel.css"
import { Task } from "@/components/schedule/task/Task"
import type { SelectedDateType, TaskType } from "@/types/types"

interface Props extends PropsWithChildren {
	selectedDate: SelectedDateType
	realDate: Date,
	allTasks: TaskType[]
	setAllTasks: Dispatch<SetStateAction<TaskType[]>>
}

export const SidePanel:FunctionComponent<Props> = ({ children, selectedDate, allTasks, setAllTasks }) => {
	const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
	let [currentTasks, setCurrentTasks] = useState<TaskType[]>([])

	function getCurrentTasks() {
		currentTasks = []
		allTasks.map(task => {
			const isCurrentDay = task.date.day === selectedDate.day
			const isCurrentMonth = task.date.month === selectedDate.month
			const isCurrentYear = task.date.year === selectedDate.year
			if(isCurrentDay && isCurrentMonth && isCurrentYear) currentTasks = [ ...currentTasks, task ]
		})

		setCurrentTasks(currentTasks)
	}

	useEffect(() => {
		setCurrentTasks([])
		getCurrentTasks()
	}, [selectedDate, allTasks])

    return (
        <>
            <div className="side-panel-container">
				{children}
                <div className="side-panel">
					<h3 className="selected-day-title">{selectedDate.day} de {monthNames[selectedDate.month]}, {selectedDate.year}</h3>
                    <div className="tasks-container">
						<AddTaskButton
							allTasks={allTasks}
							setAllTasks={setAllTasks}
							selectedDate={selectedDate}
						/>
						{currentTasks.map((task, index) => {
							return (
								<Task
									index={index}
									task={task}
									allTasks={allTasks}
									setAllTasks={setAllTasks}
								/>
							)
						})}
                    </div>
                </div>
            </div>
        </>
    )
}