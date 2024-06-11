import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { Adventure, CheckPoint } from '@/types/types'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {

    const adventure = await prisma.adventure.findUnique({
        where: { id: params.id }
    })

    if (adventure) {
        const checkpoints = await prisma.checkpoint.findMany({
            where: { adventureId: adventure.id }
        })

        const formattedCheckpoints: CheckPoint[] = checkpoints.map(cp => ({
            id: cp.id,
            hint: cp.hint,
            name: cp.name,
            lat: cp.latitude,
            long: cp.longitude

        }));

        const res: Adventure = {
            id: adventure.id,
            createdAt: adventure.createdAt,
            checkPoints: formattedCheckpoints
        }

        return NextResponse.json(res, { status: 200 })
    } else {
        return NextResponse.json({ error: 'Adventure not found' }, { status: 404 })
    }
}
