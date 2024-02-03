import React, { FC, PropsWithChildren, useState } from "react";
import "./index.scss";

interface IConfirmButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  outline: boolean;
  danger?: boolean;
  disable?: boolean;
  disabled?: boolean;
}

const ConfirmButton: FC<PropsWithChildren<IConfirmButtonProps>> = ({
  children,
  onClick,
  outline,
  danger,
  disable,
  disabled,
}) => {
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  if (disabled) {
    setButtonDisabled(true);
  }

  const onClickHandle: React.MouseEventHandler<HTMLButtonElement> = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onClick(event);

    if (disable) {
      setButtonDisabled(true);
    }
  };

  return (
    <button
      disabled={isButtonDisabled}
      className={`button ${
        outline && danger
          ? "button--outline-danger"
          : outline
          ? "button--outline"
          : ""
      }`}
      onClick={onClickHandle}
    >
      {children}
    </button>
  );
};

export default ConfirmButton;
