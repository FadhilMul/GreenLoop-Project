import React, { useEffect } from "react";
import "./App.css";
import axios from "axios";

// Import components
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Products from "./components/Products";
import Vision from "./components/Vision";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  // Test backend connection
  const testBackendConnection = async () => {
    try {
      const response = await axios.get(`${API}/`);
      console.log('Backend connected:', response.data.message);
    } catch (e) {
      console.error('Backend connection error:', e);
    }
  };

  useEffect(() => {
    testBackendConnection();
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <About />
        <Products />
        <Vision />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;