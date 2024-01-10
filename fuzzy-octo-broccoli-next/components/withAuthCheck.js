'use client';
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';

const checkAuthentication = () => {

  let token;

  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('bearerToken='));

  if (tokenCookie) {
    token = tokenCookie.split('=')[1];
    console.log(`cookie token: ${token}`);
  }

  return token ? true : false;
}

const withAuthCheck = (WrappedComponent) => {
  const AuthChecker = (props) => {
    const router = useRouter();
    const isAuthenticated = checkAuthentication();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login');
      } else {
        router.push('/app');
      }
    }, [isAuthenticated, router]);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return AuthChecker;
};

export default withAuthCheck;
