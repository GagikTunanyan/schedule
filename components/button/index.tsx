import React from "react";
import styles from "./button.module.scss";

interface ButtonProps {
    children: JSX.Element | string;
    icon?: JSX.Element
}

const Button: React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const { children, className, icon, ...restProps } = props
    return (
        <button {...restProps} className={`${className} ${styles.Wrapper}`}>
            <span className={styles.Icon}>{icon}</span>
            {children}
        </button>
    )
};

export default Button