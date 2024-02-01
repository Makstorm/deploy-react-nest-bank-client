import { BallTriangle } from "react-loader-spinner";

const FullPageLoader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#5b94e9"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default FullPageLoader;
