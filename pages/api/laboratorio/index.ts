import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const laboratorios = await prisma.laboratorio.findMany();
            return res.status(200).json(laboratorios);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    if (req.method === 'POST') {
        try {
            const { CodLab, razonSocial, direccion, telefono, email, contacto } = req.body;
            const newLaboratorio = await prisma.laboratorio.create({
                data: { CodLab, razonSocial, direccion, telefono, email, contacto }
            });
            return res.status(201).json(newLaboratorio);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    return res.status(405).json({ error: 'Method not allowed' });
}