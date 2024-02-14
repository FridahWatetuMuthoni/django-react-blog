import { useEffect } from "react";
import UseGlobalContext from "./hooks/UseGlobalContext";
import axios from "axios";
import UseAuthContext from "./hooks/UseAuthContext";
import { Link } from "react-router-dom";

function Home() {
  const { token } = UseAuthContext();
  const { setArticles, articles } = UseGlobalContext();

  useEffect(() => {
    let isMounted = true;

    let fetchArticles = async () => {
      const url = "http://127.0.0.1:8000/api/articles/";
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        console.log(response?.data);
        const data = response?.data;
        if (data) {
          setArticles(data);
        }
      } catch (errors) {
        console.log(errors);
      }
    };

    if (isMounted && token) {
      fetchArticles();
    }

    return () => (isMounted = false);
  }, [token, setArticles]);

  if (!articles) {
    return (
      <section className="mt-5 shadow-lg w-75 mx-auto rounded-5 p-5">
        <h2 className="text-center p-5">No articles are currently availble</h2>
      </section>
    );
  }
  return (
    <div className="container row mx-auto mt-2">
      {articles.map((article) => {
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
  );
}

export default Home;
