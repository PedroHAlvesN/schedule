"use client"

import { Calendar } from "@/components/schedule/calendar/Calendar"
import { SidePanel } from "@/components/schedule/sidepanel/SidePanel"
import { useState } from "react"

interface SelectedDateType {
  day: number,
  month: number,
  year: number
}

export default function Home() {
  const realDate = new Date()

  let [currentDate, setCurrentDate] = useState<Date>(realDate)
  let [selectedDate, setSelectedDate] = useState<SelectedDateType>({day: currentDate.getDate(), month: currentDate.getMonth(), year: currentDate.getFullYear()})
  let [allTasks, setAllTasks] = useState()

  return (
    <>
      <SidePanel selectedDate={selectedDate} realDate={realDate}>
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
