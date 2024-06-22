import prisma from '@/prisma/client';
import { Adventure } from '@/types/types';
import { NextRequest, NextResponse } from 'next/server';


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

        const customerId = await prisma.customer.create({
            data: {
                email: "user@unknown.com"
            }
        });


        const adventure = await prisma.adventure.create({
            data: {
                customerId: customerId.id
            }
        });


        const checkpointsData = body.checkPoints.map(cp => ({
            hint: cp.hint,
            name: cp.name,
            rank: cp.rank,
            latitude: cp.latitude,
            longitude: cp.longitude,
            adventureId: adventure.id,
        }));

        await prisma.checkpoint.createMany({
            data: checkpointsData
        });



        const checkpoints = await prisma.checkpoint.findMany({
            where: { adventureId: adventure.id }
        })



        return NextResponse.json({ adventure, checkpoints }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { error: { name: error.name, message: error.message } },
            { status: 500 }
        );
    }
}