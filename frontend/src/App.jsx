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
import RequireAuth from "./components/RequireAuth";
import ProfilePage from "./components/profile/ProfilePage";
import EditProfilePage from "./components/profile/EditProfile";
import DeletePost from "./components/PostDetail/DeletePost";

function App() {
  return (
    <section>
      <AuthContextProvider>
        <GlobalContextProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="*" element={<Missing />} />

              {/* Private Routes */}
              <Route element={<RequireAuth />}>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/create-post" element={<NewPost />} />
                <Route exact path="/posts/:id" element={<PostDetail />} />
                <Route
                  exact
                  path="/delete-posts/:id"
                  element={<DeletePost />}
                />
                <Route exact path="/edit-posts/:id" element={<EditPost />} />

                <Route exact path="/profile" element={<ProfilePage />} />
                <Route
                  exact
                  path="/edit-profile"
                  element={<EditProfilePage />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </GlobalContextProvider>
      </AuthContextProvider>
    </section>
  );
}

export default App;
