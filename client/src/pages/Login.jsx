import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

const Login = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleLogin() {
        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const response = await api.post("/user/login", {
                email,
                password
            })

            const { token, role, name } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("name", name);
            
            navigate('/courses');
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }
    
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
        <div className='bg-gray-700 p-8 rounded w-96'>
            <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>

            <input
                type="email"
                placeholder='Email'
                className='w-full p-2 mb-4 rounded text-black'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder='Password'
                className='w-full p-2 mb-4 rounded text-black'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button 
                onClick={handleLogin}
                disabled={loading}
                className='w-full bg-blue-500 py-2 rounded hover:bg-blue-600 disabled:opacity-50'
            >
                {loading ? "Logging in..." : "Login"}
            </button>

            <p className='mt-4 text-center text-sm text-gray-300'>
                New User?{" "}
                <Link to='/signup' className='text-blue-400 hover:underline'>
                    Sign up
                </Link>
            </p>
        </div>
    </div>
  )
}

export default Login