import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import { PORTS } from '../client/constants';

const app = express();
app.use(cors()); // Enable CORS for frontend access

app.get('/start-tunnel', (req, res) => {
  const child = exec(
    `ssh -N -L ${PORTS.H100}:localhost:8000 cpl-cambridge-01@10.203.47.36`,
    (error) => {
      if (error) return res.status(500).json({ error: error.message });
    }
  );
  
  res.json({ pid: child.pid, port: PORTS.H100 });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});