import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import SearchResults from "./components/SearchResults";
import DetailsPage from "./components/DetailsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/details/:name" element={<DetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
