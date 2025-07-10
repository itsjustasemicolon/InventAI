import React, { useState } from 'react';
import Home from '../Home';
// Mock user database - in real app this would be server-side
const MOCK_USERS = {
  admin: { username: 'admin', password: 'admin123', role: 'admin' },
  store1: { username: 'store1', password: 'store123', role: 'store' },
  store2: { username: 'store2', password: 'store123', role: 'store' },
  store3: { username: 'store3', password: 'store123', role: 'store' }
};

function LoginPage({ onLogin, requiredRole }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication
      const user = MOCK_USERS[form.username];
      
      if (!user || user.password !== form.password) {
        setError('Invalid username or password');
        setLoading(false);
        return;
      }

      // Check if user has required role
      if (requiredRole && user.role !== requiredRole) {
        setError(`Access denied. This page requires ${requiredRole} privileges.`);
        setLoading(false);
        return;
      }

      // Mock token generation
      const token = `mock-token-${user.username}-${Date.now()}`;
      
      // Call onLogin with user data
      if (onLogin) {
        onLogin({
          token,
          user: {
            username: user.username,
            role: user.role
          }
        });
      }
      
      setLoading(false);
    } catch (err) {
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  const getRoleDisplayName = (role) => {
    return role === 'admin' ? 'Admin' : 'Store Manager';
  };

  return (
  <div className="flex items-center ml-100 justify-center min-h-screen">
  <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
      {requiredRole ? `${getRoleDisplayName(requiredRole)} Login` : 'Login'}
    </h2>
    
    <div className="space-y-4">
      <div>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      
      {error && (
        <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
          {error}
        </div>
      )}
    </div>
  </div>
</div>
  );
}

 
export default function RoleBasedLoginSystem() {
  const [user, setUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleLogin = (authData) => {
    setUser(authData.user);
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedRole(null);
  };

  const selectRole = (role) => {
    setSelectedRole(role);
  };

  if (user) {
    return <Home></Home>;
  }

  if (selectedRole) {
    return (
      <div>
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setSelectedRole(null)}
            className="text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back to Role Selection
          </button>
        </div>
        <LoginPage onLogin={handleLogin} requiredRole={selectedRole} />
      </div>
    );
  }

  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-screen  ">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Select Login Type
        </h2>
        
        <div className="space-y-4">
          <button
            onClick={() => selectRole('admin')}
            className="w-full bg-red-600 text-white py-4 px-6 rounded-md hover:bg-red-700 font-medium text-lg"
          >
            Admin Login
          </button>
          
          <button
            onClick={() => selectRole('store')}
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-md hover:bg-blue-700 font-medium text-lg"
          >
            Store Manager Login
          </button>
    
        </div>
           <div className="mt-6 text-sm text-gray-600">
          <p className="font-semibold mb-2">Demo Credentials:</p>
          <div className="space-y-1">
            <p><span className="font-medium">Admin:</span> admin / admin123</p>
            <p><span className="font-medium">Store:</span> store1 / store123</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}