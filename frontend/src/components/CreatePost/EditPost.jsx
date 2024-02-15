import axios from "axios";
import { useState } from "react";
import UseAuthContext from "../../hooks/UseAuthContext";
import { useNavigate, useLocation } from "react-router-dom";

function NewPost() {
  const { state } = useLocation();
  const { id, category, content, description, image, title } = state;
  const [myError, setMyError] = useState("");
  const [post, setPost] = useState({
    category,
    content,
    description,
    image,
    title,
  });
  const image_arr = image.split("/");
  const image_name = image_arr[image_arr.length - 1];
  const { token } = UseAuthContext();
  const nagivate = useNavigate();
  const url = `http://127.0.0.1:8000/api/articles/${id}/`;

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "image") {
      setPost((prev) => {
        return {
          ...prev,
          [name]: e.target.files[0],
        };
      });
    } else {
      setPost((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const current_image = post["image"];
    if (typeof current_image === "string") {
      delete post["image"];
    }
    try {
      const response = await axios.patch(url, post, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
        withCredential: true,
      });
      console.log(response.data);
      nagivate("/");
    } catch (error) {
      setMyError("There was a problem updating this post");
      console.log(error);
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
          <input
            className="form-control"
            type="text"
            name="title"
            id="title"
            value={post.title}
            onChange={handleChange}
          />
        </section>

        <section>
          <label htmlFor="description" className="form-label mt-2 ">
            Description
          </label>
          <input
            className="form-control"
            value={post.description}
            type="text"
            name="description"
            id="description"
            onChange={handleChange}
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
            value={post.category}
            onChange={handleChange}
          />
        </section>

        <section>
          <label htmlFor="content" className="form-label mt-2 ">
            Content
          </label>
          <textarea
            className="form-control p-4"
            placeholder="Enter your content here .."
            value={post.content}
            onChange={handleChange}
            name="content"
            id="content"
            cols="30"
            rows="10"
          ></textarea>
        </section>

        <section>
          <label htmlFor="image" className="form-label mt-2 ">
            Current Image: {image_name}
          </label>
          <input
            type="file"
            name="image"
            id="image"
            className="form-control"
            onChange={handleChange}
          />
        </section>

        <button type="submit" className="btn btn-success my-5">
          Update Post
        </button>
      </form>
    </section>
  );
}

export default NewPost;
