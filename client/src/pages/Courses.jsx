import { useEffect, useState } from "react"
import api from "../services/api"

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await api.get('/api/v1/course/preview');
        setCourses(response.data.courses);
      } catch (error) {
        alert("Error fetching courses:" + error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, [])

  if (loading) {
    return <div className="text-white p-6">Loading courses...</div>
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
        <h1 className="text-3xl font-bold mb-4">Courses</h1>
        
        {courses.length === 0 ? (
          <p>No courses available at the moment.</p>
        ) : (
          <ul className="space-y-4">
            {courses.map((course) => (
              <li key={course._id} className="bg-gray-800 p-4 rounded">
                <h2 className="text-xl font-bold">{course.title}</h2>
                <p className="text-gray-300">{course.description}</p>
                <p className="text-green-400 font-semibold">${course.price}</p>
              </li>
            ))}
          </ul>
        )}
    </div>
  )
}

export default Courses