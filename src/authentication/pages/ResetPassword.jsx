import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PrimaryButton from '../components/PrimaryButton.jsx';
import TextInput from '../components/TextInput.jsx';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Get the reset token from the URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8008/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Read the response as text
        throw new Error(errorText || 'Failed to reset password');
      }

      const data = await response.json();
      setSuccess(data.message);
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
          Reset Password
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Enter your new password below.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <TextInput
            id="password"
            name="password"
            type="password"
            placeholder="New Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm New Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;