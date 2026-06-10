import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import clientesRoutes from './routes/clientes.js';
import diagnosticosRoutes from './routes/diagnosticos.js';
import respostasRoutes from './routes/respostas.js';
import compartilhadoRoutes from './routes/compartilhado.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://diagnostico-plataforma.vercel.app',
];
if (process.env.FRONTEND_URL) allowedOrigins.push(process.env.FRONTEND_URL);

app.use(cors({
  origin: (origin, callback) => {
    // Permite requisições sem origin (curl, health checks) e origens da lista
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || /\.vercel\.app$/.test(new URL(origin).hostname)) {
      return callback(null, true);
    }
    return callback(new Error('Origem não permitida pelo CORS'));
  },
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
app.use('/api/compartilhado', compartilhadoRoutes);

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
