import React from "react";
import { MdAdd } from "react-icons/md";
import styles from "./addedCard.module.scss";

interface AddedCardPropTypes {
    onClick: CallableFunction;
    date: Date
}

const AddedCard: React.FC<AddedCardPropTypes> = (props) => {
    const { onClick, date } = props;
    return (
        <div className={styles.AddedCardWrapper} onClick={() => onClick(date)}>
            <span className={styles.AddedIcon}>
                <MdAdd />
            </span>
        </div>
    )
};

export default AddedCard