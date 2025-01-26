"use client"

import Calendar from "@/components/calendar/Calendar"
import { SidePanel } from "@/components/calendar/SidePanel"
import { useState } from "react"

type SelectedDateType = {
  day: number,
  month: number,
  year: number
}

export default function Home() {
  const realDate = new Date()

  let [selectedDate, setSelectedDay] = useState<SelectedDateType>()
  let [currentDate, setCurrentDate] = useState<Date>(realDate)
  let [allTasks, setAllTasks] = useState()

  return (
    <>
      <SidePanel selectedDate>
        <Calendar
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          realDate={realDate}
        />
      </SidePanel>
    </>
  )
}
