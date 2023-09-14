import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { AuthRequest } from "../../data/api/dicoding-notes";
import { Link, useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [formLoading, setFormLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    setFormLoading(true);

    const { error, message } = await AuthRequest.register({
      name,
      email,
      password,
    });

    setFormLoading(false);
    if (!error) {
      alert("Registration success");
      return navigate("/login");
    } else {
      setNameError(message);
    }
  };

  useEffect(() => {
    if (!name || !email || !password) {
      if (!name) setNameError("Name must be filled");
      if (!email) setEmailError("Email must be filled");
      if (!password) setPasswordError("Password must be filled");

      setFormDisabled(true);
    }

    return () => {
      setNameError("");
      setEmailError("");
      setPasswordError("");
      setFormDisabled(false);
    };
  }, [name, email, password]);

  return (
    <>
      <div className="auth__body">
        <form onSubmit={onFormSubmit}>
          <div className="form__group form__limit__char">
            <input
              value={name}
              onChange={onNameChange}
              type="text"
              placeholder="Name"
              className="form__input"
            />
            {nameError && (
              <span className="form__invalid__feedback">*( {nameError}</span>
            )}
          </div>

          <div className="form__group form__limit__char">
            <input
              value={email}
              onChange={onEmailChange}
              type="email"
              placeholder="Email"
              className="form__input"
            />
            {emailError && (
              <span className="form__invalid__feedback">*( {emailError}</span>
            )}
          </div>

          <div className="form__group form__limit__char">
            <input
              value={password}
              onChange={onPasswordChange}
              type="password"
              placeholder="Password"
              className="form__input"
            />
            {passwordError && (
              <span className="form__invalid__feedback">
                *( {passwordError}
              </span>
            )}
          </div>

          <div className="form__action flex__end">
            <Link className="btn btn__transparent" to="/login">
              Login
            </Link>
            <button
              disabled={formDisabled || formLoading}
              type="submit"
              className="btn btn__submit"
            >
              {formLoading ? <FaSpinner /> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegisterForm;
