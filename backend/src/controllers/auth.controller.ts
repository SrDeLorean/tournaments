import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/db';

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, gamertag, password } = req.body;

    if (!email || !gamertag || !password) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { gamertag }] }
    });

    if (existingUser) {
      return res.status(409).json({ message: "Email o Gamertag ya en uso" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { email, gamertag, passwordHash: hashedPassword }
    });

    res.status(201).json({ message: "Usuario creado", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  // Generamos el token con la info necesaria para el Backend
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role }, 
    process.env.JWT_SECRET || 'secret_tourney_2026',
    { expiresIn: '8h' }
  );

  res.json({ 
    token, 
    user: { id: user.id, gamertag: user.gamertag, role: user.role } 
  });
};