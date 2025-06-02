import styles from "./Headline.module.scss";
interface HeadlineProps {
  title: string;
  subtitle: string;
}

const Headline = ({ subtitle, title }: HeadlineProps) => {
  return (
    <div className={styles.headline}>
      <h1 className={styles.headline__title}>{title}</h1>
      <p className={styles.headline__subtitle}>{subtitle}</p>
    </div>
  );
};

export default Headline;
