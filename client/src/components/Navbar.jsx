import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/", { replace: true });
  }

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between">
      <h1 className="text-xl font-bold">Course Selling App</h1>

      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:text-gray-300">Home</Link>

        {token ? (
          <>
            <Link to="/courses" className="hover:text-gray-300">
              Courses
            </Link>

            <span className="text-gray-300">
              Hi, <span className="font-semibold">{name}</span>
            </span>

            <button
              onClick={handleLogout}
              className="hover:text-gray-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/signup" className="hover:text-gray-300">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;