import React, { FC } from "react";
import styles from "./styles.module.css";

type Props = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

const Input: FC<Props> = (props) => {
    return <input {...props} className={styles.input} />;
};

export default Input;
