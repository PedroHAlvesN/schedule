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
	let [ formatedCurrentTask, setFormatedCurrentTask ] = useState<TaskType[]>([])
	const [ search, setSearch ] = useState<Boolean>(false)
	const [ searchValue, setSearchValue ] = useState<string>("")

	function getCurrentTasks() {
		allTasks.map(task => {
			const isCurrentDay = task.date.day === selectedDate.day
			const isCurrentMonth = task.date.month === selectedDate.month
			const isCurrentYear = task.date.year === selectedDate.year
			if(isCurrentDay && isCurrentMonth && isCurrentYear) currentTasks = [ ...currentTasks, task ]
		})
		setCurrentTasks(currentTasks)
		setFormatedCurrentTask(currentTasks)
		setSearch(false)
	}

	function searchTask() {
		formatedCurrentTask = []
		if(searchValue === "") {
			formatedCurrentTask = currentTasks
		}else {
			currentTasks.map(task => {
				if(task.title.toLowerCase().includes(searchValue.toLowerCase())) formatedCurrentTask = [ ...formatedCurrentTask, task ]
			})
		}
		setFormatedCurrentTask(formatedCurrentTask)
	}

	useEffect(() => {
		if(currentTasks.length !== 0) return
		getCurrentTasks()
	}, [currentTasks])

	useEffect(() => {
		setCurrentTasks([])
	}, [selectedDate, allTasks])

	useEffect(() => {
		searchTask()
	}, [searchValue])

    return (
        <>
            <div className="side-panel-container">
				{children}
                <div className="side-panel">
					<div className="header-container">
						<h3 className="selected-day-title">{selectedDate.day} de {monthNames[selectedDate.month]}, {selectedDate.year}</h3>
						<div className="search" onClick={(event) => {event.preventDefault(), setSearch(!search)}}>
							<img src="/search.png" alt="" />
							<input
								className={search ? "show" : "hidden"}
								type="text" onClick={(event) => event.stopPropagation()}
								onChange={(event) => setSearchValue(event.target.value)}
							/>
						</div>
					</div>
					<div className="tasks-container">
						<AddTaskButton
							allTasks={allTasks}
							setAllTasks={setAllTasks}
							selectedDate={selectedDate}
						/>
						{formatedCurrentTask.map((task, index) => {
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