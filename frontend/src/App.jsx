import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalContextProvider } from "./context/context";
import { AuthContextProvider } from "./context/authContext";
import "./app.scss";
import Home from "./Home";
import Navbar from "./components/Navbar";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import NewPost from "./components/CreatePost/NewPost";
import EditPost from "./components/CreatePost/EditPost";
import PostDetail from "./components/PostDetail/PostDetail";
import Missing from "./components/Missing/Missing";

function App() {
  return (
    <section>
      <AuthContextProvider>
        <GlobalContextProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/create-post" element={<NewPost />} />
              <Route exact path="/edit-post" element={<EditPost />} />
              <Route exact path="/post" element={<PostDetail />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="*" element={<Missing />} />
            </Routes>
          </BrowserRouter>
        </GlobalContextProvider>
      </AuthContextProvider>
    </section>
  );
}

export default App;
