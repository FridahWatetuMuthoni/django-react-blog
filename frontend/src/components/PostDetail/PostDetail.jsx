import { useLocation, Link } from "react-router-dom";

function PostDetail() {
  const { state } = useLocation();
  const {
    id,
    author,
    category,
    content,
    created,
    description,
    image,
    title,
    updated,
  } = state;
  return (
    <div className="container border border-danger article-detail p-0">
      <img src={image} alt="" className="img" />
      <section className="content p-3 ">
        <h3 className="my-3">{title}</h3>
        <h5 className="text-muted">Author:{author}</h5>
        <h5 className="text-muted">Category:{category}</h5>
        <span className="fw-bold text-muted">
          Created: {new Date(created).toDateString()}
        </span>
        <span className="mx-3 d-inline-block fw-bold text-muted ">
          updated: {new Date(updated).toDateString()}
        </span>
        <h6 className="mt-2">{description}</h6>
        <p>{content}</p>
      </section>
      <section className="d-flex gap-4 mb-5 px-3">
        <Link
          to={`/edit-posts/${id}`}
          state={{ id: id }}
          className="btn btn-primary"
        >
          Updated Post
        </Link>
        <Link
          to={`/delete-posts/${id}`}
          state={{ id: id }}
          className="btn btn-danger"
        >
          Delete Post
        </Link>
      </section>
    </div>
  );
}

export default PostDetail;
