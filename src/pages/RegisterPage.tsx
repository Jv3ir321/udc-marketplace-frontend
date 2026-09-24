import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginPage } from './LoginPage';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Smooth redirect to login since registration is automatic with OAuth2
    navigate('/login', { replace: true });
  }, [navigate]);

  return <LoginPage />;
};
