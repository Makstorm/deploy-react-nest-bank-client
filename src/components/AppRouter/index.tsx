import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { authRoutes, publicRoutes } from "./routes";
import { BALANCE_ROUTE, INDEX_ROUTE } from "./consts";
import PhoneDisplay from "../../containers/PhoneDisplay";
import ProtectedRoute from "./ProtectedRoute";
import { useWindowSize } from "../../hooks/window-resize";
import FullPage from "../../containers/FullPage";
import FullPageLoader from "../Common/FullPageLoader";

const AppRouter = () => {
  const { isAuth, isCheckLoading } = useAppSelector(
    (state) => state.userReduser
  );

  const [width] = useWindowSize();

  const createRoutes = () => {
    return createRoutesFromElements(
      <>
        {authRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              isCheckLoading ? (
                <FullPageLoader />
              ) : (
                <ProtectedRoute>
                  <Component />
                </ProtectedRoute>
              )
            }
            errorElement={<div>404 Not found</div>}
          />
        ))}
        {publicRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={isCheckLoading ? <FullPageLoader /> : <Component />}
            errorElement={<div>404 Not found</div>}
          />
        ))}
        <Route
          path="*"
          element={
            (isAuth && <Navigate to={BALANCE_ROUTE} />) || (
              <Navigate to={INDEX_ROUTE} />
            )
          }
        />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      element: width < 500 ? <FullPage /> : <PhoneDisplay />,
      children: createRoutes(),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
