import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useSignup() {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (formData) => {
    try {
      setLoading(true);

      const response = await fetch(`${BASE_URL}/api/user/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseJSON = await response.json();
      if (responseJSON.user) {
        setError(null);
        setLoading(false);
        // After successfull signup, navigate to login
        navigate('/login');
        return;
        // if the response is an array, set the error to this array
      } else if (responseJSON.length) {
        setError(responseJSON);
        setLoading(false);
        return;
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
}
