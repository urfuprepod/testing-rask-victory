export type Status = "todo" | "ready" | "in_progress";

export interface ITask {
    id: number;
    title: string;
    description?: string;
    startDate: Date;
    endDate?: Date;
    status: Status;
}

export type FormTaskValue<K extends keyof ITask> = {
    [U in K]: string
}

export type FormTask = FormTaskValue<'description' | 'endDate' | 'startDate' | 'status' | 'title'>

export type AddingTask = Omit<ITask, 'id'>

export type GroupedTasks = Record<Status, ITask[]>;

export type FormField = {
    type: "text" | "date" | "select";
    isRequired?: boolean;
    name: string;
    placeholder?: string;
    label: string;
    options?: { name: string; value: string }[];
    dependsOn?: {field: string, errorMessage: string}
};

export type FiltersType = {
    search: string
}

type FiltersKey = keyof FiltersType


export type FilterUpdateFn = (key: FiltersKey, value: FiltersType[FiltersKey]) => void

export type DateRangeType = {
    startDate?: Date;
    endDate?: Date;
    key?: string;
    color?: string;
};