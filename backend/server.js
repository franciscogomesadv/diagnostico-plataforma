import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import clientesRoutes from './routes/clientes.js';
import diagnosticosRoutes from './routes/diagnosticos.js';
import respostasRoutes from './routes/respostas.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Backend rodando ✓', timestamp: new Date() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/diagnosticos', diagnosticosRoutes);
app.use('/api/respostas', respostasRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro no servidor', message: err.message });
});

app.listen(PORT, () => {
  console.log(`✓ Backend rodando em http://localhost:${PORT}`);
  console.log(`✓ Ambiente: ${process.env.NODE_ENV}`);
});
