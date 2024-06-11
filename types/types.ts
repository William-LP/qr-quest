export type Adventure = {
    createdAt: Date
    id: string
    checkPoints: CheckPoint[]
}

export type CheckPoint = {
    hint: string
    name: string
    id: string
    lat: number
    long: number
}
