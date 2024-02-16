import UseAuthContext from "../../hooks/UseAuthContext";
import { Link } from "react-router-dom";
import UseGlobalContext from "../../hooks/UseGlobalContext";

function ProfilePage() {
  const { user, username } = UseAuthContext();
  const { id, profile_image, bio, gender, phone_number } = user;
  const { articles } = UseGlobalContext();
  const user_articles = articles.filter((article) => {
    return article.author === username;
  });
  console.log(id);
  return (
    <section className="container mt-2">
      <div className="row content-center w-100 ">
        <div className="col-lg-12 shadow-lg p-4 content-center ">
          <section className="profile-image shadow-sm">
            <img className="img" src={profile_image} />
          </section>
          <h2 className="fw-normal">Username:{username}</h2>
          <h6>Gender:{gender}</h6>
          <h6>Phone Number:{phone_number}</h6>
          <p className="text-center">
            {bio ? bio : "no bio click update to add it"}
          </p>
          <p>
            <Link
              className="btn btn-secondary"
              to="/edit-profile/"
              state={user}
            >
              update profile
            </Link>
          </p>
        </div>
      </div>
      <div className="container row mx-auto mt-2">
        <h1 className="text-center mx-2">Created Posts</h1>
        {user_articles.map((article) => {
          return (
            <article
              key={article.id}
              className="article shadow-sm col-lg-4 col-md-6 col-sm-12 mb-3 mr-3"
            >
              <img src={article.image} alt="article image" className="img" />
              <footer className="p-2">
                <h5 className="my-2 ">Author: {article.author}</h5>
                <h6 className="fw-bold text-muted ">{article.title}</h6>
                <Link
                  className="card-link my-3"
                  to={`/posts/${article.id}`}
                  state={article}
                >
                  Visit Article
                </Link>
              </footer>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default ProfilePage;
