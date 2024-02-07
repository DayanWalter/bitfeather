import PostListCard from './PostListCard';

export default function PostList({ posts }) {
  posts.sort((a, b) => new Date(b.posting_date) - new Date(a.posting_date));
  return (
    <ul>
      {posts.map((post) => (
        <li key={post._id}>
          <PostListCard postId={post._id} />
        </li>
      ))}
    </ul>
  );
}
