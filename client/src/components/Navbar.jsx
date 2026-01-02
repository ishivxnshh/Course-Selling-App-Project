import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between">
        <h1 className="text-xl font-bold">Course Selling App</h1>

        <div className="flex gap-4">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/courses" className="hover:text-gray-300">Courses</Link>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/signup" className="hover:text-gray-300">Signup</Link>
        </div>
    </nav>
  )
}

export default Navbar