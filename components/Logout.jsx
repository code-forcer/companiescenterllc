import { useRouter } from 'next/router';

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    // Remove the token from localStorage or cookies
    localStorage.removeItem('token');
    router.push('/admin/login'); // Redirect to login page after logout
  };

  return <><hr /><button onClick={handleLogout} style={{ backgroundColor: '#ce1212',width:'100%', padding: '5px',marginTop:'4px',borderRadius:'5px',color:'#fff'}}>Logout</button></>
}
