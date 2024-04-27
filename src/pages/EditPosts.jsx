import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appWriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
function EditPosts() {
  const [post, setPosts] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      appWriteService.getPost(slug).then((post) => {
        setPosts(post);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPosts;
