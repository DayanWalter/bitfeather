import styles from '../../css/CommentLikeUnlike.module.css';

import Icon from '@mdi/react';

import { mdiHeartOutline } from '@mdi/js';

export default function CommentLike({ commentId, setIsLiking }) {
  const handleCommentLike = async () => {
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
        `http://localhost:3000/api/comment/${commentId}/like`,
        requestOptions
      );

      if (response.ok) {
        // Update the state to indicate that the comment is liked
        console.log('Comment liked successfully.');
      } else {
        console.error('Error liking comment:', response.status);
      }
    } catch (error) {
      console.error('Error liking comment:', error);
    } finally {
      setIsLiking(true);
    }
  };

  return (
    <div>
      <Icon
        onClick={handleCommentLike}
        path={mdiHeartOutline}
        size={1}
        className={styles.icon}
      />
    </div>
  );
}
