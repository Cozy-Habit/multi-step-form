import clsx from "clsx";
import Image from "next/image";
import styles from "./Select.module.scss";

interface SelectProps {
  img: string;
  title: string;
  subtitle?: string;
  extra?: string;
  onClick: (event: React.FormEvent) => void;
  isSelected?: boolean;
}

const Select = ({
  extra,
  img,
  title,
  subtitle,
  isSelected,
  onClick,
}: SelectProps) => {
  return (
    <button
      type="button"
      className={clsx(styles.select, {
        [styles["select--selected"]]: isSelected,
      })}
      onClick={onClick}
    >
      {img && <Image src={img} width={40} height={40} alt="" />}
      <div className={styles.select__text}>
        <p className={styles.select__title}>{title}</p>
        <p className={styles.select__subtitle}>{subtitle}</p>
        <p className={styles.select__extra}>{extra}</p>
      </div>
    </button>
  );
};

export default Select;
