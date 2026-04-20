import { createContext, useState, useEffect } from 'react';

export const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('job_apps');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('job_apps', JSON.stringify(applications));
  }, [applications]);

  const addApplication = (job) => {
    setApplications([...applications, { ...job, id: Date.now().toString(), bookmarked: false }]);
  };

  const deleteApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  const toggleBookmark = (id) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, bookmarked: !app.bookmarked } : app
    ));
  };

  return (
    <ApplicationContext.Provider value={{ applications, addApplication, deleteApplication, toggleBookmark }}>
      {children}
    </ApplicationContext.Provider>
  );
};