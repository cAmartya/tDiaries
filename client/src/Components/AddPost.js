import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import { createPost, updatePost } from '../actions/posts';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost } from '../actions/posts';

function AddPost() {
    
    let {id} = useParams();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    let { post } = useSelector((state) => state.posts)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false);
    const [isPost, setIsPost] = useState(false)

    useEffect(() => {
        if(id && !isEdit)  {
            console.log(id);        
        
            setIsEdit(true);
            dispatch(getPost(id));
        }  
      }, [id]);
    
    useEffect(() => {
    if (post && post !== postData)    {
        console.log("In post-Effect")
        setIsPost(true);
        setPostData(post);
    }
    }, [post]);   


    const clear = () => {    
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });    
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isEdit) {
            dispatch(createPost({...postData, userName: user?.result?.userName}));
            post=null;
            clear();
            navigate("/posts", {replace: true});
        } else {            
            // console.log("EditPost", post);            
            dispatch(updatePost(id, {...postData, userName: user?.result?.userName}));
            post=null;
            clear();
            navigate("/posts", {replace: true});
            window.location.reload();
        }
        
        // navigate(`posts/search/${id}`, replace)
    };

    if(!user?.result?.userName)  {
        return(
            <div className="container my-3">
                <h3>You must be logged in to create tDiaries</h3>
            </div>
        )
    }

  return (
    <form className='container my-3' onSubmit={handleSubmit}>
        <h3>{post ? `Editing old memory : ${post.title}` : 'Share your Memories'}</h3>
        
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" required value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />            
        </div>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Experience</label>
            <textarea className="form-control" id="message" rows="3" value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}></textarea>
        </div>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Tags</label>
            <input type="text" className="form-control" id="tags" value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })} />            
        </div>
        <div className="mb-3">
            <label htmlFor="formFile" className="form-label">Upload a Photo</label>
            <div className="form-control">
            <FileBase type="file" id="formFile" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}/>
            </div>
        </div>

        <div className="my-3 d-flex justify-content-center">
            <button type="submit" className="btn btn-success mx-2" disabled={postData.message.length<5} >Submit</button>
            <button className="btn btn-danger mx-2" onClick={clear} >Clear</button>
        </div>
    </form>
  )
}

export default AddPost

// {currentId ? `Editing old memory : "${post.title}"` : 'Share your Memories'}