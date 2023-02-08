import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={`${styles.container} my-10 sm:my-0`}>
      <main className={styles.main}>
        <h1 className={`text-[2.5rem] sm:text-[4rem] ${styles.title}`}>
          Welcome to the{" "}
          <span className="font-semibold">
            Plusi<span className="text-secondary">Send</span>
          </span>
        </h1>

        <p className={`${styles.description} text-[1rem] sm:text-[1.5rem]`}>
          Send ether to multiple addresses at once. PlusiSend is typically done
          through the use of a list of addresses and amount which is used to
          send the ethers.
        </p>

        <div className={`block sm:hidden ${styles.connect}`}>
          <ConnectWallet />
        </div>

        <div className={styles.grid}>
          <Link href="/send" legacyBehavior>
            <a className={styles.card}>
              <h2>Send Now &rarr;</h2>
              <p>Add multiple address and amount to be sent</p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}

Home.title = "Welcome"
