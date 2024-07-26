import User from "../models/user";
import Post from "../models/post";
import PostsList from "../components/postsList/postsList";
import "../styles/profile.scss"
import { useLoaderData } from "react-router-dom";

const posts: Post[] = Array(5).fill(
  {
    authorId: "1",
    description: "this post was made by moth gang",
    imageURL: "https://24ai.tech/en/wp-content/uploads/sites/3/2023/10/01_product_1_sdelat-kvadratnym-5-scaled.jpg",
    title: "Lmao imagine being a butterfly",
    breedId: "ff7758e7-c33d-472d-ab8d-04d3a6354b39",
  },
);

export default function Profile() {
  const { user } = useLoaderData() as { user: User };

  return (
    <div className="profile">
      <div className="user-info">
        <div>
          <img
            key={user.avatar}
            src={
              user.avatar ||
              `https://robohash.org/${user.first}.png?size=200x200`
            }
          />
        </div>

        <div>
          <h1>
            {user.first || user.last ? (
              <>
                {user.first} {user.last}
              </>
            ) : (
              <i>No Name</i>
            )}{" "}
          </h1>

          {user.handle && (
            <p>
              <a
                target="_blank"
                href={`https://twitter.com/${user.handle}`}
              >
                {user.handle}
              </a>
            </p>
          )}
        </div>
      </div>

      <PostsList posts={posts} />
    </div>
  );
}

