import { FC } from "react";
import "./index.scss";
import { Outlet } from "react-router-dom";
import { useWindowSize } from "../../hooks/window-resize";

const FullPage: FC = () => {
  const [, heigth] = useWindowSize();

  return (
    <div className="full-page" style={{ height: `${heigth}px` }}>
      <Outlet />
    </div>
  );
};

export default FullPage;
