import clsx from "clsx";
import { useId } from "react";
import styles from "./Checkbox.module.scss";

interface CheckboxProps {
  title: string;
  subtitle: string;
  price: string;
  isSelected: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({
  price,
  subtitle,
  title,
  isSelected,
  onChange,
}: CheckboxProps) => {
  const uid = useId();
  return (
    <label
      htmlFor={uid}
      className={clsx(styles.checkbox, {
        [styles["checkbox--selected"]]: isSelected,
      })}
    >
      <input
        id={uid}
        type="checkbox"
        checked={isSelected}
        className={styles.checkbox__input}
        onChange={onChange}
      />
      <div className={styles.checkbox__textWrapper}>
        <div className={styles.checkbox__text}>
          <p className={styles.checkbox__title}>{title}</p>
          <p className={styles.checkbox__subtitle}>{subtitle}</p>
        </div>
        <span className={styles.checkbox__price}>+{price}</span>
      </div>
    </label>
  );
};

export default Checkbox;
