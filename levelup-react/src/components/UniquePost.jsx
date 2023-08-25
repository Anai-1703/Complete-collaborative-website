import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUniquePost } from "../services/getUniquePost";
import { UserInteraction } from "./UserInteraction";
import { Link } from "react-router-dom";
import Loading from "./Loading";

// components
import UserDetail from "./UserDetail";
import PostText from "./PostText";
import PostImage from "./PostImage";
import PostDate from "./PostDate";
import Tags from "./Tags";
import Separador from "./Separador";
import Comments from "./Comments";
import EditAndDeleteBtn from "./EditAndDeleteBtn";
import CommentForm from "../forms/CommentForm";


function UniquePost() {
  const [post, setPost] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getUniquePost(id);
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }
    fetchPost();
  }, [id]);

  if (!post.data) {
    return <Loading />;
  }

  
  function updatePostVotes(postId, upvotes, downvotes) {
    if (post.id === postId) {
    setPost({ ...post, data: { ...post.data, upvotes, downvotes } });
    }
  }

  const addComment = (newComment) => {
    setPost(prevPost => ({
      ...prevPost,
      data: {
        ...prevPost.data,
        comments: [...prevPost.data.comments, newComment]
      }
    }));
  };

  const categories = post.data.categories.split(",");
  const platforms = post.data.platforms.split(",");

  const categoriesLinks = categories.map(category => (
    <span key={category}>
      <Link to={`/searchcat/${category}`}>{category}</Link>{' '}
    </span>
  ));
  
  const platformsLinks = platforms.map(platform => (
    <span key={platform}>
      <Link to={`/searchplatform/${platform}`}>{platform}</Link>{' '}
    </span>
  ));

  return (
    <article className="unique-post-page">
      <UserDetail post={post}></UserDetail>
      <UserInteraction postId={post.data.id} initialUpvotes={post.data.upvotes} initialDownvotes={post.data.downvotes} updatePostVotes={updatePostVotes} />
      <PostText post={post} />
      <PostImage post={post} />
      <PostDate post={post} />
      <Tags categoriesLinks={categoriesLinks} platformsLinks={platformsLinks} />
      <EditAndDeleteBtn post={post}/>
      <Separador />
      <Comments post={post} />
      <CommentForm
        postId={post.data.id}
        onAddComment={addComment}
      />
    </article>
  );
}

export default UniquePost;