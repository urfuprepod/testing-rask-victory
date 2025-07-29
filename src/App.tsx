import React, { useRef, useState } from "react";
import "./index.css";
import "./normalize.css";
import { Tracker } from "./pages";
import { Drawer } from "./components";
import { FormTask, ITask } from "./types";
import { TaskContext } from "./context/TaskContext";

const App = () => {
    const [activeTask, setAcitveTask] = useState<ITask | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const ref = useRef<{
        onEditTask(id: number, data: FormTask): void;
        onAddTask(data: FormTask): void;
    }>(null);

    const onSubmit = (val: FormTask) => {
        if (ref.current) {
            const { onAddTask, onEditTask } = ref.current;
            if (activeTask) {
                onEditTask(activeTask.id, val);
            } else {
                onAddTask(val);
            }
        }
    };

    return (
        <>
            <TaskContext.Provider
                value={{
                    updateActiveTask: (activeTask: ITask) => {
                        setAcitveTask(activeTask);
                        setIsOpen(true);
                    },
                    openTask: () => setIsOpen(true)
                }}
            >
                <Tracker ref={ref} />
                <Drawer
                    isOpen={isOpen}
                    onSubmit={onSubmit}
                    close={() => setIsOpen(false)}
                    activeTask={activeTask}
                />
            </TaskContext.Provider>
        </>
    );
};

export default App;
