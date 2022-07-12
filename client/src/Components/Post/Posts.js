import React from 'react';
import { useSelector } from 'react-redux';

import PostItem from './PostItem';

const Posts = () => {

  const { posts, isLoading } = useSelector((state) => state.posts);
  
  if(!isLoading && !posts.length)  {
    return(
      <div className='container my-4 d-flex justify-content-center'>
      <h4> No tDiaries to display </h4>
      </div>
    )
  }

  return (
    isLoading ? <div className='container text-center my-4'>
                        <div className="spinner-border text-success" role="status"></div>
                        <h5 className="text-center text-success">Loading...</h5>
                    </div>
     : (
      
        <div className="row my-3">
        <h2 className="fs-2 fw-bold">Explore tDiaries</h2>
        {
        posts.map(post => <PostItem key= {post._id} post={post} />)
        }
        </div>
    )
  );
};

export default Posts;


// <div className="row my-3">
// <h2 className="fs-2 fw-bold">Your Notes</h2>
// {
// posts.map(post => <PostItem key= {post._id} post={post} setCurrentId={setCurrentId} />)
// }
// </div>