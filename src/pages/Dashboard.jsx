import { useContext } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Dashboard = () => {
  const { applications } = useContext(ApplicationContext);

  const stats = [
    { name: 'Applied', value: applications.filter(a => a.status === 'Applied').length, color: '#2563eb' },
    { name: 'Interviewing', value: applications.filter(a => a.status === 'Interviewing').length, color: '#f59e0b' },
    { name: 'Offer', value: applications.filter(a => a.status === 'Offer').length, color: '#10b981' },
    { name: 'Rejected', value: applications.filter(a => a.status === 'Rejected').length, color: '#ef4444' },
  ].filter(s => s.value > 0);

  return (
    <div>
      <h1>Job Search Overview</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: '#e0f2fe', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <h3>Total</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{applications.length}</p>
        </div>
        {/* You can add more summary cards here */}
      </div>

      <div style={{ height: '300px', background: 'white', padding: '20px', borderRadius: '8px' }}>
        <h3>Application Stages</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={stats} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {stats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;