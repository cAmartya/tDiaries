import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { likePost, deletePost } from '../../actions/posts';
import { useNavigate } from 'react-router-dom';

function PostItem({ post }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
    const handleUpdate = (e) =>  {
        e.preventDefault();
        navigate(`/addpost/${post._id}`, {replace: true});        
    }

    const openPost = ()=>   {        
        navigate(`/posts/search/${post._id}`, {replace: true});
    }
  
  return (    
    <div className="col-md-3" id="dis_diary">
        
        <div className="card my-2 mx-2" style = {{ margin: "auto"}}>
            <div className="card-body"  >
                <div className="container my-2 position-absolute" style={{ color: 'white' }}>
                    <h5>{post.userName}</h5>
                    <p className="fs-6">{moment(post.createdAt).fromNow()}</p>
                </div>
                <img onClick={openPost} src= {post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} className="card-img-top" alt="Failed to load" style = {{ margin: "auto"}}/>        
                
                

                <p className="card-subtitle mb-2 text-muted my-1 mx-1">{post.tags.map((tag) => `#${tag} `)}</p>
                
                <h5 className="card-title mx-2">{post.title}</h5>
                <p className="card-text mx-2">{`${post.message.substr(0, 50)} ...`}</p>
        
                <i className="fas fa-solid fa-thumbs-up fa-lg mx-2 my-2" style={{cursor: "pointer"}} onClick={() => {
                    if(user?.result) 
                        dispatch(likePost(post._id));
                    else
                        alert("You Must be Logged In to Like a post");
                }}> {`  ${post.likes.length}`}</i>  
                {(user?.result?.googleid === post?.creator || user?.result?._id === post?.creator) &&
                <>
                    <i className="fas fa-solid fa-trash fa-lg mx-3 my-2" style={{cursor: "pointer"}} onClick={() => dispatch(deletePost(post._id))}></i>                
                    <i className="fas fa-solid fa-keyboard fa-lg mx-4 my-2" style={{cursor: "pointer" }} onClick={handleUpdate} ></i>
                </>}
                {/* logic to show if user likes a post */}
            </div>
        </div>
    </div>    
    
  )
}

export default PostItem
// dispatch(updatePost(post._id, post))