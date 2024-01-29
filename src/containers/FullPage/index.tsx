import { FC } from "react";
import "./index.scss";
import { Outlet } from "react-router-dom";

const FullPage: FC = () => {
  return (
    <div className="full-page">
      <Outlet />
    </div>
  );
};

export default FullPage;
