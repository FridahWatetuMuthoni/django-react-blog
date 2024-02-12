import "./app.scss";
import Home from "./Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { GlobalContextProvider } from "./context/context";

function App() {
  return (
    <section>
      <GlobalContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </GlobalContextProvider>
    </section>
  );
}

export default App;
