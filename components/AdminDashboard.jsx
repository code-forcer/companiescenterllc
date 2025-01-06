import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('/api/admin/companies');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Email</th>
            <th>Membership Status</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company._id}>
              <td>{company.name}</td>
              <td>{company.email}</td>
              <td>{company.membershipActive ? 'Active' : 'Inactive'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
