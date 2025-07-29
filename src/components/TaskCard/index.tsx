import { ITask } from "@/types";
import React, { FC, useMemo } from "react";
import styles from "./styles.module.css";
import {
    currentParsedDate,
    formatDate,
    statusColor,
    statusTranslate,
} from "@/constants";
import { useTaskContext } from "@/context/TaskContext";

type Props = {
    task: ITask;
    deleteTask: (id: number) => void;
};

const TaskCard: FC<Props> = (props) => {
    const { task, deleteTask } = props;

    const { title, id, startDate, status, endDate } = task;

    const dateValues = useMemo(() => {
        const res = {
            startValue: startDate ? formatDate(startDate) : currentParsedDate,
            endValue: endDate ? formatDate(endDate) : "Не указана",
        };
        return res;
    }, [startDate, endDate]);

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("id", String(id));
    };

    const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {};

    const { updateActiveTask } = useTaskContext();

    return (
        <div
            draggable
            onDragEnd={dragEndHandler}
            onDragStart={dragStartHandler}
            className={styles.taskCard}
            onDoubleClick={() => {updateActiveTask(task)}}
        >
            <button className={styles.close} onClick={() => deleteTask(id)}>
                X
            </button>
            <p className={styles.taskTitle}>
                {title} #{id}
            </p>
            <p>Дата начала: {dateValues.startValue}</p>
            <p>Дата окончания: {dateValues.endValue}</p>
            <p>
                Статус:{" "}
                <span style={{ color: statusColor[status] }}>
                    {statusTranslate[status]}
                </span>
            </p>
        </div>
    );
};

export default TaskCard;
