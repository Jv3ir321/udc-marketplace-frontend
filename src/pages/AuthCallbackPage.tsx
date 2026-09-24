import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const AuthCallbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();

  useEffect(() => {
    const handleAuth = async () => {
      const code = searchParams.get('code');
      const hash = window.location.hash;
      let accessToken = searchParams.get('access_token');
      let idToken = searchParams.get('id_token');

      // Parse hash if response_type was token/id_token
      if (hash && hash.startsWith('#')) {
        const hashParams = new URLSearchParams(hash.substring(1));
        accessToken = accessToken || hashParams.get('access_token');
        idToken = idToken || hashParams.get('id_token');
      }

      // If opened inside a popup, send token to parent window and close
      if (window.opener) {
        window.opener.postMessage(
          {
            type: 'GOOGLE_OAUTH_RESPONSE',
            code,
            accessToken,
            idToken,
          },
          window.location.origin
        );
        window.close();
        return;
      }

      if (code || accessToken || idToken) {
        const ok = await loginWithGoogle({
          code: code || undefined,
          accessToken: accessToken || undefined,
          idToken: idToken || undefined,
        });
        if (ok) {
          navigate('/', { replace: true });
        } else {
          navigate('/login', { replace: true });
        }
      } else {
        navigate('/login', { replace: true });
      }
    };

    handleAuth();
  }, [searchParams, loginWithGoogle, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center font-aeonik text-xs font-bold text-slate-500 bg-[#f1f3f6] dark:bg-[#0b0e1e]">
      Verificando identidad institucional con Google UDC...
    </div>
  );
};
