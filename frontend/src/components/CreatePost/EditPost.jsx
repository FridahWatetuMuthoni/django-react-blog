import { useLocation } from "react-router-dom";

function EditPost() {
  const { state } = useLocation();
  const { id } = state;
  console.log(id);
  return (
    <div>
      <h1>Edit Post</h1>
    </div>
  );
}

export default EditPost;
