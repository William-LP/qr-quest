export type CheckPoint = {
    coordinates: Coordinates
    hint: string
    name: string
    id: number
}

type Coordinates = {
    lat: number;
    long: number;
}
