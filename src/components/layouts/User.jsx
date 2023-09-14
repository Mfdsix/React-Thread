import React from "react";
import AppHeader from "../common/AppHeader";
import AppFooter from "../common/AppFooter";

import { UserConsumer } from "../../data/context/UserContext";

function UserLayout({ needAuth = true, children }) {
  return (
    <>
      <UserConsumer>
        {({ user }) => {
          if (!user && needAuth) {
            alert("Anda harus login terlebih dahulu");
            return (window.location.href = "/login");
          }

          return (
            <>
              <AppHeader />
              <main>{children}</main>
              <AppFooter />
            </>
          );
        }}
      </UserConsumer>
    </>
  );
}

export default UserLayout;
