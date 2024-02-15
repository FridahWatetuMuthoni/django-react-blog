import axios from "axios";
import { useState } from "react";
import UseAuthContext from "../../hooks/UseAuthContext";
import { useNavigate } from "react-router-dom";

function NewPost() {
  const [myError, setMyError] = useState("");
  const { token } = UseAuthContext();
  const nagivate = useNavigate();

  const url = `http://127.0.0.1:8000/api/articles/`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    for (let [key, value] of formData.entries()) {
      if (key === "image") {
        if (!value.name) {
          setMyError("All values must be added before submitting the form");
        }
      } else if (key !== "image") {
        if (!value.trim()) {
          setMyError("All values must be added before submitting the form");
        }
      }
    }
    if (!myError) {
      try {
        console.log(formData);
        const response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${token}`,
          },
          withCredential: true,
        });
        console.log(response.data);
        nagivate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <section className="container-md row justify-content-center mb-5">
      <form
        className="col-12 col-sm-12 col-md-8 shadow-lg mt-4 px-4 py-3 p-lg-5"
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center mx-3">Create New Post</h1>
        {myError && (
          <section className="alert alert-danger">
            <p className="m-0">{myError}</p>
          </section>
        )}

        <section>
          <label htmlFor="title" className="form-label mt-2 ">
            Title
          </label>
          <input className="form-control" type="text" name="title" id="title" />
        </section>

        <section>
          <label htmlFor="description" className="form-label mt-2 ">
            Description
          </label>
          <input
            className="form-control"
            type="text"
            name="description"
            id="description"
          />
        </section>

        <section>
          <label htmlFor="category" className="form-label mt-2 ">
            Category
          </label>
          <input
            className="form-control"
            type="text"
            name="category"
            id="category"
          />
        </section>

        <section>
          <label htmlFor="content" className="form-label mt-2 ">
            Content
          </label>
          <textarea
            className="form-control p-4"
            placeholder="Enter your content here .."
            name="content"
            id="content"
            cols="30"
            rows="10"
          ></textarea>
        </section>
        <section>
          <label htmlFor="image" className="form-label mt-2 ">
            Image
          </label>
          <input type="file" name="image" id="image" className="form-control" />
        </section>
        <button type="submit" className="btn btn-success my-5">
          Create Post
        </button>
      </form>
    </section>
  );
}

export default NewPost;
