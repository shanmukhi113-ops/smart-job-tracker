import { useContext, useState } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';
import { useDebounce } from '../hooks/useDebounce';
import JobCard from '../components/JobCard';
import { AnimatePresence } from 'framer-motion';

const Applications = () => {
  const { applications, deleteApplication, toggleBookmark } = useContext(ApplicationContext);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const debouncedSearch = useDebounce(search, 500);

  const tabs = ["All", "Applied", "Interviewing", "Offer", "Rejected"];

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.company.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesTab = activeTab === "All" || app.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <input 
          placeholder="Search jobs..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '1rem' }}
        />
        
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{ 
                padding: '8px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer',
                background: activeTab === tab ? '#2563eb' : '#e5e7eb',
                color: activeTab === tab ? 'white' : 'black'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        <AnimatePresence>
          {filteredApps.map(app => (
            <JobCard 
              key={app.id} 
              app={app} 
              onDelete={deleteApplication} 
              onToggleBookmark={toggleBookmark} 
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Applications;