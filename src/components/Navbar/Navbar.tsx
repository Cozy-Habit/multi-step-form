"use client";
import clsx from "clsx";
import styles from "./Navbar.module.scss";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__tab}>
        <div
          className={clsx(styles.navbar__tabNumber, {
            [styles["navbar__tabNumber--selected"]]: pathname === "/userinfo",
          })}
        >
          1
        </div>
        <div className={styles.navbar__tabText}>
          <p className={styles.navbar__tabStep}>STEP 1</p>
          <p className={styles.navbar__tabName}>SELECT PLAN</p>
        </div>
      </div>
      <div className={styles.navbar__tab}>
        <div
          className={clsx(styles.navbar__tabNumber, {
            [styles["navbar__tabNumber--selected"]]: pathname === "/plan",
          })}
        >
          2
        </div>
        <div className={styles.navbar__tabText}>
          <p className={styles.navbar__tabStep}>STEP 2</p>
          <p className={styles.navbar__tabName}>SELECT PLAN</p>
        </div>
      </div>
      <div className={styles.navbar__tab}>
        <div
          className={clsx(styles.navbar__tabNumber, {
            [styles["navbar__tabNumber--selected"]]: pathname === "/addons",
          })}
        >
          3
        </div>
        <div className={styles.navbar__tabText}>
          <p className={styles.navbar__tabStep}>STEP 3</p>
          <p className={styles.navbar__tabName}>ADD-ONS</p>
        </div>
      </div>
      <div className={styles.navbar__tab}>
        <div
          className={clsx(styles.navbar__tabNumber, {
            [styles["navbar__tabNumber--selected"]]: pathname === "/summary",
          })}
        >
          4
        </div>
        <div className={styles.navbar__tabText}>
          <p className={styles.navbar__tabStep}>STEP 4</p>
          <p className={styles.navbar__tabName}>SUMMARY</p>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
