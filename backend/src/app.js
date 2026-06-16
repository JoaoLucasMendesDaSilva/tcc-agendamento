const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Origem nao permitida pelo CORS'));
    },
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      erro: 'Muitas requisicoes. Tente novamente em alguns minutos.',
    },
  })
);

app.use(express.json({ limit: '100kb' }));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    mensagem: 'API do sistema de agendamento em funcionamento',
    ambiente: process.env.NODE_ENV || 'development',
  });
});

app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota nao encontrada.',
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;

  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  res.status(statusCode).json({
    erro:
      statusCode === 500
        ? 'Erro interno do servidor.'
        : err.message || 'Nao foi possivel processar a requisicao.',
  });
});

module.exports = app;
