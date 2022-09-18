import React, { useState } from "react";
import styles from "./topSidebar.module.scss";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export type TabType = {
    text: string;
    url: string
}
interface TopSidebarProps {
    tabs: TabType[]; 
}

const TopSidebar:React.FC<TopSidebarProps> = (props) => {
    const router = useRouter();

    return (
        <header className={styles.TopSidebar}>
            <Head>
                <title>Schedule</title>
                <meta name="description" content="Schedule" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section className={styles.Container}>
                {props.tabs.map((item, index) => (
                    <Link href={item.url} key={`${index}#${item.url}`}>
                        <a className={`${styles.Tab} ${router.asPath === item.url ? styles.Selected : ""}`}>
                            {item.text}
                            {router.asPath === item.url && (
                                <span className={styles.SelectedBorder} />
                            )}
                        </a>
                    </Link>
                ))}
            </section>
        </header>
    )
};

export default TopSidebar;