import { Filters, TrackerBody } from "@/components";
import { useDebounce, useTasks } from "@/hooks";
import {
    AddingTask,
    DateRangeType,
    FormTask,
    GroupedTasks,
    ITask,
    Status,
} from "@/types";
import React, {
    forwardRef,
    useImperativeHandle,
    useMemo,
    useState,
} from "react";
import styles from "./styles.module.css";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css"; 

const Tracker = forwardRef<{
    onEditTask(id: number, data: FormTask): void;
    onAddTask(data: FormTask): void;
}>((_, ref) => {
    const { debouncedValue, value, setValue } = useDebounce();
    const { tasks, addTask, deleteTask, changeStatusTask, updateTask } =
        useTasks();

    const [rangeState, setRangeState] = useState<DateRangeType[]>([
        {
            startDate: undefined,
            endDate: undefined,
            key: "selection",
        },
    ]);
    const [focusedRange, setFocusedRange] = useState<[number, number]>([0, 0]);

    const handleChange = (item: RangeKeyDict) => {
        const newRange = item.selection;

        if (focusedRange[1] === 0) {
            setRangeState([
                {
                    startDate: newRange.startDate,
                    endDate: undefined,
                    key: "selection",
                },
            ]);
            setFocusedRange([0, 1]);
        } else {
            setRangeState([
                {
                    startDate: newRange.startDate,
                    endDate: newRange.endDate,
                    key: "selection",
                },
            ]);
            setFocusedRange([0, 0]);
        }
    };

    const groupedAndFIlteredTasks = useMemo<GroupedTasks>(() => {
        return tasks.reduce(
            (acc: GroupedTasks, cur: ITask) => {
                const startDate = rangeState[0].startDate;
                const endDate = rangeState[0].endDate;

                const isStartDateValid =
                    !startDate || cur.startDate >= startDate;
                const isEndDateValid =
                    !endDate ||
                    (cur.startDate <= endDate &&
                        (!cur.endDate || cur.endDate <= endDate));

                if (
                    !cur.title
                        .toLowerCase()
                        .includes(debouncedValue.toLowerCase()) ||
                    !isStartDateValid ||
                    !isEndDateValid
                )
                    return acc;
                const current = cur.status;
                return { ...acc, [current]: acc[current].concat(cur) };
            },
            { todo: [], in_progress: [], ready: [] }
        );
    }, [tasks, debouncedValue, rangeState]);

    function onAddTask(data: FormTask) {
        addTask(onSubmitForm(data));
    }

    function onEditTask(id: number, data: FormTask) {
        updateTask(id, onSubmitForm(data));
    }

    const onSubmitForm = (data: FormTask): AddingTask => {
        const { startDate, endDate, ...value } = data;
        const obj: AddingTask = {
            ...value,
            status: value.status as Status,
            startDate: startDate ? new Date(startDate) : new Date(),
            endDate: undefined,
        };
        if (endDate) {
            obj.endDate = new Date(endDate);
        }
        return obj;
    };

    useImperativeHandle(
        ref,
        () => {
            return {
                onEditTask,
                onAddTask,
            };
        },
        []
    );

    return (
        <div className={styles.container}>
            <Filters
                searchValue={value}
                updateSerchValue={setValue}
                rangeValue={rangeState}
                setDateRange={handleChange}
            />

            <TrackerBody
                actualTasks={groupedAndFIlteredTasks}
                onAddTask={onAddTask}
                deleteTask={deleteTask}
                changeStatusTask={changeStatusTask}
            />
        </div>
    );
});

export default Tracker;
