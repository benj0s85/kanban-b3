import rateLimit from 'express-rate-limit';

// Limiteur de requêtes
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, //  15 minutes
  max: 100, // Limite chaque IP à 100 requêtes
  message: { error: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard.' },
  standardHeaders: true, // Retourne les infos de limite dans les headers `RateLimit-*`
  legacyHeaders: false, // Désactive les headers `X-RateLimit-*`
});