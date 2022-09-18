import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import SidebarNav from '../components/sidebarNav';
import styles from "../styles/app.module.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.App}>
      <SidebarNav />
      <main className={styles.Main}>
        <Component {...pageProps} />
      </main>
    </div>
  )
}

export default MyApp
