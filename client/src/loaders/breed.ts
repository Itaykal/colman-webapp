import Breed from "../models/breed";
import * as breedService from "../services/breedService"

export async function loader({ params: { breedId } }: { params: { breedId: string } }): Promise<{ breed: Breed; }> {
    const breed = await breedService.getBreed(breedId);
    return { breed };
  }
  