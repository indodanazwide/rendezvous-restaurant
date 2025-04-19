import { useState } from 'react';
import PrimaryButton from '../components/PrimaryButton.jsx';
import TextInput from '../components/TextInput.jsx';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:8008/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send reset email');
      }

      setSuccess('Password reset email sent. Please check your inbox.');
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
          Forgot Password
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Enter your email to receive a password reset link.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <TextInput
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </PrimaryButton>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Remembered your password?{' '}
          <a href="/auth/login" className="font-semibold text-purple-600 hover:text-purple-500">
            Sign in here.
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;