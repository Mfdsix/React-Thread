import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"

import Home from "./pages/Home";
import Add from "./pages/notes/Add";
import Detail from "./pages/notes/Detail";
import PageNotFound from "./pages/PageNotFound";

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/new" element={<Add />} />
        <Route path="/:id" element={<Detail />} />


        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default Router;
