import "../styles/profile.scss"
import { useLoaderData } from "react-router-dom";
import Breed from "../models/breed";

export default function BreedPage() {
  const { breed } = useLoaderData() as { breed: Breed };

  return (
    <div className="profile">
      <div className="user-info">

        <div>
          <h1>
            {breed.attributes.name}
          </h1>

         {breed.attributes.description}
        </div>
      </div>
    </div>
  );
}

