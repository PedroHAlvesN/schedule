export interface RenderedDateType {
    day: number,
    month: number,
    year: number
}

export interface SelectedDateType {
    day: number,
    month: number,
    year: number
}

export interface TaskType {
    date: SelectedDateType
    title: string,
    description: string
}