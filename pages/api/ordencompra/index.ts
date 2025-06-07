import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const ordenes = await prisma.ordenCompra.findMany({
                include: { laboratorio: true }
            });
            return res.status(200).json(ordenes);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    if (req.method === 'POST') {
        try {
            const { fechaEmision, Situacion, Total, CodLab, NroFacturaProv } = req.body;
            const nuevaOrden = await prisma.ordenCompra.create({
                data: { fechaEmision, Situacion, Total, CodLab, NroFacturaProv }
            });
            return res.status(201).json(nuevaOrden);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}