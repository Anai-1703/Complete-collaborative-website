
import { PostListPage }  from './PostListPage';
import  CommentPage  from './CommentPage';

export function HomePage() {

    return (
      <>
        <h2>Posts</h2>
        <PostListPage />
        <h2>Comment</h2>
        <CommentPage />
            </>
    )
}

