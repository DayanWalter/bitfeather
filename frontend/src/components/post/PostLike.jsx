export default function LikePost({ postId, setIsLiking }) {
  const handleLikePost = async () => {
    const authToken = localStorage.getItem('authToken');

    // Parameters for the backend request
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    };

    try {
      // Execute the backend request
      const response = await fetch(
        `http://localhost:3000/api/post/${postId}/like`,
        requestOptions
      );

      if (response.ok) {
        // Update the state to indicate that the user is now being followed
        console.log('Post liked successfully.');
      } else {
        console.error('Error liking post:', response.status);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    } finally {
      setIsLiking(true);
    }
  };

  return (
    <div>
      <button onClick={handleLikePost}>Like Post</button>
    </div>
  );
}