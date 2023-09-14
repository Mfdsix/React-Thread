import React from "react";
import AuthLayout from "../../components/layouts/Auth";
import LoginForm from "../../components/auth/LoginForm";

function Login() {
  return (
    <>
      <AuthLayout>
        <div className="auth__card">
          <div className="auth__header">
            <h3 className="auth__title">Login</h3>
            <div className="auth__description">
              Please login to access your notes
            </div>
          </div>

          <LoginForm/>
        </div>
      </AuthLayout>
    </>
  );
}

export default Login;
