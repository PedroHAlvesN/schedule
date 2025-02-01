'use client'

import { type FunctionComponent, type Dispatch, useEffect, useState, type SetStateAction } from "react";
import "./Calendar.css"
import { Select } from "@/components/schedule/select/Select"

interface Props {
    currentDate: Date,
    setCurrentDate: Dispatch<SetStateAction<Date>>,
    realDate: Date
}

interface RenderedDateType {
    day: number,
    month: number,
    year: number
}

export const Calendar:FunctionComponent<Props> = ({ currentDate, setCurrentDate, realDate }) => {
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    const years = [...Array(51)].map((_, i) => 2000 + i);
    const week = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
    
    let [currentMonth, setCurrentMonth] = useState(currentDate.getMonth())
    let [currentYear, setCurrentYear] = useState(currentDate.getFullYear())
    let [renderedDate, setRenderedDate] = useState<RenderedDateType[]>([])
    let [hasTask, setHasTask] = useState([])

    let [selectedDay, setSelectedDay] = useState({
		day: currentDate.getDate(),
		month: currentDate.getMonth(),
		year: currentDate.getFullYear()
	})

    function handleCreateCalendar() {
		renderedDate = []
		setCurrentMonth(currentDate.getMonth())
		setCurrentYear(currentDate.getFullYear())
		
		let currentMonthTotalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
		let daysUntilFirstDay = new Date(currentYear, currentMonth, 1).getDay();
		let isToShowNextYear = currentMonth == 11

		for(;daysUntilFirstDay > 0;) {
			daysUntilFirstDay--;
			const isToShowPreviousYear = currentMonth == 0
			const previousMonth = isToShowPreviousYear ? 11 : currentMonth - 1
			const previousYear = isToShowPreviousYear ? currentYear - 1 : currentYear
			
			let renderedPreviousDate = new Date(previousYear, previousMonth + 1, 0)
			let renderedPreviousDay = renderedPreviousDate.getDate() - daysUntilFirstDay

			renderedDate = [
				...renderedDate,
				{ 
					day: renderedPreviousDay,
					month: previousMonth,
					year: previousYear,
				}
			]
		}

		for(let i = 1; i <= currentMonthTotalDays; i++) {
			renderedDate = [
				...renderedDate,
				{ 
					day: i,
					month: currentMonth,
					year: currentYear,
				}
			]
		}

		let daysLeft = 42 - renderedDate.length

		for(let i = 1; i <= daysLeft; i++) {
			const nextMonth = isToShowNextYear ? 0 : currentMonth + 1
			const nextYear = isToShowNextYear ? currentYear + 1 : currentYear
			
			renderedDate = [
				...renderedDate,
				{ 
					day: i,
					month: nextMonth,
					year: nextYear,
				}
			]
		}

        setRenderedDate(renderedDate)
	}

    function changeDate(value: string | number, type?: string) {
        if(type === "month" && typeof value === "string" ) {
            const monthNumberRef = monthNames.indexOf(value) + 1
            const formattedMonthNumberRef = monthNumberRef < 9 ? `0${monthNumberRef}` : monthNumberRef
            console.log(`${currentDate.getFullYear()}-${formattedMonthNumberRef}-02`)
            setCurrentDate(new Date(`${currentDate.getFullYear()}-${formattedMonthNumberRef}-02`));
        }
    }

    useEffect(() => {
        handleCreateCalendar()
    }, [currentMonth, currentYear])

    useEffect(() => {
        console.log(currentDate)
        setCurrentMonth(currentDate.getMonth())
        setCurrentYear(currentDate.getFullYear())
    }, [currentDate])

    useEffect(() => {
        handleCreateCalendar()
    }, [])

    return (
        <>
            <div className="container">
                <div className="date-select-container">
                    <Select selected={monthNames[currentDate.getMonth()]}>
                        {monthNames.map(monthName => {
                            const selected = monthNames[currentDate.getMonth()] === monthName
                                ? "selected"
                                : undefined

                            return (
                                <span className={selected} onClick={() => changeDate(monthName, "month")}>{monthName}</span>
                            )
                        })}
                    </Select>
                    <button onClick={() => setCurrentDate(realDate)}>Hoje</button>
                    <Select selected={currentDate.getFullYear().toString()}>
                        {years.map(year => {
                            const selected = year === currentDate.getFullYear()
                                ? "selected"
                                : undefined

                            return (
                                <span className={selected}>{year}</span>
                            )
                        })}
                    </Select>
                </div>
                <div className="calendar-container">
                    {week.map(weekName => {
                        return (
                            <span className="week-name">
                                {weekName}
                            </span>
                        )
                    })}
                        
                    {renderedDate.map(date => {
                        const selectedDayClass =
                            date.day == selectedDay.day
                            && date.month == selectedDay.month
                            && date.year == selectedDay.year
                            ? " selectedDay" : ""

                        const currentDayClass =
                            date.day == realDate.getDate()
                            && date.month == realDate.getMonth()
                            && date.year == realDate.getFullYear()
                            ? " currentDay" : ""

                        const notCurrentMonthClass =
                            date.month != currentMonth
                            ? " notCurrentMonth" : ""

                        return (
                            <span
                                role="button"
                                onClick={() => setSelectedDay(date)}
                                className={`days${selectedDayClass}${currentDayClass}${notCurrentMonthClass}`}
                                //className:hasTask={hasTask.length > 0}
                            >
                                {date.day}
                            </span>
                        )
                    })}
                </div>
            </div>
        </>
    )
}