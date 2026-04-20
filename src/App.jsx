import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import AddApplication from './pages/AddApplication';


function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', background: '#2563eb', color: 'white', display: 'flex', gap: '20px' }}>
        <b style={{ marginRight: 'auto' }}>🚀 JobTracker</b>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
        <Link to="/applications" style={{ color: 'white', textDecoration: 'none' }}>All Jobs</Link>
        <Link to="/applications/new" style={{ color: 'white', textDecoration: 'none' }}>+ Add New</Link>
      </nav>

      <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/applications/new" element={<AddApplication />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
