import React from 'react'
import { Routes, Route, useNavigate, HashRouter } from "react-router-dom";
import { App } from './App'
import { Discover } from './pages/Discover';

export const MainRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
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
  )
}