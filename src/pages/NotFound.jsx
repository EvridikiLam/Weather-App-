import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1>404 -_- </h1>
      <p>Oops! This page doesn't exist.</p>
      <button onClick={() => navigate("/")}>Go back Home</button>
    </div>
  );
};

export default NotFound;