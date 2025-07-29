import { AddingTask, ITask, Status } from "@/types";
import { useLocalStorage } from "./useLocalStorage";

export const useTasks = () => {
    const [tasks, setTasks] = useLocalStorage<ITask[]>("tasks", []);

    const addTask = (newTask: AddingTask) => {
        const newId = tasks.length
            ? Math.max(...tasks.map((el) => el.id)) + 1
            : 1;
        setTasks((prev) => prev.concat({ ...newTask, id: newId }));
    };

    const deleteTask = (id: ITask["id"]) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const changeStatusTask = (id: ITask["id"], status: Status) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, status } : task))
        );
    };

    const updateTask = (id: ITask["id"], edited: Omit<ITask, "id">) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, ...edited } : task))
        );
    };

    return {
        tasks,
        addTask,
        deleteTask,
        changeStatusTask,
        updateTask
    };
};
