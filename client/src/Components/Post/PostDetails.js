import React, { useEffect } from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
// import { Link, useNavigate, useParams } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';
function PostDetails() {
  
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    // console.log(post?.tags);
    dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
  }, [post]);
  
  const recommendPosts = posts.filter(({_id}) => _id !== post?._id );  

  if(!post && !isLoading) {
    return(
      <div className="container my-3">
        <h4>Post Not Found</h4>
      </div>
    )
  }

  return (
    isLoading ?
    <div className='container text-center my-4'>
        <div className="spinner-border text-success" role="status"></div>
        <h5 className="text-center text-success">Loading...</h5>
      </div>
      :
    <>
    <div className="container my-4">
        
        <div className="row featurette">
          <div className="col-md-7">
            <h2 className="featurette-heading mb-1">{post.title}</h2>

            <p className="mb-2 text-muted my-1 mx-1 lead fs-6">{post.tags.map((tag) => `#${tag} `)}</p>                
            <h3 className="lead mb-1 my-3"><em className='fs-6'>Created By: </em><strong className='fs-3'>{post.userName}</strong></h3>
            <p className="mb-2 my-1 mx-1 fs-6" style={{color:"gray"}}><em>{moment(post.createdAt).fromNow()}</em></p>
            
            <CommentSection post={post}/>
            
          </div>
          <div className="col-md-5 container d-flex justify-content-center">
            <img className="featurette-image img-fluid mx-auto" src={post.selectedFile} width="400" height="400" alt="Generic placeholder" />
          </div>
        </div>        

        <div className="row featurette">
          <div className="container my-3">
            <p className="">{post.message}</p>
          </div>          
        </div>

        <hr className="featurette-divider" />        
      </div>
      
      <div className="container marketing"> 
      <h3 className='mb-4'>You may also like:</h3> 
        <div className="row my-2">      
          {(recommendPosts.length > 0) ? 
          recommendPosts.map((post)=>          
            <div className="col-lg-3 border rounded border-dark mx-3" key= {post._id}>
              <div className="text-center">
              <img className="rounded-circle my-3" src={post.selectedFile} alt="Generic placeholder" width="140" height="140" />
              <h2>{post.title}</h2>
              <p className='fs-5'>Author: <strong>{post.userName}</strong></p>
              <p>{post.message.substr(0, 50)}</p>
              <p><Link className="btn btn-primary" to={`/posts/search/${post._id}`} role="button">View details &raquo;</Link></p>
              </div>            
            </div> 
            )
            :
            <div className="container my-3">
              <h4>No Recommendations</h4>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default PostDetails