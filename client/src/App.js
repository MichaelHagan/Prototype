import "./dist/styles.css";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Models from "./Pages/Models";
import TestimonialsPage from "./Pages/TestimonialsPage";
import Team from "./Pages/Team";
import Contact from "./Pages/Contact";
import Register from "./Pages/Register";
import Join from "./Pages/Join";
import BookCar from "./Pages/BookCar";
import ViewRide from "./Pages/ViewRide";


function App() {
 
  return (
    <>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="models" element={<Models />} />
        {/* <Route path="testimonials" element={<TestimonialsPage />} /> */}
        {/* <Route path="team" element={<Team />} /> */}
        <Route path="contact" element={<Contact />} />
        <Route path="register" element={<Register/>}/>
        <Route path="registration-login-page" element={<Join />} />
        <Route path="book-a-car" element={<BookCar/>}/>
        <Route path="view-ride-details" element={<ViewRide/>}/>
      </Routes>
    </>
  );
}

export default App;
