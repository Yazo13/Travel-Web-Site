import React, { useEffect, useState } from "react";
import ScrollToTop from "./Components/ScrollToTop";
import NavBar from "./Components/NavBar";
import Navbar from "./Components/admin/Navbar";
import Service from "./Components/Service";
import Testimonials from "./Components/Testimonials";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import Recommendation from "./Components/Recommendation";
import AdminMain from "./Components/admin/AdminMain";
import Classes from "./Styles/Footer.module.css";

function App() {
  const [userRole, setUserRole] = useState(null); 

  useEffect(() => {
    const role = localStorage.getItem('user');
    setUserRole(role ? JSON.parse(role).user_role : null);
  }, []);

  return (
    <div className={Classes.app}>
      <ScrollToTop />
      {userRole === '1' ? (
        <>
        <Navbar />
        <AdminMain />
        </>
      ) : (
        <>
          <NavBar />
          <Hero />
          <Service />
          <Recommendation />
          <Testimonials />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
