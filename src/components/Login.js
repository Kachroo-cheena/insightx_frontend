import React, { useState } from 'react';
import { useLogin } from '../context/LoginContext';  // Import the custom login hook
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useLogin();  // Get the login function from context
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(username, password);  // Call login API with username & password
      setLoading(false);
      navigate("/reports");
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Login failed');
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-100">
      {/* Background Circles for Animation */}
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>

      <div className="flex shadow-lg text-5 rounded-lg bg-white max-w-4xl mx-auto">
        {/* Left Side with Logo and Message */}
        <div className="hidden md:flex flex-col justify-center bg-blue-50 p-10 rounded-l-lg w-1/2">
          <img src="/images/logo.png" alt="IdentifyX Logo" className="mb-4 size-6 rounded-lg" />
          <p className="text-gray-700 text-lg">Welcome to IdentifyX, where the future of radiology begins! We are thrilled to have you join our platform.</p>
          <div className="mt-6">
            <p className="text-sm">Don't have an account? <a href="/register" className="text-blue-600 underline">Get started!</a></p>
            <p className="text-sm mt-2">Read our <a href="#" className="text-blue-600 underline">terms</a> and <a href="#" className="text-blue-600 underline">conditions</a>.</p>
          </div>
        </div>

        {/* Right Side with Login Form */}
        <div className="flex flex-col justify-center p-10 w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">Account Login</h2>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <a href="#" className="text-blue-600">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className={`w-full bg-blue-500 text-white py-2 mt-4 rounded-lg hover:bg-blue-600 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
