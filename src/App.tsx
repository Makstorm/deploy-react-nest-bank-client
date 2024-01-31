import { useEffect } from "react";
import AppRouter from "./components/AppRouter";
import Page from "./containers/page";
import "react-loading-skeleton/dist/skeleton.css";
import { useAppDispatch } from "./hooks/redux";
import { fetchIsAuth } from "./store/reducers/ActionCreators";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(fetchIsAuth());
    }
  }, []);

  return (
    <Page>
      {/* <PhoneDisplay> */}
      <AppRouter />
      {/* </PhoneDisplay> */}
    </Page>
  );
}

export default App;
