export type Adventure = {
    createdAt: Date
    id: string
    checkPoints: CheckPoint[]
    customerId: number
}

export type CheckPoint = {
    hint: string
    name: string
    rank: number
    id: string
    latitude: number
    longitude: number
}
