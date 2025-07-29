import { Status } from "@/types";

const currentDate = new Date();

export function formatDate(date: Date | string) {
    const parsedDate = typeof date === "string" ? new Date(date) : date;

    return parsedDate
        .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
        .replace(/\//g, "-");
}

export function formatDateToForm(date: Date) {
    return date?.toISOString()?.split("T")?.[0];
}

export const currentParsedDate = formatDate(currentDate);

export const statusColor: Record<Status, string> = {
    in_progress: "yellow",
    ready: "green",
    todo: "grey",
};

export const statusTranslate: Record<Status, string> = {
    in_progress: "В процессе",
    ready: "Выполнено",
    todo: "Не готово",
};

export const initialDateRange = {
    startDate: null,
    endDate: null,
    key: "selection",
};
