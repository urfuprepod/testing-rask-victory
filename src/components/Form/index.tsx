import React, { FC, useEffect } from "react";
import styles from "./style.module.css";
import { FormField } from "@/types";
import FormFieldFabric from "./FormFieldFabric";
import { SubmitHandler, useForm } from "react-hook-form";

type Props<T> = {
    buttonTitle?: string;
    defaultValues?: Record<string, string>;
    fields: FormField[];
    onSubmit: (val: T) => void;
};

const Form = <T extends Record<string, string>>(props: Props<T>) => {
    const { buttonTitle, defaultValues, fields, onSubmit } = props;

    const submitHanlder: SubmitHandler<Record<string, string>> = (data) => {
        onSubmit(data as T);
    };

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: defaultValues ?? {},
    });

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    return (
        <form className={styles.form} onSubmit={handleSubmit(submitHanlder)}>
            {fields.map((field) => (
                <FormFieldFabric
                    defaultValue={defaultValues?.[field.name]}
                    key={field.name}
                    field={field}
                    errorMessage={errors[field.name]?.message}
                    register={register}
                    getValues={getValues}
                />
            ))}

            <button className={styles.submitButton} type="submit">
                {buttonTitle ?? "Сохранить"}
            </button>
        </form>
    );
};

export default Form;
