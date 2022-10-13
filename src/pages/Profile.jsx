import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify' 

import {getAuth, updateProfile} from 'firebase/auth'
import {updateDoc, doc, collection, getDocs, query, where, orderBy, deleteDoc} from 'firebase/firestore'
import {db} from '../firebase.config'

import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'

import ListingItem from '../components/ListingItem'

//Profile component displays user info
function Profile() {
  //using firebase auth, user is saved in state
  const auth = getAuth();
  //if the user click on change button, save that to the state
  const [changeDetails, setChangeDetails] = useState(false);
  //name and email are saved in formData state
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })
  //formData is extracted to name and email
  const {name, email} = formData;

  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, 'listings');

      const q = query(listingsRef, where('userRef', '==', auth.currentUser.uid), orderBy('timestamp', 'desc'));

      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
       })
     })

     setListings(listings);
     setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid])

  //on log out, sign out the user using firebase auth, and navigate the user to the home page
  const onLogout = () => {
    auth.signOut();
    navigate('/');
    toast.success('Successfully logged out.');
  }

  //on submit, if there are modifications in the name, update profile and update doc
  const onSubmit = async () => {
    try {
      if(auth.currentUser.displayName !== name) {
        //update display name in fb
        await updateProfile(auth.currentUser, {
          displayName: name
        })

        //Update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name
        })
      }
    } catch (error) {
      toast.error('Could not update profile details.')
    }
  }

  //on input field change, save it in the form data
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  //on delete, delete listing
  const onDelete = async (listingId) => {
    if(window.confirm('Are you sure that you want to delete this listing?')) {
      await deleteDoc(doc(db, 'listings', listingId))
      const updatedListings = listings.filter( (listing) => listing.id !== listingId)
      setListings(updatedListings)
      toast.success('Successfully deleted listing.')
    }
  }

  //on edit, delete listing
  const onEdit = async (listingId) => {
    navigate(`/edit-listing/${listingId}`)
  }

  return (
  <div className='profile'>
    <div className='profileHeader'>
      <p className='pageHeader'>My Profile</p>
      <button type='button' className='logOut' onClick={onLogout}>Log Out</button>
    </div>

    <main>
      <div className='profileDetailsHeader'>
        <p className='profileDetailsText'>Personal Details</p>
        <p className='changePersonalDetails' onClick={() => {
          changeDetails && onSubmit()
          setChangeDetails((prevState) => !prevState)
        }}>
          {changeDetails ? 'done' : 'change'}
        </p>
      </div>

      <div className='profileCard'>
        <form>
          <div className='row'>
          <label htmlFor='name' className='col-2 offset-1'>Name:</label>
          <input  type='text' 
                  id='name' 
                  className={!changeDetails ? 'profileName col-9' : 'profileNameActive col-9'}
                  disabled={!changeDetails}
                  value={name}
                  onChange={onChange}
          />
          </div>

          <div className='row'>     
          <label htmlFor='email' className='col-2 offset-1'>Email:</label>
          <input  type='text' 
                  id='email' 
                  className='profileEmail col-9'
                  disabled={!changeDetails}
                  value={email}
                  onChange={onChange}
          />
          </div>
        </form>
      </div>
      <Link to='/create-listing' className='createListing'>
        <img src={homeIcon} alt='home'/>
        <p>Sell or rent your home</p>
        <img src={arrowRight} alt='arrow right' />
      </Link>

      {!loading && listings?.length > 0 && (
          <>
            <p className='listingText'>Your Listings</p>
            <ul className='listingsList'>
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
    </main>
  </div>
    )
}

export default Profile