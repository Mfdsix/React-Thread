import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { AuthRequest } from "../../data/api/dicoding-notes";
import { Link, useNavigate } from "react-router-dom";
import { setAccessToken } from "../../data/api/http";
import {
  UserConsumer
} from "../../data/context/UserContext";

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [formLoading, setFormLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onFormSubmit = async (e, setUser) => {
    e.preventDefault();

    setFormLoading(true);

    const { error, message, data } = await AuthRequest.login({
      email,
      password,
    });

    setFormLoading(false);
    if (!error) {
      setAccessToken(data.accessToken);
      await getUserData(setUser);

      return navigate("/");
    } else {
      setEmailError(message);
    }
  };

  const getUserData = async (setUser) => {
    const { error, message, data } = await AuthRequest.profile();

    if(!error) return setUser(data);
    return setEmailError(message);
  }

  useEffect(() => {
    if (!email || !password) {
      if (!email) setEmailError("Email must be filled");
      if (!password) setPasswordError("Password must be filled");

      setFormDisabled(true);
    }

    return () => {
      setEmailError("");
      setPasswordError("");
      setFormDisabled(false);
    };
  }, [email, password]);

  return (
    <>
      <UserConsumer>
        {({ user, setUser }) => {
          return (
            <>
              <div className="auth__body">
                <form onSubmit={(e) => onFormSubmit(e, setUser)}>
                  <div className="form__group form__limit__char">
                    <input
                      value={email}
                      onChange={onEmailChange}
                      type="email"
                      placeholder="Email"
                      className="form__input"
                    />
                    {emailError && (
                      <span className="form__invalid__feedback">
                        *( {emailError}
                      </span>
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
                    <Link className="btn btn__transparent" to="/register">
                      Register
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
        }}
      </UserConsumer>
    </>
  );
}

export default LoginForm;
