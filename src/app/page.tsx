"use client"

import { Calendar } from "@/components/schedule/calendar/Calendar"
import { SidePanel } from "@/components/schedule/sidepanel/SidePanel"
import { useState } from "react"

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

export default function Home() {
  const realDate = new Date()

  const [currentDate, setCurrentDate] = useState<Date>(realDate)
  const [selectedDate, setSelectedDate] = useState<SelectedDateType>({day: currentDate.getDate(), month: currentDate.getMonth(), year: currentDate.getFullYear()})
  const [allTasks, setAllTasks] = useState<TaskType[]>([{date: {day: 11, month: 1, year: 2025}, title: "Teste", description: "teste"}])

  return (
    <>
      <SidePanel 
        selectedDate={selectedDate}
        realDate={realDate}
        allTasks={allTasks}
        setAllTasks={setAllTasks}
      >
        <Calendar
          currentDate={currentDate}
          selectedDate={selectedDate}
          setCurrentDate={setCurrentDate}
          setSelectedDate={setSelectedDate}
          realDate={realDate}
        />
      </SidePanel>
    </>
  )
}
