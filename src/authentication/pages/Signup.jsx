import { useState } from 'react';
import PrimaryButton from '../components/PrimaryButton.jsx';
import SecondaryButton from '../components/SecondaryButton.jsx'
import TextInput from '../components/TextInput.jsx';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'customer', // Default role
    provider: 'local', // Default provider
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8008/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          surname: formData.surname,
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: formData.role,
          provider: formData.provider,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      const data = await response.json();
      console.log('Signup successful:', data);

      // Redirect to login page or home page after successful signup
      window.location.href = '/auth/login';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Join us for a seamless dining experience.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
          <TextInput
            id="name"
            name="name"
            type="text"
            placeholder="First Name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          </div>

          <div>
          <TextInput
            id="surname"
            name="surname"
            type="text"
            placeholder="Last Name"
            required
            value={formData.surname}
            onChange={handleChange}
          />
          </div>

          <div>
          <TextInput
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
          />
          </div>

          <div>
          <TextInput
            id="phone"
            name="phone"
            type="text"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
          />
          </div>

          
          <div>
          <TextInput
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          </div>

          <div>
          <TextInput
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          </div>

          <div>
          <TextInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          </div>

          <div>
            <PrimaryButton type="submit" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </PrimaryButton>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div>
            <SecondaryButton onClick={() => (window.location.href = 'http://localhost:8008/auth/google')}>
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Sign in with Google
            </SecondaryButton>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already have an account?{' '}
          <a href="/auth/login" className="font-semibold text-purple-600 hover:text-purple-500">
            Sign in here.
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;