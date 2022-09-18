import React, { TableHTMLAttributes } from "react";
import styles from "./table.module.scss";

export const TableHead: React.FC = (props) => {
    return (
        <thead className={styles.Thead}>
            {props.children}
        </thead>
    )
}

export const TableBody: React.FC = (props) => {
    return (
        <tbody className={styles.Tbody}>
            {props.children}
        </tbody>
    )
}

export const TableRow: React.FC = (props) => {
    return (
        <tr>{props.children}</tr>
    )
}

export const Table:React.FC<React.TableHTMLAttributes<HTMLTableElement>> = (props) => {
    return (
        <table className={styles.Table} {...props}>{props.children}</table>
    )
}