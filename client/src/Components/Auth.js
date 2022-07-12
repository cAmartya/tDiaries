import React, {useState} from 'react'
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {signin, signup} from '../actions/auth'

function Auth() {
  
  // const port = "8000";
  // const urlhost = `http://localhost:${port}/`;  

  
  const navigate = useNavigate()
  
  const initCred = {userName: "", email: "", password: "", cpassword: ""};
  const dispatch = useDispatch();
  const [showPass, setshowPass] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [cred, setCred] = useState(initCred);

  const onChange = (e) =>{
    setCred({...cred, [e.target.id]: e.target.value})
  }

  const togPass = () => {
    setshowPass((pass) => !pass)
  }

  const switchSign = () => {
    setIsSignedUp((state) => !state);
    setshowPass(false);
  }
  const handleSubmit = (e) =>  {
    e.preventDefault();
    // console.log(cred);

    if(isSignedUp)  {
      if(cred.password === cred.cpassword)  dispatch(signup(cred, navigate));
      else  alert("Password and Confirm Password do not match.");
    }else {
      
      dispatch(signin(cred, navigate));
    }
  }

  const googleSuccess = (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    
    try {
      dispatch({type: 'AUTH', data: {result, token}});
      navigate("/", {replace: true});

    } catch (error) {
      console.log(error);
    }
  }
  const googleFailure = (err) => {
    console.log(err);
  }

  return (
    <div className="modal modal-signin position-static d-block bg-secondary py-5" tabIndex="-1" role="dialog" id="modalSignin">
      <div className="modal-dialog" role="document">
        <div className="modal-content rounded-4 shadow">
          <div className="modal-header p-5 pb-4 border-bottom-0">
            <h2 className="fw-bold mb-0" style={{margin: "auto"}}>{`${!isSignedUp ?  `Sign In` : `Sign Up`} to use tDiaries`}</h2>
            
          </div>

          <div className="modal-body p-5 pt-0">
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input type="email" required className="form-control rounded-3" id="email" placeholder="name@example.com" onChange={onChange} value={cred.email} />
                <label htmlFor="email">Email address</label>
              </div>
              {isSignedUp && <div className="form-floating mb-3">
                <input required type="text" className="form-control rounded-3" id="userName" placeholder="username" onChange={onChange} value={cred.userName} />
                <label htmlFor="username">Username</label>
              </div>}
              <div className="form-floating mb-3">
                <input required type={showPass ? `text` :`password`} className="form-control rounded-3" id="password" placeholder="Password" onChange={onChange} value={cred.password}/>
                <label htmlFor="password">Password</label>
              </div>
              <div className="form-check mb-3" >
                <input className="form-check-input" type="checkbox" value={!showPass} checked={showPass} onChange={togPass} id="togglePass" style={{cursor: "pointer"}}/>
                <label className="form-check-label" htmlFor="togglePass" style={{cursor: "pointer"}}>Show Password</label>
              </div>
              {isSignedUp && <div className="form-floating mb-3">
                <input required type="password" className="form-control rounded-3" id="cpassword" placeholder="Confirm Password" onChange={onChange} value={cred.cpassword} />
                <label htmlFor="cpassword">Confirm Password</label>
              </div>}

              <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">{!isSignedUp ? `Sign In` : `Sign Up`}</button>
              <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" onClick={switchSign}>{`${isSignedUp ?  `Already` : `Don't`} have An Account, ${isSignedUp ?  `Sign In?` : `Sign Up`}`}</button>
              <hr className="my-4" />
              
              <h2 className="fs-5 fw-bold mb-3">Or use a third-party</h2>
              
              <GoogleLogin
                clientId=process.env.GOOGLE_CLIENT_ID
                render={(renderProps)=> 
                <>
                  <button className="w-100 py-2 mb-2 btn btn-outline-dark rounded-3" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                  {`${!isSignedUp ?  `Sign In` : `Sign Up`} with Google`}
                  </button>
                </>}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy='single_host_origin'
              />

              <button className="w-100 py-2 mb-2 btn btn-outline-primary rounded-3" type="submit">
                {`${!isSignedUp ?  `Sign In` : `Sign Up`} with Facebook`}
              </button>              
            
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth

// {"web":{"client_id":"1057531342956-ad2m9tggojfikg3i8og176q49ll6cu7a.apps.googleusercontent.com","project_id":"tdiaries","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"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","redirect_uris":["http://localhost:3000/auth"],"javascript_origins":["http://localhost:3000","http://localhost:8000"]}}
