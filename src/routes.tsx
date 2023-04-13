import React from 'react'
import { Routes, Route, useNavigate, HashRouter } from "react-router-dom";
import { App } from './App'
import { Home } from './pages/Home';

export const MainRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={
          <App>
            <Home />
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
  )
}