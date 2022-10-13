import {useState} from 'react'
import {Link} from 'react-router-dom'
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import {toast} from 'react-toastify'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'

//ForgotPassword component displays form to enter the email and reset the password (firebase system)
function ForgotPassword() {
  const [email, setEmail] = useState('');

  const onChange = (e) => {
    setEmail(e.target.value);
  }

  //onSubmit, get auth, and send password reset email to that email address
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success('Email was sent');
    } catch (error){
      toast.error('Could not send reset email');
    }
  }

  return (
    <div className='pageContainer'>
      <header>
        <div className='pageHeader'>Forgot Password</div>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <input type='email' className='emailInput' placeholder='Email' value={email} onChange={onChange}/>
          <Link className='forgotPasswordLink' to='/sign-in'>Sign In</Link>
          <div className='signInBar'>
            <div className='signInText'>Send Reset Link</div>
            <button className='signInButton'>
              <ArrowRightIcon fil='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword