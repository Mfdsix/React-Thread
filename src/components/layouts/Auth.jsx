import React from "react";
import AppFooter from "../common/AppFooter";

function AuthLayout({ children }) {
  return (
    <>
      <main>{children}</main>
      <AppFooter />
    </>
  );
}

export default AuthLayout;
