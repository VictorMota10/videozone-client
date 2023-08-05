import React from "react";
import { Routes, Route, HashRouter, useNavigate } from "react-router-dom";
import { App } from "./App";
import { Discover } from "./pages/Discover";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { UserProvider, useUser } from "./context/userContext";
import { Sessions } from "./pages/Sessions";
import { Friends } from "./pages/Friends";
import { GoToLogin } from "./pages/GoToLogin";
import { MyChannels } from "./pages/Channels/MyChannels";
import { ManageChannel } from "./pages/Channels/ManageChannel";
import { Channel } from "./pages/Channels/Channel";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { userCredentials } = useUser();
  const userLocalStorage = localStorage.getItem("userData");

  if (!userCredentials && !userLocalStorage) {
    return <GoToLogin />;
  } else {
    return children;
  }
};

export const MainRoutes = () => {
  return (
    <UserProvider>
      <HashRouter>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/sign-in" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <App>
                <Discover />
              </App>
            }
          />

          {/* PRIVATE ROUTES */}
          <Route
            path="/sessions"
            element={
              <PrivateRoute>
                <App>
                  <Sessions />
                </App>
              </PrivateRoute>
            }
          />

          <Route
            path="/friends"
            element={
              <PrivateRoute>
                <App>
                  <Friends />
                </App>
              </PrivateRoute>
            }
          />

          <Route
            path="/my-channels"
            element={
              <PrivateRoute>
                <App>
                  <MyChannels />
                </App>
              </PrivateRoute>
            }
          />

          <Route
            path="/manage-channel/:user_owner_uid/:id"
            element={
              <PrivateRoute>
                <App>
                  <ManageChannel />
                </App>
              </PrivateRoute>
            }
          />

          <Route
            path="/channel/:id"
            element={
              <PrivateRoute>
                <App>
                  <Channel />
                </App>
              </PrivateRoute>
            }
          />

          <Route path="*" element={<h1>404 NOT FOUND</h1>} />
        </Routes>
      </HashRouter>
    </UserProvider>
  );
};
