import { useState } from 'react';
import { login, setAuthToken } from '../api';

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login(formData);
      
      if (response.success) {
        setAuthToken(response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        onLogin(response.data.user);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-4 sm:p-6">
      {/* Centered container with max-width and responsive padding */}
      <div className="relative bg-white/10 backdrop-blur-lg p-6 sm:p-8 rounded-2xl w-full max-w-lg shadow-2xl border border-white/20 transform transition-all duration-300 hover:scale-[1.02]">
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl" />

        <div className="relative z-10">
          {/* Header with logo and title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
              <i className="fas fa-tasks mr-2 text-indigo-400" />
              TaskTrack
            </h1>
            <p className="text-gray-300 text-lg font-medium mt-2">Welcome back! Sign in to continue</p>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 mx-auto mt-4 rounded-full" />
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6 flex items-center animate-shake">
              <i className="fas fa-exclamation-circle mr-2" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label className="block text-gray-300 text-sm font-semibold mb-2 group-focus-within:text-indigo-400 transition-colors">
                <i className="fas fa-envelope mr-2" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-4 pl-12 rounded-lg bg-gray-800/50 text-white border border-gray-600/50 focus:border-indigo-400 focus:bg-gray-800/70 focus:ring-2 focus:ring-indigo-400/30 transition-all duration-300 placeholder-gray-500"
                  placeholder="Enter your email"
                />
                <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
              </div>
            </div>

            <div className="group">
              <label className="block text-gray-300 text-sm font-semibold mb-2 group-focus-within:text-indigo-400 transition-colors">
                <i className="fas fa-lock mr-2" />
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-4 pl-12 rounded-lg bg-gray-800/50 text-white border border-gray-600/50 focus:border-indigo-400 focus:bg-gray-800/70 focus:ring-2 focus:ring-indigo-400/30 transition-all duration-300 placeholder-gray-500"
                  placeholder="Enter your password"
                />
                <i className="fas fa-key absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 rounded-lg font-semibold transition-all duration-300 hover:from-indigo-600 hover:to-purple-600 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2" />
                  Signing In...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt mr-2" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Sign-up link */}
          <div className="mt-8 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-gray-400">or</span>
              </div>
            </div>
            <p className="text-gray-300 mt-4">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToRegister}
                className="text-indigo-400 hover:text-purple-400 font-semibold transition-all duration-300 hover:underline"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;