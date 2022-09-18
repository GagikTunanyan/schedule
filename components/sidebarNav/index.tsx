import React from "react";
import Image from "next/image";
import styles from "./sidebarNav.module.scss";
import Link from "next/link";
import { FiUsers } from "react-icons/fi";
import { useRouter } from "next/router";

const navigations = [
    { icon: <FiUsers fontSize={24} />, url: "/" },
];

type Nav = {
    icon: JSX.Element;
    url: string;
}

const SidebarNav: React.FC = () => {
    const router = useRouter();
    const { pathname } = router;
    return (
        <nav className={styles.LeftSidebar}>
            <div className={styles.LogoBlock}>
                <Link href="/">
                    <a>
                        <Image 
                            src="/logo.png"
                            layout="responsive"
                            width={32}
                            height={32}
                            alt="logo"
                        />
                    </a>
                </Link>
            </div>
            {navigations.map((item: Nav, index) => (
                <Link href={item.url} key={`${index}#${item.url}`}>
                    <a className={`${styles.NavItem} ${pathname === item.url ? styles.Selected : ""}`}>
                        {item.icon}
                    </a>
                </Link>
            ))}
        </nav>
    )
};

export default SidebarNav