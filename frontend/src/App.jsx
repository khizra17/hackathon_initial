import { useState } from 'react';
import axios from 'axios';
import './App.css';

const API = 'http://localhost:5000/api';

function App() {
  const [token, setToken] = useState('');
  const [view, setView] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [skillName, setSkillName] = useState('');
  const [skills, setSkills] = useState([]);
  const [targetRole, setTargetRole] = useState('AI Engineer');
  const [roadmap, setRoadmap] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    await axios.post(`${API}/auth/register`, { ...form, role: 'student' });
    alert('Registered! Now login.');
    setView('login');
  };

  const handleLogin = async () => {
    const res = await axios.post(`${API}/auth/login`, {
      email: form.email,
      password: form.password
    });
    setToken(res.data.token);
    setView('dashboard');
  };

  const addSkill = async () => {
    await axios.post(`${API}/skills`, { name: skillName, level: 'intermediate' }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setSkillName('');
    fetchSkills();
  };

  const fetchSkills = async () => {
    const res = await axios.get(`${API}/skills`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setSkills(res.data);
  };

  const getRoadmap = async () => {
  setLoading(true);
  const res = await axios.post(`${API}/skills/roadmap`, { target_role: targetRole }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  setRoadmap(res.data.roadmap);
  setLoading(false);
};

  const askAI = async () => {
  setLoading(true);
  const res = await axios.post('http://localhost:5001/ask', { question });
  setAnswer(res.data.answer);
  setLoading(false);
};

  if (view === 'login' || view === 'register') {
    return (
      <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto' }}>
        <h1>SkillForge</h1>
        <h2>{view === 'login' ? 'Login' : 'Register'}</h2>
        {view === 'register' && (
          <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} style={{ display: 'block', margin: '10px 0', width: '100%' }} />
        )}
        <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} style={{ display: 'block', margin: '10px 0', width: '100%' }} />
        <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} style={{ display: 'block', margin: '10px 0', width: '100%' }} />
        {view === 'login' ? (
          <>
            <button onClick={handleLogin}>Login</button>
            <p>No account? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setView('register')}>Register</span></p>
          </>
        ) : (
          <>
            <button onClick={handleRegister}>Register</button>
            <p>Have an account? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setView('login')}>Login</span></p>
          </>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>SkillForge Dashboard</h1>

      <h3>Your Skills</h3>
      <input placeholder="Add a skill" value={skillName} onChange={e => setSkillName(e.target.value)} />
      <button onClick={addSkill}>Add Skill</button>
      <button onClick={fetchSkills}>Refresh Skills</button>
      <ul>{skills.map(s => <li key={s._id}>{s.name} ({s.level})</li>)}</ul>

      <h3>Career Roadmap</h3>
      {loading && <p>Generating...</p>}
      <input value={targetRole} onChange={e => setTargetRole(e.target.value)} />
      <button onClick={getRoadmap}>Generate Roadmap</button>
      <p style={{ whiteSpace: 'pre-wrap' }}>{roadmap}</p>

      <h3>Ask AI Assistant</h3>
      {loading && <p>Answering shortly...</p>}
      <input placeholder="Ask a question" value={question} onChange={e => setQuestion(e.target.value)} style={{ width: '80%' }} />
      <button onClick={askAI}>Ask</button>
      <p style={{ whiteSpace: 'pre-wrap' }}>{answer}</p>
    </div>
  );
}

export default App;