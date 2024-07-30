import React, {useState} from 'react';
import { Link } from 'react-router-dom';



// import css stylu
import './Navbar.css';

function Navbar() {

    //function
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);  // vrati opacnu hodnotu !click
    const closemobilemenu = () => setClick(false);

    return (
    <>
        <nav className='navbar'>
            <div className='navbar-container'>
                <Link to='/' className='navbar-logo' onClick={closemobilemenu}>
                    LOGO
                </Link>


                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fa fa-times' : 'fa fa-bars'} /> 
                </div>

                <ul className={click ? 'nav-menu active' :  'nav-menu'}>
                     {/*  ked je click = true, zobrazi sa nav menu active,
            ak je click = falce zobrazi len nav menu */}
                    {/* <div className='nav-menu-all-links'> */}
                    < li className='nav-item'>
                        <Link to = '/' className='nav-links' onClick={closemobilemenu}>
                        Home
                        </Link>
                    </li>
                    < li className='nav-item'>
                        <Link to = '/ahout' className='nav-links' onClick={closemobilemenu}>
                        About
                        </Link>
                    </li>
                    < li className='nav-item'>
                        <Link to = '/users' className='nav-links' onClick={closemobilemenu}>
                        Users
                        </Link>
                    </li>
                    <li className='nav-item-space-under'></li>
                    
                    
                    
                    
                    
                    {/* </div> */}

                </ul>
       

            
            </div>



        </nav>
    </>
  )
}

export default Navbar
    


