import React, { useState, useRef, useEffect } from "react";
import { addDays, format, differenceInDays, subDays } from "date-fns";
import styles from "./rangeDatePicker.module.scss";
import { DateRange } from "react-date-range";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import Button from "../button";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export type RangeType = {
  startDate: Date;
  endDate: Date;
  key: string;
  differenceRange: number;
}

interface RangeDatePropTypes {
  onChange?: CallableFunction
}

const RangeDatePicker: React.FC<RangeDatePropTypes> = (props) => {
    const { onChange } = props; 
    const [open, setOpen] = useState(false);
    const [differenceRange, setDifferenceRange] = useState(7)

    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), differenceRange),
            key: 'selection'
        }
    ]);
    const refOne = useRef(null);

    const hideOnEscape = (e: any) => {
        if( e.key === "Escape" ) {
          setOpen(false)
        }
      }
    
    const hideOnClickOutside = (e: any) => {
      // @ts-ignore
      if( refOne.current && !refOne.current.contains(e.target) ) {
        setOpen(false)
      }
    }

    const handleRightClick = () => {
      setRange([{startDate: new Date(range[0].endDate), endDate: addDays(new Date(range[0].endDate), differenceRange), key: "selection"}])
    }

    const handleLeftClick = () => {
      setRange([{startDate: subDays(new Date(range[0].startDate), differenceRange), endDate: new Date(range[0].startDate), key: "selection"}])
    }

    useEffect(() => {
        document.addEventListener("keydown", hideOnEscape, true);
        document.addEventListener("click", hideOnClickOutside, true);

        return () => {
            document.removeEventListener("keydown", hideOnEscape, true);
            document.removeEventListener("click", hideOnClickOutside, true);  
        }
    }, []);

    useEffect(() => {
      setDifferenceRange(differenceInDays(range[0].endDate, range[0].startDate));
      onChange?.({...range[0], differenceRange,})
    }, [range, differenceRange]);

    return (
        <div className={styles.WrapDatePicker}>
            <div className={styles.WrapperShowBlock}>
              <div className={styles.RowControll} onClick={handleLeftClick}>
                <BiChevronLeft color="#344054" />
              </div>
              <Button
                icon={<AiOutlineCalendar />}
                className={styles.ShowDateInput}
                onClick={() => setOpen(!open)}
              >
                <>{format(range[0].startDate, "MMM dd, yyyy")} - {format(range[0].endDate, "MMM dd, yyyy")}</>
              </Button>
              <div className={styles.RowControll} onClick={handleRightClick}>
                <BiChevronRight color="#344054" />
              </div>
            </div>
            <div ref={refOne} className={styles.DatePickerWrapper}>
                {open && 
                  <DateRange
                    onChange={(item: any) => setRange([item.selection])}
                    editableDateInputs={false}
                    moveRangeOnFirstSelection={false}
                    ranges={range}
                    months={1}
                    direction="horizontal"
                  />
                }
            </div>
        </div>
    )
};

export default RangeDatePicker