import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./css/App.css";
import Header from "./comp/Header";
import Footer from "./comp/Footer";

import { MuiThemeProvider } from "@material-ui/core/styles";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import * as Pages from "./comp/pages";
import { theme } from "./theme";

library.add(fas, far);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <div className="app-content-wrapper">
          <Router>
            <Route exact path="/" component={Pages.MainPage} />
            <Route
              path="/projects/detail/:uuid"
              component={Pages.ProjectDetailPage}
            />
          </Router>
        </div>
        <Footer />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
