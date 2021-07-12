import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Page Not Found</h1>
      <Link to="/">Home</Link>
    </div>
  );
}
