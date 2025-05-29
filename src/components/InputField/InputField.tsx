import clsx from "clsx";
import styles from "./InputField.module.scss";
import { useController, UseControllerProps } from "react-hook-form";
import { UserInfoSchema } from "../UserInfoForm/UserInfoForm";

interface InputFieldProps {
  label: string;
  placeholder: string;
}

const InputField = ({
  label,
  placeholder,
  ...props
}: UseControllerProps<UserInfoSchema> & InputFieldProps) => {
  const { field, fieldState } = useController(props);

  return (
    <div className={styles.inputField}>
      <div className={styles.inputField__labelContainer}>
        <label>{label}</label>
        {fieldState.error && (
          <span className={styles.inputField__error}>
            {fieldState.error.message}
          </span>
        )}
      </div>
      <input
        {...field}
        placeholder={placeholder}
        className={clsx(styles.inputField__input, {
          [styles["inputField__input--error"]]: fieldState.error,
        })}
      />
    </div>
  );
};

export default InputField;
