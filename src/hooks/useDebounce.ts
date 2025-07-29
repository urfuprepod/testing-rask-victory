import { useEffect, useRef, useState } from "react";

export const useDebounce = (startValue?: string, delay: number = 500) => {
    const [data, setData] = useState(startValue ?? "");
    const [debouncedValue, setDebouncedValue] = useState(data);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    function onChangeString(e: React.ChangeEvent<HTMLInputElement>) {
        setData(e.target.value);
    }
    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            setDebouncedValue(data ?? "");
        }, delay);
    }, [data]);

    return { value: data, debouncedValue, setValue: onChangeString };
};
