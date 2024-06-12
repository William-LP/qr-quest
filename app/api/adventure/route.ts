import { NextRequest, NextResponse } from 'next/server';
// import schema from './schema';
import prisma from '@/prisma/client';
import { Adventure } from '@/types/types'


export async function GET() {

    const adventures = await prisma.adventure.findMany()
    return NextResponse.json(adventures);
}

export async function POST(request: NextRequest) {
    let body: Adventure;
    try {
        body = await request.json();
    } catch (error: any) {
        return NextResponse.json(
            { error: { name: error.name, message: error.message } },
            { status: 400 }
        );
    }

    try {
        const adventure = await prisma.adventure.create({
            data: {
                // createdAt: body.createdAt,
            }
        });


        const checkpointsData = body.checkPoints.map(cp => ({
            hint: cp.hint,
            name: cp.name,
            rank: cp.rank,
            latitude: cp.lat,
            longitude: cp.long,
            adventureId: adventure.id,
        }));

        const createdCheckpoints = await prisma.checkpoint.createMany({
            data: checkpointsData
        });



        return NextResponse.json({ adventure, createdCheckpoints }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { error: { name: error.name, message: error.message } },
            { status: 500 }
        );
    }
}