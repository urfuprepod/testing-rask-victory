import { ITask } from "@/types";
import { createContext, useContext } from "react";

interface ITaskContext {
    updateActiveTask: (val: ITask) => void
    openTask: () => void
}

export const TaskContext = createContext<ITaskContext | undefined>(undefined);

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error("context error");
    return context;
};
