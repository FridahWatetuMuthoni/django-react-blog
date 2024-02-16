import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import UseAuthContext from "../../hooks/UseAuthContext";

function EditProfile() {
  const { state } = useLocation();
  const { profile_image, bio, gender, phone_number } = state;
  const [profile, setProfile] = useState({
    profile_image,
    bio: bio ? bio : "",
    gender: gender ? gender : "",
    phone_number: phone_number ? phone_number : "",
  });
  const [myError, setMyError] = useState("");
  const url = `http://localhost:8000/users/profile/`;
  const { token, setUser } = UseAuthContext();
  const GENDER = ["MALE", "FEMALE", "NON BINARY", "OTHER"];
  const current_arr = profile_image.split("/");
  const current_image = current_arr[current_arr.length - 1];
  const navigate = useNavigate();

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "profile_image") {
      setProfile((prev) => {
        return {
          ...prev,
          [name]: e.target.files[0],
        };
      });
    } else {
      setProfile((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(profile).forEach(([key, value]) => {
        if (key === "profile_image") {
          if (typeof value !== "string") {
            // If profile image is a file, append it to FormData
            formData.append(key, value);
          }
        } else {
          formData.append(key, value);
        }
      });

      const response = await axios.patch(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
        withCredential: true,
      });
      localStorage.setItem("user", JSON.stringify(response?.data));
      setUser(response?.data);
      navigate("/profile/");
    } catch (error) {
      console.log(error);
      setMyError("Something went wrong when trying to update your profile");
    }
  };

  return (
    <div className="container-md row justify-content-center mb-5">
      <form
        className="col-12 col-sm-12 col-md-8 shadow-lg mt-4 px-4 py-3 p-lg-5"
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center mx-3">Update profile</h1>
        {myError && (
          <section className="alert alert-danger">
            <p className="m-0">{myError}</p>
          </section>
        )}

        <section>
          <span className=" d-block">Current Image: {current_image}</span>
          <label htmlFor="profile_image" className="form-label mt-3 ">
            Profile Image:
          </label>
          <input
            className="form-control"
            type="file"
            name="profile_image"
            id="profile_image"
            onChange={handleChange}
          />
        </section>

        <section>
          <label htmlFor="gender" className="form-label mt-3 ">
            Gender
          </label>
          <select
            className="form-control"
            name="gender"
            id="gender"
            onChange={handleChange}
          >
            {GENDER.map((gender) => {
              return (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              );
            })}
          </select>

          <section>
            <label htmlFor="phone_number" className="form-label mt-3 ">
              Phone Number
            </label>
            <input
              className="form-control"
              type="tel"
              name="phone_number"
              id="phone_number"
              onChange={handleChange}
              value={profile.phone_number}
            />
          </section>
        </section>

        <section>
          <label htmlFor="bio" className="form-label mt-3 ">
            Bio
          </label>
          <textarea
            className="form-control"
            value={profile.bio}
            onChange={handleChange}
            name="bio"
            id="bio"
            cols="30"
            rows="10"
            placeholder="Enter your bio..."
          ></textarea>
        </section>

        <button type="submit" className="btn btn-success mt-3">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
