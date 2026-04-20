import { motion } from 'framer-motion';
import { FiTrash2, FiStar, FiEdit } from 'react-icons/fi';

const JobCard = ({ app, onDelete, onToggleBookmark }) => {
  // Clearbit URL logic: logo.clearbit.com/google.com
  const logoUrl = `https://logo.clearbit.com/${app.company.toLowerCase().replace(/\s+/g, '')}.com`;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{ 
        background: 'white', padding: '1.5rem', borderRadius: '12px', 
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', display: 'flex', 
        alignItems: 'center', gap: '20px', borderLeft: `6px solid ${getStatusColor(app.status)}`
      }}
    >
      <img 
        src={logoUrl} 
        onError={(e) => e.target.src = 'https://via.placeholder.com/50?text=JB'} 
        style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'contain' }}
        alt="logo"
      />
      
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{app.company}</h3>
        <p style={{ margin: '2px 0', color: '#4b5563' }}>{app.role}</p>
        <span style={{ fontSize: '0.8rem', padding: '2px 8px', borderRadius: '12px', background: '#f3f4f6' }}>
          {app.status}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button onClick={() => onToggleBookmark(app.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: app.bookmarked ? '#f59e0b' : '#d1d5db' }}>
          <FiStar size={20} fill={app.bookmarked ? "#f59e0b" : "none"} />
        </button>
        <button onClick={() => onDelete(app.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}>
          <FiTrash2 size={20} />
        </button>
      </div>
    </motion.div>
  );
};

const getStatusColor = (status) => {
  const colors = { Applied: '#3b82f6', Interviewing: '#f59e0b', Offer: '#10b981', Rejected: '#ef4444' };
  return colors[status] || '#6b7280';
};

export default JobCard;