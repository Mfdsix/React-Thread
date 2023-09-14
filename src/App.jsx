import React from "react";
import Router from "./router";

import { ThemeProvider } from "./data/context/ThemeContext";
import { LangProvider } from "./data/context/LangContext";
import { UserProvider } from "./data/context/UserContext";
import { AuthRequest } from "./data/api/dicoding-notes";

const LOCAL_THEME_KEY = "LOCAL_THEME";
const LOCAL_LANG_KEY = "LOCAL_LANG";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initializing: true,
      themeContext: {
        theme: localStorage.getItem(LOCAL_THEME_KEY) || "light",
        toggleTheme: () => {
          this.setState((prevState) => {
            const newTheme =
              prevState.themeContext.theme === "light" ? "dark" : "light";
            localStorage.setItem(LOCAL_THEME_KEY, newTheme);
            return {
              themeContext: {
                ...prevState.themeContext,
                theme: newTheme,
              },
            };
          });
        },
      },
      langContext: {
        lang: localStorage.getItem(LOCAL_LANG_KEY) || "id",
        toggleLang: (newLang) => {
          this.setState((prevState) => {
            localStorage.setItem(LOCAL_LANG_KEY, newLang);
            return {
              langContext: {
                ...prevState.langContext,
                lang: newLang,
              },
            };
          });
        },
      },
      userContext: {
        user: null,
        setUser: (user) => {
          this.setState((prevState) => {
            return {
              userContext: {
                ...prevState.userContext,
                user,
              },
            };
          });
        },
      },
    };
  }

  async componentDidMount() {
    const { error, data } = await AuthRequest.profile();

    if (!error) {
      this.state.userContext.setUser(data);
    }

    this.setState(() => {
      return {
        initializing: false,
      };
    });
  }

  componentDidUpdate(){
    document.documentElement.setAttribute('data-theme', this.state.themeContext.theme);
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    return (
      <ThemeProvider value={this.state.themeContext}>
        <LangProvider value={this.state.langContext}>
          <UserProvider value={this.state.userContext}>
            <Router />
          </UserProvider>
        </LangProvider>
      </ThemeProvider>
    );
  }
}

export default App;
