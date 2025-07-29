import { useTasks } from "@/hooks";
import {
    AddingTask,
    FormField,
    FormTask,
    GroupedTasks,
    ITask,
    Status,
} from "@/types";
import React, { FC, useMemo } from "react";
import TaskColumn from "../TaskColumn";
import styles from "./styles.module.css";
import Form from "../Form";
import { statusTranslate } from "@/constants";
import AddTaskButton from "../AddTaskButton";

const statuses: Status[] = ["todo", "in_progress", "ready"];

type Props = {
    actualTasks: GroupedTasks;
    onAddTask: (data: FormTask) => void;
    deleteTask: (id: number) => void;
    changeStatusTask: (id: ITask["id"], status: Status) => void;
};

// const fields: FormField[] = [
//     {
//         name: "title",
//         label: "Заголовок",
//         type: "text",
//         placeholder: "Введите заголовок",
//         isRequired: true,
//     },
//     {
//         name: "description",
//         label: "Описание",
//         placeholder: "Описание задачи",
//         type: "text",
//     },
//     { name: "startDate", label: "Дата начала", type: "date" },
//     {
//         name: "endDate",
//         label: "Дата окончания",
//         type: "date",
//         dependsOn: {
//             field: "startDate",
//             errorMessage: "Не может быть меньше даты начала",
//         },
//     },
//     {
//         name: "status",
//         label: "Статус",
//         type: "select",
//         isRequired: true,
//         options: Object.entries(statusTranslate).map(([value, name]) => ({
//             name,
//             value,
//         })),
//     },
// ];

const TrackerBody: FC<Props> = (props) => {
    const { actualTasks, onAddTask, deleteTask, changeStatusTask } = props;

    return (
        <>
            {/* <Form<FormTask> onSubmit={onAddTask} fields={fields} /> */}
            <AddTaskButton />
            <div className={styles.container}>
                {statuses.map((status) => (
                    <TaskColumn
                        key={status}
                        changeStatusTask={changeStatusTask}
                        deleteTask={deleteTask}
                        name={status}
                        tasks={actualTasks[status]}
                    />
                ))}
            </div>
        </>
    );
};

export default TrackerBody;
