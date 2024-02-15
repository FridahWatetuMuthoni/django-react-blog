import UseAuthContext from "../../hooks/UseAuthContext";
import { Link } from "react-router-dom";

function ProfilePage() {
  const { user, username } = UseAuthContext();
  const { id, profile_image, bio, gender, phone_number } = user;
  console.log(id);
  return (
    <div className="row justify-content-center mt-5 ">
      <div className="col-lg-4 shadow-lg p-4 content-center ">
        <section className="profile-image shadow-sm">
          <img className="img" src={profile_image} />
        </section>
        <h2 className="fw-normal">Username:{username}</h2>
        <h6>Gender:{gender}</h6>
        <h6>Phone Number:{phone_number}</h6>
        <p>{bio ? bio : "no bio click update to add it"}</p>
        <p>
          <Link className="btn btn-secondary" to="/edit-profile/">
            update profile
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ProfilePage;
