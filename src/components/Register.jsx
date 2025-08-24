import { useState } from 'react';
import { register, setAuthToken } from '../api';

const Register = ({ onRegister, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await register(registerData);
      
      if (response.success) {
        // Store token and user data
        setAuthToken(response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Call parent callback
        onRegister(response.data.user);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--brand-primary)] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--brand-secondary)] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-[var(--brand-accent)] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="bg-[var(--bg-card)] p-8 rounded-2xl w-full max-w-md shadow-[var(--shadow-xl)] border border-[rgba(255,255,255,0.1)] backdrop-blur-md relative z-10 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-[var(--brand-gradient)] rounded-2xl opacity-20 blur-sm"></div>
        <div className="relative bg-[var(--bg-card)] rounded-2xl p-8 -m-8">
          
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <h1 className="text-3xl font-bold bg-[var(--brand-gradient)] bg-clip-text text-transparent mb-2 animate-pulse">
                <i className="fas fa-tasks mr-2 text-[var(--brand-primary)]"></i>TaskTrack
              </h1>
              <div className="absolute -inset-1 bg-[var(--brand-gradient)] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            </div>
            <p className="text-[var(--text-muted)] text-lg font-medium">Join us today! Create your account</p>
            <div className="w-16 h-1 bg-[var(--brand-gradient)] mx-auto mt-3 rounded-full"></div>
          </div>

          {error && (
            <div className="bg-[var(--status-error)] bg-opacity-10 border border-[var(--status-error)] text-[var(--status-error)] px-4 py-3 rounded-lg mb-6 animate-shake">
              <i className="fas fa-exclamation-circle mr-2 animate-pulse"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="group">
              <label className="block text-[var(--text-secondary)] text-sm font-medium mb-2 group-focus-within:text-[var(--brand-primary)] transition-colors">
                <i className="fas fa-user mr-2"></i>Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  minLength={3}
                  maxLength={30}
                  className="w-full p-4 pl-12 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:border-[var(--brand-primary)] focus:bg-[var(--bg-tertiary)] focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-opacity-20 transition-all duration-[var(--transition-normal)] hover:border-[rgba(255,255,255,0.2)]"
                  placeholder="Enter your username"
                />
                <i className="fas fa-user-circle absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--brand-primary)] transition-colors"></i>
              </div>
            </div>

            <div className="group">
              <label className="block text-[var(--text-secondary)] text-sm font-medium mb-2 group-focus-within:text-[var(--brand-primary)] transition-colors">
                <i className="fas fa-envelope mr-2"></i>Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-4 pl-12 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:border-[var(--brand-primary)] focus:bg-[var(--bg-tertiary)] focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-opacity-20 transition-all duration-[var(--transition-normal)] hover:border-[rgba(255,255,255,0.2)]"
                  placeholder="Enter your email"
                />
                <i className="fas fa-at absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--brand-primary)] transition-colors"></i>
              </div>
            </div>

            <div className="group">
              <label className="block text-[var(--text-secondary)] text-sm font-medium mb-2 group-focus-within:text-[var(--brand-primary)] transition-colors">
                <i className="fas fa-lock mr-2"></i>Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full p-4 pl-12 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:border-[var(--brand-primary)] focus:bg-[var(--bg-tertiary)] focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-opacity-20 transition-all duration-[var(--transition-normal)] hover:border-[rgba(255,255,255,0.2)]"
                  placeholder="Enter your password"
                />
                <i className="fas fa-key absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--brand-primary)] transition-colors"></i>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-1">Minimum 6 characters</p>
            </div>

            <div className="group">
              <label className="block text-[var(--text-secondary)] text-sm font-medium mb-2 group-focus-within:text-[var(--brand-primary)] transition-colors">
                <i className="fas fa-shield-alt mr-2"></i>Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full p-4 pl-12 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:border-[var(--brand-primary)] focus:bg-[var(--bg-tertiary)] focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-opacity-20 transition-all duration-[var(--transition-normal)] hover:border-[rgba(255,255,255,0.2)]"
                  placeholder="Confirm your password"
                />
                <i className="fas fa-check-circle absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--brand-primary)] transition-colors"></i>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--brand-gradient)] text-[var(--text-primary)] py-4 rounded-lg font-semibold transition-all duration-[var(--transition-normal)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group mt-6"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Creating Account...
                </>
              ) : (
                <>
                  <i className="fas fa-user-plus mr-2"></i>
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[rgba(255,255,255,0.1)]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[var(--bg-card)] text-[var(--text-muted)]">or</span>
              </div>
            </div>
            <p className="text-[var(--text-muted)] mt-4">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-[var(--brand-primary)] hover:text-[var(--brand-secondary)] font-medium transition-all duration-300 hover:underline hover:scale-105 inline-block"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;