import Breed from "../models/breed";
import { useCallback, useEffect, useState } from "react";
import * as breedService from "../services/breedService"
import { Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";

export default function BreedPage() {
  const { breedId } = useParams();
  const [breed, setBreed] = useState<Breed>()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!breedId) navigate("/")
  })


  const fetchBreed = useCallback(async () => {
    
    const newBreed = await breedService.getBreed(breedId!)
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

