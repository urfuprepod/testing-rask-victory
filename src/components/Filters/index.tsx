import React, { FC } from "react";
import Input from "../Input";
import { DateRangePicker, Range, RangeKeyDict } from "react-date-range";
import { DateRangeType } from "@/types";
import {ru} from 'date-fns/locale'

type Props = {
    searchValue: string;
    updateSerchValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
    rangeValue: DateRangeType[];
    setDateRange: (item: RangeKeyDict) => void;
};

const Filters: FC<Props> = (props) => {
    const { searchValue, updateSerchValue, setDateRange, rangeValue } = props;

    const onChange = (e: any) => {
        updateSerchValue(e);
    };

    const dayContentRenderer = (date: Date) => {
        const isStartDate =
            rangeValue[0].startDate &&
            !rangeValue[0].endDate &&
            date.getTime() === rangeValue[0].startDate.getTime();

        return (
            <div
                className={isStartDate ? "custom-selected-start" : ""}
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: 'black',
                    borderRadius: '1.042em'
                }}
            >
                {date.getDate()}
            </div>
        );
    };

    return (
        <div>
            <Input
                placeholder="Поиск по названию"
                value={searchValue}
                onChange={onChange}
            />
            <DateRangePicker
                ranges={rangeValue}
                onChange={setDateRange}
                showMonthAndYearPickers={false}
                showDateDisplay={false}
                showPreview={false}
                monthDisplayFormat="MMMM yyyy"
                editableDateInputs={false}
                inputRanges={[]}
                staticRanges={[]}
                dayContentRenderer={dayContentRenderer}
                rangeColors={
                    rangeValue[0].startDate && rangeValue[0].endDate
                        ? ["#3d91ff"]
                        : ["white"]
                }
                locale={{
                    ...ru,
                    options: {
                        ...ru.options,
                        weekStartsOn: 1
                    }
                }}
            />
        </div>
    );
};

export default Filters;
