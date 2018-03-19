import React from "react";

import bgImage from "../assets/bg.jpeg";
import classes from "./App.css";

const App = props => (
  <div className={classes.App}>
    <h1>Webpack 101</h1>
    <img src={bgImage} alt="test" />
  </div>
);

export default App;
