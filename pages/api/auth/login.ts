import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'superclavesecreta123';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: { role: true }
        });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

        const token = jwt.sign(
            { id: user.id, role: user.role?.name },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Autenticado', token });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}