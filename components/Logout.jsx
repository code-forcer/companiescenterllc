import { useRouter } from 'next/router';

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    // Remove the token from localStorage or cookies
    localStorage.removeItem('token');
    router.push('/admin/login'); // Redirect to login page after logout
  };

  return <button onClick={handleLogout} style={{color:'#ce1212'}}>Logout</button>;
}
