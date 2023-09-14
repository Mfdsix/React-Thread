import React from "react";
import { Link } from "react-router-dom";

import { ThemeConsumer } from "../../data/context/ThemeContext";
import { UserConsumer } from "../../data/context/UserContext";
import { FaMoon, FaSun, FaSignOutAlt } from "react-icons/fa";
import { setAccessToken } from "../../data/api/http";

function AppHeader() {

  const logout = (setUser) => {
    let confirm = confirm("Logout from application ?");

    if(confirm){
      setAccessToken(null);
      setUser(null);
    }
  }

  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => {
        return (
          <UserConsumer>
            {({ user, setUser }) => {
              return (
                <header>
                  <div className="header__brand">
                    <Link to="/">
                      <h1>Puth's Diary</h1>
                    </Link>
                  </div>
                  <div className="header__profile">
                    <button
                      onClick={() => toggleTheme()}
                      className="btn btn__transparent"
                    >
                      {theme == "dark" ? <FaSun /> : <FaMoon />}
                    </button>
                    <h3 className="header__username">{ user.name }</h3>
                    <img
                      className="header__image"
                      src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
                      alt="User"
                    />
                    <button
                      onClick={() => logout(setUser)}
                      className="btn btn__transparent"
                    >
                      <FaSignOutAlt />
                    </button>
                  </div>
                </header>
              );
            }}
          </UserConsumer>
        );
      }}
    </ThemeConsumer>
  );
}

export default AppHeader;
