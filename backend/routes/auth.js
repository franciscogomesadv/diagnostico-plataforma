import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Mock: login Google OAuth
router.post('/login', (req, res) => {
  const { email, name, googleId } = req.body;

  if (!email || !googleId) {
    return res.status(400).json({ error: 'Email e googleId são obrigatórios' });
  }

  // Validação simples: só emails autorizados (em produção, integrar com BD)
  const allowedEmails = ['frangomes@claraassociados.com'];
  if (!allowedEmails.includes(email)) {
    return res.status(403).json({ error: 'Acesso negado. Email não autorizado.' });
  }

  // Gerar JWT token
  const token = jwt.sign(
    { email, name, googleId },
    process.env.JWT_SECRET || 'secret-key-dev',
    { expiresIn: '7d' }
  );

  res.json({
    success: true,
    token,
    user: { email, name, googleId }
  });
});

// Verificar token
router.post('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret-key-dev');
    res.json({ valid: true, user: decoded });
  } catch (err) {
    res.status(401).json({ error: 'Token inválido ou expirado' });
  }
});

export default router;
