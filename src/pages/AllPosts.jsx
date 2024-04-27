import React, { useEffect, useState } from "react";
import appWriteService from "../appwrite/config";
import { PostCard, Container } from "../components/";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {}, []);

  appWriteService.getPost([]).then((posts) => {
    if (posts) {
        setPosts(posts.documents)
    }
  });
  return (
    <div>
      <Container>
        <div className="flex flex-wrap">
            {
                posts.map((post)=>(
                    <div key={post.$id}  className='p-2 w-1/4' >
                        <PostCard {...post} />
                    </div>
                ))
            }

        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
