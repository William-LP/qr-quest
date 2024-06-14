import { PrismaClient } from '@prisma/client';
import React from 'react';
import { Card, CardContent } from "@/components/ui/card"



const prisma = new PrismaClient();

async function fetchData(id: string) {

    const currentCheckpoint = await prisma.checkpoint.findUnique({
        where: { id: id }
    })

    if (currentCheckpoint) {
        const nextCheckpoint = await prisma.checkpoint.findFirst({
            where: {
                adventureId: currentCheckpoint.adventureId,
                rank: currentCheckpoint.rank + 1
            }
        })
        return currentCheckpoint
    }
    return null


}


interface Props {
    params: { id: string };
}


const page = async ({ params: { id } }: Props) => {

    const a = await fetchData(id)
    if (!a) {
        return (
            <h1>no data</h1>
        )
    } else {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 p-4">
                <Card className="w-full h-4/5 max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                    <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-6">
                        <div className="bg-primary rounded-full w-20 h-20 flex items-center justify-center text-white text-4xl font-bold">
                            {a.rank}
                        </div>
                        {/* <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Where to go next</h2> */}
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            {a.hint}
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

}


export default page




