import { ITask, Status } from "@/types";
import React, { FC, useRef } from "react";
import styles from "./style.module.css";
import TaskCard from "../TaskCard";
import { statusTranslate } from "@/constants";

type Props = {
    name: Status;
    tasks: ITask[];
    deleteTask: (id: number) => void;
    changeStatusTask: (id: number, status: Status) => void;
};

const TaskColumn: FC<Props> = (props) => {
    const { name, tasks, deleteTask, changeStatusTask } = props;

    const ref = useRef<HTMLDivElement>(null);

    const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (ref.current) {
            ref.current.style.opacity = "0.7";
        }
    };

    const dragLeaveHandler = () => {
        if (ref.current) {
            ref.current.style.opacity = "1";
        }
    };

    const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const activeId = +e.dataTransfer.getData("id");
        if (activeId) {
            changeStatusTask(activeId, name);
        }
    };

    return (
        <div
            className={styles.taskColumn}
            id={name}
            ref={ref}
            onDragOver={dragOverHandler}
            onDragLeave={dragLeaveHandler}
            onDrop={dropHandler}
        >
            <h5 className={styles.taskTitle}>{statusTranslate[name]}</h5>
            <div className={styles.taskList}>
                {tasks.map((task) => (
                    <TaskCard
                        deleteTask={deleteTask}
                        task={task}
                        key={task.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskColumn;
