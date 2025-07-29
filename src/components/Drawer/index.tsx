import { FormField, FormTask, ITask } from "@/types";
import React, { FC, useMemo } from "react";
import classNames from "classnames";
import styles from "./styles.module.css";
import { formatDateToForm, statusTranslate } from "@/constants";
import Form from "../Form";

type Props = {
    activeTask: ITask | null;
    isOpen: boolean;
    onSubmit: (val: FormTask) => void;
    close: () => void;
};

const fields: FormField[] = [
    {
        name: "title",
        label: "Заголовок",
        type: "text",
        placeholder: "Введите заголовок",
        isRequired: true,
    },
    {
        name: "description",
        label: "Описание",
        placeholder: "Описание задачи",
        type: "text",
    },
    { name: "startDate", label: "Дата начала", type: "date" },
    {
        name: "endDate",
        label: "Дата окончания",
        type: "date",
        dependsOn: {
            field: "startDate",
            errorMessage: "Не может быть меньше даты начала",
        },
    },
    {
        name: "status",
        label: "Статус",
        type: "select",
        isRequired: true,
        options: Object.entries(statusTranslate).map(([value, name]) => ({
            name,
            value,
        })),
    },
];

const Drawer: FC<Props> = (props) => {
    const { activeTask, isOpen, close, onSubmit } = props;

    const submitHandler = (val: FormTask) => {
        onSubmit(val);
        close();
    };

    const parsedDefaulTask = useMemo(() => {
        if (!activeTask) return {};
        return Object.entries(activeTask).reduce(
            (acc: Record<string, string>, cur: [string, string]) => {
                const [key, value] = cur;
                if (typeof value === "number") return acc;
                if (typeof value === "object")
                    return { ...acc, [key]: formatDateToForm(value) }; // typeof Date === 'object'
                if (typeof value === "string") return { ...acc, [key]: value };
                return acc;
            },
            {}
        );
    }, [activeTask]);

    return (
        <div
            className={classNames(styles.container, {
                [styles.active]: !!isOpen,
            })}
        >
            <aside className={styles.drawer}>
                <button onClick={close}>{"< Назад"}</button>
                <Form<FormTask>
                    buttonTitle={activeTask ? "Редактировать" : "Сохранить"}
                    onSubmit={submitHandler}
                    defaultValues={parsedDefaulTask}
                    fields={fields}
                />
            </aside>
        </div>
    );
};

export default Drawer;
