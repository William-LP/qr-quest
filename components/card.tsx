import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"
import { MapPinOff, Save, Pencil } from "lucide-react"
import { Input } from "@/components/ui/input"

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


const CardComponent = ({ checkpoints, setCheckpoints, id }: { checkpoints: CheckPoint[], setCheckpoints: React.Dispatch<React.SetStateAction<CheckPoint[]>>, id: number }) => {
    const [name, setName] = useState(checkpoints[id].name)
    const [hint, setHint] = useState(checkpoints[id].hint)

    const handleEditCheckpoint = (id: number, checkpoints: CheckPoint[], setCheckpoints: React.Dispatch<React.SetStateAction<CheckPoint[]>>) => {
        setCheckpoints(
            checkpoints.map((checkpoint, index) =>
                index === id
                    ? {
                        ...checkpoint,
                        coordinates: {
                            lat: checkpoints[id].coordinates.lat,
                            long: checkpoints[id].coordinates.long
                        },
                        name: name,
                        hint: hint
                    }
                    : checkpoint
            )
        );
    }

    const handleDeleteCheckpoint = (id: number, checkpoints: CheckPoint[], setCheckpoints: React.Dispatch<React.SetStateAction<CheckPoint[]>>) => {
        console.log("old")
        console.log(checkpoints)

        const newCheckpoints = checkpoints
        if (id > -1) {
            newCheckpoints.splice(id, 1)
        }
        console.log("new")
        console.log(newCheckpoints)
        setCheckpoints(
            newCheckpoints
        );
    }
    return (
        <div className="mb-5 rounded-lg p-2 bg-white border-black border-solid content-center">
            <div className="flex flex-row items-center" style={{ justifyContent: "space-between" }}>
                <div className="flex items-center">
                    <span className="font-bold rounded-full border-black border-2 flex items-center justify-center font-mono content-center p-2" style={{ height: "25px", width: "25px" }}>{id + 1}</span>
                    <span className="font-mono ml-2 content-center">{checkpoints[id].name}</span>
                </div>


                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="content-center justify-end" variant="default">
                            <Pencil className="ml-auto" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent style={{ zIndex: 999 }}>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Edit the checkpoint</AlertDialogTitle>
                            <AlertDialogDescription>
                                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                                    <Label htmlFor="name">Give this place a name :</Label>
                                    <Input type="text" id="name" placeholder="Give this place a name" value={name} onChange={e => setName(e.target.value)} />
                                </div>
                                <div className="grid w-full gap-1.5">
                                    <Label htmlFor="hint">Write the hint that will bring the players here :</Label>
                                    <Textarea placeholder="Write the hint that will bring the players here" value={hint} id="hint" onChange={e => setHint(e.target.value)} />
                                </div>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            {/* <AlertDialogAction onClick={() => handleDeleteCheckpoint(id, checkpoints, setCheckpoints)}>Delete</AlertDialogAction> */}
                            {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
                            <AlertDialogAction onClick={() => handleEditCheckpoint(id, checkpoints, setCheckpoints)}>Save</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>


            </div>
        </div>

    )
}

export default CardComponent
