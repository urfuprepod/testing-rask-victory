import React, { FC } from "react";
import styles from "./styles.module.css";
import { useTaskContext } from "@/context/TaskContext";

const AddTaskButton = React.memo(() => {
    const { openTask } = useTaskContext();

    return (
        <button onClick={openTask} className={styles.button}>
            Добавить задачу <span>+</span>
        </button>
    );
});

export default AddTaskButton;
