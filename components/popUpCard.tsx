import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import { useState } from 'react';




const popUpCard = () => {
    const [isNameSet, setIsNameSet] = useState<Boolean>(true);
    const [name, setName] = useState("")
    const handleSave = () => {
        setIsNameSet(!isNameSet)
    }
    return (
        isNameSet ?
            <div className="w-[250px] m-0 grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">Give this place a name :</Label>
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="text" id="name" placeholder="A super secret spot" value={name} onChange={e => setName(e.target.value)} />
                    <Button type="submit" onClick={handleSave}>Save</Button>
                </div>
            </div>
            :
            <div>
                <p>{name}</p>
            </div>
    )
}

export default popUpCard






