import {useNavigate, useLocation} from 'react-router-dom'
import {ReactComponent as OfferIcon} from '../assets/svg/localOfferIcon.svg'
import {ReactComponent as ExploreIcon} from '../assets/svg/exploreIcon.svg'
import {ReactComponent as PersonOutlineIcon} from '../assets/svg/personOutlineIcon.svg'

//Navbar component displays navbar in footer
function Navbar() {
    //navigate is used to navigate the user to the specific page
    const navigate = useNavigate()
    //location is used to check user current route
    const location = useLocation()

    const pathMatchRoute = (route) => {
        if(route === location.pathname) {
            return true
        }
    }

    return (
    <footer className='navbar'>
        <nav className='navbarNav'>
            <ul className='navbarListItems'>
                <li className='navbarListItem' onClick={() => navigate('/')}>
                    <ExploreIcon fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' />
                    <h6 className={pathMatchRoute('/') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Explore</h6>
                </li>

                <li className='navbarListItem' onClick={() => navigate('/offers')}>
                    <OfferIcon fill={pathMatchRoute('/offers') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' />
                    <h6 className={pathMatchRoute('/offers') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Offers</h6>
                </li>

                <li className='navbarListItem' onClick={() => navigate('/profile')}>
                    <PersonOutlineIcon fill={pathMatchRoute('/profile') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' />
                    <h6 className={pathMatchRoute('/profile') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Profile</h6>
                </li>
            </ul>
        </nav>
    </footer>
    )
}

export default Navbar