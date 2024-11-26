import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Hero from "./components/content/Hero";
import UploadSection from "./components/Upload/Upload";
import Analysis from "./components/analysis/Analsis";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/upload" element={<UploadSection />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
