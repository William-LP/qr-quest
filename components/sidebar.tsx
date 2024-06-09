import React from 'react'
import Card from "@/components/card"

import { ScrollArea } from "@/components/ui/scroll-area"
// import { Separator } from "@/components/ui/separator"

const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
)


type CheckPoint = {
    coordinates: Coordinates
    hint: string
    name: string
    id: number
}

type Coordinates = {
    lat: number;
    long: number;

}

const sidebar = ({ checkpoints, setCheckpoints }: { checkpoints: CheckPoint[], setCheckpoints: React.Dispatch<React.SetStateAction<CheckPoint[]>> }) => {
    return (
        <ScrollArea className="h-[80%] w-[350px] rounded-md border bg-gray-100" style={{ position: "absolute", top: 10, right: 10, zIndex: 999 }}>
            <div className="p-4">
                <h4 className="mb-4 font-mono">Checkpoints :</h4>
                {checkpoints.map((_, index) => (
                    <Card key={index} checkpoints={checkpoints} setCheckpoints={setCheckpoints} id={index} />
                ))}

            </div>
        </ScrollArea>
    )

    {/* <Separator className="my-2" /> */ }
}

export default sidebar
