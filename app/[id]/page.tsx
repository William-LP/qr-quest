import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Adventure, CheckPoint } from "@/types/types";
import { PrismaClient } from '@prisma/client';
import { Mail } from "lucide-react";
import React from 'react';
import { redirect } from "next/navigation";
import QRCode from "react-qr-code";


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
            customerId: adventure.customerId as number,
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

    async function sendEmail(formData: FormData) {
        'use server'


        const email = formData.get('email')
        if (email) {
            const adventure = await prisma.adventure.findUnique({
                where: {
                    id: id
                }
            })

            const customer = await prisma.customer.update({
                where: {
                    id: adventure?.customerId as number,
                },
                data: {
                    email: email.toString()
                },
            })

            redirect("/success");
            console.log(`and now send a email to ${customer}`)

        }

    }



    const a = await fetchData(id)
    if (!a) {
        return (
            <h1>no data</h1>
        )
    } else {
        return (
            <div className="pt-5 px-20">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mb-10 underline underline-offset-3">
                    QR Quest recap&apos;
                </h1>

                {/* 
                <div className="p-6 sm:p-10">
                    <div className="max-w-2xl">
                        <h2 className="text-2xl font-bold mb-4">Company History</h2>
                        <div className="relative pl-6 grid gap-10 after:absolute after:inset-y-0 after:w-px after:bg-gray-500/20 dark:after:bg-gray-400/20">
                            {a.checkPoints.map((cp, index) => (
                                <div className="grid gap-1 text-sm relative">
                                    <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-gray-50" />
                                    <div className="font-medium">{cp.name}</div>
                                    <div className="text-gray-500 dark:text-gray-400">
                                        {cp.hint}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div> */}


                <Separator className="w-1/2 my-10 mx-auto" />


                <div className="w-full max-w-md items-center space-x-2 mx-auto">
                    <form action={sendEmail}>
                        <Input className="w-full" type="email" name="email" placeholder="Email" />
                        <Button type="submit" className="mt-2 w-full"><Mail className="mr-2 h-4 w-4" />Send me the adventure !</Button>
                    </form>
                </div>

                <Separator className="w-1/2 my-10 mx-auto" />
                <Table className="mb-10">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">#</TableHead>
                            <TableHead className="w-2/3">This hint ...</TableHead>
                            <TableHead className="w-[100px]">={">"}</TableHead>
                            <TableHead className="w-1/3">... brings the players here !</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {a.checkPoints.map((cp, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{cp.rank}</TableCell>
                                <TableCell>{cp.hint}</TableCell>
                                <TableCell>={">"}</TableCell>
                                <TableCell>{cp.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {
                    a.checkPoints.map((checkpoint) => (
                        <div key={checkpoint.id} style={{ background: 'white', padding: '16px' }}>
                            <QRCode key={checkpoint.id} id={`qr-code-${checkpoint.id}`} value={`${process.env.PUBLIC_URL}/play/${checkpoint.id}`} />
                        </div>
                    ))
                }
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
