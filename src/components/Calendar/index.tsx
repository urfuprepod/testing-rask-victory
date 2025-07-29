import React, { FC } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type Props = {
    value: Range;
    onChange: (val: RangeKeyDict) => void;
    bookedDates?: Date[];
};

const date = new Date()

const Calendar: FC<Props> = (props) => {
    const { value, onChange, bookedDates } = props;

    return (
        <DateRange
            className="w-full border border-gray-400 rounded-xl mb-4"
            rangeColors={["#262626"]}
            ranges={[value]}
            date={date}
            direction="vertical"
            minDate={date}
            onChange={onChange}
            disabledDates={bookedDates}
        />
    );
};

export default Calendar;
