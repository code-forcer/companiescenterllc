import { useRouter } from 'next/router';

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    // Remove the token from localStorage or cookies
    localStorage.removeItem('token');
    router.push('/admin/login'); // Redirect to login page after logout
  };

  return <><hr /><button onClick={handleLogout} style={{ color: '#ce1212', padding: '5px', border: '2px solid #102343',marginTop:'4px',borderRadius:'5px'}}>Logout</button></>
}
