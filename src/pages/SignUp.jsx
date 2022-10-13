import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

import OAuth from '../components/OAuth'

import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {db} from '../firebase.config'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'

//Sign Up page displays a sign up form
function SignUp() {
  //useState hook is used to set show password (text or password input type)
  const [showPassword, setShowPassword] = useState(false);
  //formdata is stored in state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  //formdata is extracted to name, email and password
  const {name, email, password} = formData;

  const navigate = useNavigate();

  //on input change, set that field in form data
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  }

  //on form submit, get firebase auth and then create new user in authentication and new record in database
  const onSubmit = async (e) => {
    e.preventDefault();

    try{
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name
      });
      const formDataCopy = {...formData};
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, 'users', user.uid), formDataCopy);
      navigate('/');
    } catch (error) {
      toast.error('Registration could not be processed. Please check your data and try again.');
    }
  }

  return (
    <>
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Welcome!</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
        <input  type='text' 
                  className='nameInput' 
                  placeholder='Name' 
                  id='name' 
                  value={name} 
                  onChange={onChange}/>

          <input  type='email' 
                  className='emailInput' 
                  placeholder='Email' 
                  id='email' 
                  value={email} 
                  onChange={onChange}/>

          <div className='passwordInputDiv'>
            <input  type={showPassword ? 'text' : 'password'} 
                    className='passwordInput' 
                    placeholder='Password' 
                    id='password' 
                    value={password}
                    onChange={onChange} />
            <img src={visibilityIcon} alt='show password' className='showPassword' onClick={() => setShowPassword((prevState) => !prevState)}/>
          </div>

          <div className='signUpBar'>
            <p className='signUpText'>Sign Up</p>
            <button className='signUpButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>

        </form>

        {/*Google OAuth  */}
        <OAuth />
        
        <Link to='/sign-in' className='registerLink'>Sign In Instead</Link>
      </main>
    </div>
    </>
  )
}

export default SignUp