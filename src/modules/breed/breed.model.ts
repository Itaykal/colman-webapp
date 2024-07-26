import { Schema, Document } from "mongoose";


export const Breed = new Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  attributes: { 
    name: { type: String, required: true },
    description: { type: String, required: true },
    life: {
      min: Number,
      max: Number,
    },
    male_weight: {
      min: Number,
      max: Number,
    },
    female_weight: {
      min: Number,
      max: Number,
    },
    hypoallergenic: { type: Boolean, required: true }
  }

});

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

export interface IBreed extends Document {
  id: string,
  type: "breed",
  attributes: BreedAttributes
}