import Navbar from "./Components/Navbar/Navbar";
import "./App.css";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Appointment from "./Pages/Appointment/Appointment.jsx";
import Vaccaine from "./Pages/Vaccaine/Vaccaine.jsx";
import Report from "./Pages/Report/Report.jsx";
import { ThemeProvider } from "@mui/material";
import { theme } from "./Helper/Theme";
import Customer from "./Pages/Customer/Customer.jsx";
import Animal from "./Pages/Animal/Animal.jsx";
import Doctor from "./Pages/Doctor/Doctor.jsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <div className="main-area">
        <BrowserRouter>
          <Route exact path={["/", "/home"]}>
            <Home />
          </Route>
          <Route path="/appointment">
            <Appointment />
          </Route>
          <Route path="/vaccaine">
            <Vaccaine />
          </Route>
          <Route path="/report">
            <Report />
          </Route>
          <Route path="/customer">
            <Customer />
          </Route>
          <Route path="/animal">
            <Animal />
          </Route>
          <Route path="/doctor">
            <Doctor />
          </Route>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
