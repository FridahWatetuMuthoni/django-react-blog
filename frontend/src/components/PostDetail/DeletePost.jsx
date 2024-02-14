import { useLocation } from "react-router-dom";

function DeletePost() {
  const { state } = useLocation();
  const { id } = state;

  console.log(id);
  return (
    <div>
      <h1>delete post</h1>
    </div>
  );
}

export default DeletePost;
