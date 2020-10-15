import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import DiscoverMoviesPage from "./pages/DiscoverMoviesPage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/discover/:searchText?" component={DiscoverMoviesPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/movies/:imdbID" component={MoviePage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
