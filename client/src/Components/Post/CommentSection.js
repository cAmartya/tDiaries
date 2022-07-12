import React, {useState, useRef} from 'react'
import { useDispatch } from 'react-redux';

import { commentPost } from '../../actions/posts'

function CommentSection({ post }) {
    const dispatch = useDispatch();
    const commentsRef = useRef();

    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleClick = async () => {
      const finalComment = `${user.result.userName}:${comment}`;
      const newComments = await dispatch(commentPost(finalComment, post._id));
      setComments(newComments);
      setComment('');
      commentsRef.current.scrollIntoView({ behaviour: 'smooth' });
    }

  return (
    <div className="container my-3 border-bottom rounded border-dark">
      <div className="d-flex mb-3">
        <textarea rows={2} type="text" className="form-control rounded-3 me-2" id="cmt" placeholder="Write a Comment" onChange={(e) => setComment(e.target.value)} value={comment} />        
        <button className="btn btn-outline-success" disabled={!user?.result || comment.length<2} onClick={handleClick}>POST</button>
      </div>
      <div className="container">
      <div className="container" style={{height: '100px', overflowY: 'auto' }}>
        {comments.map((c, i)=> 
          <p key={i} className='fs-6 mb-1'> <strong>{c.split(':')[0]}</strong> - <em>{c.split(':')[1]}</em> </p>
        )}
      <div ref={commentsRef}></div>
      </div>
      </div>
    </div>
  )
}

export default CommentSection