import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
    const { user, logout,login } = useContext(AuthContext);

    let navigate = useNavigate();

    const onLogout = () => {
        logout()
        navigate('/')
    }
    const onLogin = ()=> {
        login()
        navigate('/login')
    }
    return (
        <header>
            <div className='container'>
                <div className='inner-content'>
                    <div className='brand'>
                        <Link to='/'><i className="bi bi-bootstrap-fill"></i>&nbsp;Book Exchange App</Link>
                    </div>
                    <ul className='nav-links'>

                        {user ?
                            <>
                                <li>
                                    <Link to='/PostForm'>AddBook&nbsp;<i className="bi bi-journal-plus"></i></Link>
                                </li>
                                <li>
                                    <Link to='/Post'>Books&nbsp;<i className="bi bi-book"></i></Link>
                                </li>
                                <li>
                                    <Link to='/Profile'>Profile&nbsp;<i className="bi bi-person-circle"></i></Link>
                                </li>
        

                                <li>
                                    <Link to='/'  onClick={onLogout}>Logout&nbsp;<i className="bi bi-box-arrow-in-left"></i></Link>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <Link to='/register'> Register&nbsp;<i className="bi bi-person-square"></i></Link>
                                </li>
                                <li>
                                <Link to = '/login' onClick={onLogin}>Login&nbsp;<i className="bi bi-box-arrow-in-right"></i></Link>
                                    </li>
                               

                            </>
                        }
                        {/* <li>
                    <Link to = '/add' className='btn'>+Add</Link>
                </li>   */}

                    </ul>
                </div>
            </div>
        </header>
    )
}
export default Navbar
