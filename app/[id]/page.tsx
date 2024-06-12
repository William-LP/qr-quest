import { Adventure, CheckPoint } from "@/types/types"
import { PrismaClient } from '@prisma/client';
import React from 'react'

const prisma = new PrismaClient();

async function fetchData(id: string) {
    const adventure = await prisma.adventure.findUnique({
        where: { id: id }
    })

    if (adventure) {
        const checkpoints = await prisma.checkpoint.findMany({
            where: { adventureId: adventure.id }
        })

        const formattedCheckpoints: CheckPoint[] = checkpoints.map(cp => ({
            id: cp.id,
            hint: cp.hint,
            rank: cp.rank,
            name: cp.name,
            lat: cp.latitude,
            long: cp.longitude

        }));

        const res: Adventure = {
            id: adventure.id,
            createdAt: adventure.createdAt,
            checkPoints: formattedCheckpoints
        }
        return res
    }


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
            <div>
                <h1>QR Adventure details</h1>
                <ul>
                    {a.checkPoints.map((cp, index) => <li key={index}>{cp.rank}</li>)}
                </ul>
            </div>
        );
    }

}


export default page






// interface Props {
//     params: { id: number };
// }

// // const getAdventure

// const page = async ({ params: { id } }: Props) => {
//     // const res = await fetch(`http://localhost:3000/api/adventure/${id}`);
//     // const adventure: Adventure = await res.json();
//     return (
//         <div>
//             {adventure.id}
//         </div>
//     )
// }
