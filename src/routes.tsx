import React from 'react'
import { Routes, Route, HashRouter } from "react-router-dom";
import { App } from './App'
import { Discover } from './pages/Discover';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { UserProvider } from './context/userContext';

export const MainRoutes = () => {
  return (
    <UserProvider>
      <HashRouter>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/login" element={
            <Login />
          } />

          <Route path="/register" element={
            <Register />
          } />

          <Route path="/" element={
            <App>
              <Discover />
            </App>
          } />

          {/* PRIVATE ROUTES */}

          {/* <Route path="/member-area/home" element={
          <MemberArea>
            <Home />
          </MemberArea>
        } /> */}
        </Routes>
      </HashRouter>
    </UserProvider>
  )
}