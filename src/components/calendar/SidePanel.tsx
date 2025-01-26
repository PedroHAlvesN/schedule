'use client'

import "./SidePanel.css"

export function SidePanel({ children }: ReactElement, selectedDate: Date ) {
    return (
        <>
            <div className="side-panel-container">
				{children}
                <div className="side-panel">
					{/* {selectedDate.day} de {monthNames[selectedDay.month]}, {selectedDay.year}*/}
                    <h3 className="day">Dia 26 de Janeiro, 2025</h3>
                    <input
                        type="text"
                        placeholder="Adicione uma atividade"
                        onKeyDown={(event) => console.log("teste")}
                    />
                    <div className="tasks-container">
                        {/*{#if currentTasks.length == 0}
                            Nenhuma atividade ainda marcada nesta data.
                        {:else}
                            {#each currentTasks as task}
                                <p>{task.task}</p>
                            {/each}
                        {/if}*/}
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