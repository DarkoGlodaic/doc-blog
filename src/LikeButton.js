import React, { useState } from 'react';

const LikeButton = ({ blog }) => {
  const [likes, setLikes] = useState({});

  const handleLike = async (blogId) => {
    // Simulate updating the database
    // In a real application, make an API call to update likes on the server
    await updateLikesInDatabase(blogId);

    setLikes((prevLikes) => ({
      ...prevLikes,
      [blogId]: !prevLikes[blogId],
    }));
  };

  const updateLikesInDatabase = async (blogId) => {
    // Simulate an API call to update likes on the server
    // In a real application, you would make a network request here
    // For simplicity, we're just using a setTimeout to simulate an asynchronous action
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log(`Likes updated for blog ${blogId}`);
  };

  return (
    <div>
      <button onClick={() => handleLike(blog.id)}>
        {likes[blog.id] ? 'Unlike 👎' : 'Like 👍'}
      </button>
      <span>{blog.likes + (likes[blog.id] ? 1 : 0)}</span>
    </div>
  );
};

export default LikeButton;