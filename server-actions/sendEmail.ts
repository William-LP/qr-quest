'use server'

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function sendEmail(formData: FormData, adventureId: string) {
    // 'use server'


    const email = formData.get('email')
    if (email) {
        const adventure = await prisma.adventure.findUnique({
            where: {
                id: adventureId
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


        console.log(`and now send a email to ${customer}`)

    }

}