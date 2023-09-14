import React from "react";
import UserLayout from "../components/layouts/User";

export default function PageNotFound() {
  return (
    <>
      <UserLayout needAuth={false}>
        <div className="error__wrap">
          <h3 className="error__code">404</h3>
          <h3 className="error__message">O Ow, Not Found</h3>
        </div>
      </UserLayout>
    </>
  );
}
