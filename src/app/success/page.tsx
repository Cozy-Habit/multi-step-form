import Image from "next/image";
import styles from "./page.module.scss";

const Page = () => {
  return (
    <div className={styles.page}>
      <Image src="icon-thank-you.svg" width={64} height={64} alt="Checkmark" />
      <h1>Thank you!</h1>
      <p className={styles.page__text}>
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com
      </p>
    </div>
  );
};
export default Page;
