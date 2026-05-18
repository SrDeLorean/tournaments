import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_tourney_2026';

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) return res.status(403).json({ message: "No se proporcionó un token de acceso." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Inyecta { id, email, role, communityId? }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado." });
  }
};

export const checkRole = (roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Acceso denegado. Se requiere rol: ${roles.join('/')}` });
    }
    next();
  };
};