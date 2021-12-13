import { Post } from "@/components/Post";
import useAccountPosts from "@/hooks/account/useAccountPosts";

function AccountPosts() {
  const { posts, error, isLoading } = useAccountPosts();

  return (
    <>
      {error && <div className="text-danger mb-3">{error.message}</div>}
      {isLoading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}

export default AccountPosts;
