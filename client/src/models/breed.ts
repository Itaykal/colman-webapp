export interface Range {
    min: number,
    max: number,
}

export interface BreedAttributes {
    name: string,
    description: string,
    life: Range,
    male_weight: Range,
    female_weight: Range,
    hypoallergenic: boolean
}

export default interface Breed {
    id: string,
    type: "breed",
    attributes: BreedAttributes
}