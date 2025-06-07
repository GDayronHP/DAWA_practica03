import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (typeof id !== 'string' || isNaN(Number(id))) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    if (req.method === 'PUT') {
        try {
            const { fechaEmision, situacion, total, codLab, nrofacturaProv } = req.body;
            const updatedOrden = await prisma.ordenCompra.update({
                where: { nroCompra: Number(id) },
                data: {
                    fechaEmision,
                    Situacion: situacion,
                    Total: total,
                    CodLab: codLab,
                    NroFacturaProv: nrofacturaProv
                }
            });
            return res.status(200).json(updatedOrden);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            await prisma.ordenCompra.delete({
                where: { nroCompra: Number(id) }
            });
            return res.status(204).end();
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}