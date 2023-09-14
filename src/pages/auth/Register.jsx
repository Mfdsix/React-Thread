import React from "react";
import AuthLayout from "../../components/layouts/Auth";
import RegisterForm from "../../components/auth/RegisterForm";

function Register() {
  return (
    <>
      <AuthLayout>
        <div className="auth__card">
          <div className="auth__header">
            <h3 className="auth__title">Register</h3>
            <div className="auth__desc">
              Calm down, register your account here
            </div>
          </div>

          <RegisterForm/>
        </div>
      </AuthLayout>
    </>
  );
}

export default Register;
