import axios from "axios";
import { useLocation, Link, useNavigate } from "react-router-dom";
import UseAuthContext from "../../hooks/UseAuthContext";

function DeletePost() {
  const { state } = useLocation();
  const { id } = state;
  const { token } = UseAuthContext();
  const url = `http://127.0.0.1:8000/api/articles/${id}/`;
  const nagivate = useNavigate();

  const handleDelete = async () => {
    await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      withCredential: true,
    });
    console.log("success");
    nagivate("/");
  };
  return (
    <section className="mt-5 shadow-lg w-75 mx-auto rounded-5 p-5">
      <h2 className="text-center p-5">
        Are you sure you want to delete this post?
      </h2>
      <div className="text-center">
        <Link
          to={`/posts/${id}`}
          state={state}
          className="btn btn-primary mx-2"
        >
          Go Back to post
        </Link>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </div>
    </section>
  );
}

export default DeletePost;
