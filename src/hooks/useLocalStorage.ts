import { useEffect, useState } from "react";

function isDateString(str: string): boolean {
    // Проверяем ISO формат и другие распространенные форматы дат
    return /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?Z?)?$/.test(str);
}

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue === null) return initialValue;
        return JSON.parse(jsonValue);
    });

    useEffect(() => {
        const jsonValue = localStorage.getItem(key);
        setValue(
            jsonValue === null
                ? initialValue
                : JSON.parse(jsonValue, (key, value) => {
                      if (typeof value === "string" && isDateString(value)) {
                          return new Date(value);
                      }
                      return value;
                  })
        );
    }, [key]);

    useEffect(() => {
        if (!!key) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [value]);

    return [value, setValue];
}
