import { useLoaderData } from "react-router-dom";
import Breed from "../models/breed";
import { useCallback, useEffect, useState } from "react";
import * as breedService from "../services/breedService"
import { Spin } from "antd";

export default function BreedPage() {
  const { breedId } = useLoaderData() as { breedId: string };
  const [breed, setBreed] = useState<Breed>()

  const fetchBreed = useCallback(async () => {
    const newBreed = await breedService.getBreed(breedId)
    setBreed(newBreed)
  }, [breedId])

  useEffect(() => { fetchBreed() }, [fetchBreed])

  return (<>{
    !breed ? <Spin /> :
      <div>
        <h1>
          {breed.attributes.name}
        </h1>

        {breed.attributes.description}
      </div>
  }</>);
}

