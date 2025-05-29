import clsx from "clsx";
import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
  variant?: "contained" | "minimal";
  className?: string;
  type?: HTMLButtonElement["type"];
  onClick?: (event: React.FormEvent) => void;
}

const Button = ({
  text,
  variant = "contained",
  className,
  type = "button",
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(className, styles.button, styles[`button--${variant}`])}
    >
      {text}
    </button>
  );
};

export default Button;
