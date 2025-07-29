import { FormField } from "@/types";
import React, { FC, useId } from "react";
import classNames from "classnames";
import styles from "./style.module.css";
import { UseFormGetValues, UseFormRegister } from "react-hook-form";

type Props = {
    field: FormField;
    defaultValue?: string;
    errorMessage?: string;
    register: UseFormRegister<Record<string, string>>;
    getValues: UseFormGetValues<Record<string, string>>;
};

const FormFieldFabric: FC<Props> = ({
    field,
    defaultValue,
    errorMessage,
    register,
    getValues,
}) => {
    const id = useId();

    return (
        <>
            <label
                className={classNames(styles.label, {
                    [styles.required]: !!field.isRequired,
                })}
                htmlFor={id}
            >
                {field.label}
            </label>
            {field.type === "select" && (
                <select
                    id={id}
                    defaultValue={defaultValue}
                    {...register(field.name, {
                        required: field.isRequired
                            ? "Это поле обязательно"
                            : false,
                    })}
                >
                    {field?.options?.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>
            )}
            {field.type !== "select" && (
                <input
                    id={id}
                    placeholder={field.placeholder ?? 'Введите...'}
                    defaultValue={defaultValue}
                    type={field.type}
                    {...register(field.name, {
                        required: field.isRequired
                            ? "Это поле обязательно"
                            : false,
                        validate: field.dependsOn
                            ? (val: string) => {
                                  if (!val) return true
                                  const fieldName = field.dependsOn!;
                                  const value = getValues(fieldName.field);
                                  if (!value) return true;
                                  return new Date(val) >= new Date(value)
                                      ? true
                                      : fieldName.errorMessage;
                              }
                            : () => true,
                    })}
                />
            )}
            {errorMessage && (
                <span style={{ color: "red" }}>{errorMessage}</span>
            )}
        </>
    );
};

export default FormFieldFabric;
