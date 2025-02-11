'use client'

import { Dispatch, FunctionComponent, PropsWithChildren, SetStateAction, useEffect, useState } from "react"
import { AddTaskButton } from "@/components/schedule/task/addtaskbutton/AddTaskButton"
import "./SidePanel.css"
import { Task } from "@/components/schedule/task/Task"

interface SelectedDateType {
	day: number,
	month: number,
	year: number
}

interface TaskType {
	date: SelectedDateType
	title: string,
	description: string
}


interface Props extends PropsWithChildren {
	selectedDate: SelectedDateType
	realDate: Date,
	allTasks: TaskType[]
	setAllTasks: Dispatch<SetStateAction<TaskType[]>>
}

export const SidePanel:FunctionComponent<Props> = ({ children, selectedDate, allTasks, setAllTasks }) => {
	const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
	const [open, setOpen] = useState<Boolean>(false)
	const [currentTasks, setCurrentTasks] = useState<TaskType[]>([])

	function getCurrentTasks() {
		allTasks.map(task => {
			const isCurrentDay = task.date.day === selectedDate.day
			const isCurrentMonth = task.date.month === selectedDate.month
			const isCurrentYear = task.date.year === selectedDate.year
			if(isCurrentDay && isCurrentMonth && isCurrentYear) setCurrentTasks([...currentTasks, task ])
		})
	}

	useEffect(() => {
		getCurrentTasks()
	}, [allTasks])

    return (
        <>
            <div className="side-panel-container">
				{children}
                <div className="side-panel">
					<h3 className="selected-day-title">{selectedDate.day} de {monthNames[selectedDate.month]}, {selectedDate.year}</h3>
                    <div className="tasks-container">
						{open ? <Task editing={true} allTasks={allTasks} setAllTasks={setAllTasks} /> : <AddTaskButton setOpen={setOpen} />}
						{currentTasks.map(task => {
							return (
								<Task
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

/*<script>
	export let selectedDay;
	export let allTasks = [{ day: 21 ,month: 10 ,year: 2024 ,task: "Teste" }];

	const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

	let currentTasks = [];
	let inputValue = "";

	function addTask(event) {
		if(event.key == "Enter") {
			allTasks = [...allTasks,
				{
					day: selectedDay.day,
					month: selectedDay.month,
					year: selectedDay.year,
					task: event.target.value
				}
			]
			inputValue = "";
		}
	}

	function getTasks() {
		if(allTasks.length > 0) {
			currentTasks = allTasks.filter(task => {
				if(
				task.day == selectedDay.day
				&& task.month == selectedDay.month
				&& task.year == selectedDay.year
				) return task
			})
		}
	}

	$: selectedDay && getTasks()
	$: allTasks && selectedDay && getTasks()
</script>

<div class="side-panel-container">
	<slot />
	<div class="side-panel">
		<h3 class="day">Dia {selectedDay.day} de {monthNames[selectedDay.month]}, {selectedDay.year}</h3>
		<input
			type="text"
			bind:value={inputValue}
			placeholder="Adicione uma atividade"
			on:keypress={(event) => addTask(event)}
		>
		<div class="tasks-container">
			{#if currentTasks.length == 0}
				Nenhuma atividade ainda marcada nesta data.
			{:else}
				{#each currentTasks as task}
					<p>{task.task}</p>
				{/each}
			{/if}	
		</div>
	</div>
</div>

<style>
	* {
		box-sizing: border-box;
	}
	
	.side-panel-container {
		display: flex;
		padding: 10px;
		background-color: var(--white);
		border-radius: 6px;
	}

	.side-panel {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 15px;
		align-items: flex-start;
	}

	.day {
		margin: 0 0 10px 0;
		padding: 0;
	}

	input[type=text] {
		width: 100%;
		height: 30px;
		border-radius: 30px;
		border: none;
		padding: 0 20px;
		margin-bottom: 15px;
		transition: 0.2s ease-in-out;
		outline: 1px solid transparent;
		color: var(--dark-blue);
	}

	input[type=text]:focus {
		outline: 1px solid var(--dark-blue);
	}
</style>*/