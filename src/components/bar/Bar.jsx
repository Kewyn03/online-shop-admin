import React from 'react'
import { Redirect, useHistory } from "react-router";
import { Link } from 'react-router-dom'


import './styles.scss'
import { AuthContext } from "../../context/AuthContext";


export default function Bar() {


    const [isRole, setIsRole] = React.useContext(AuthContext)
    const history = useHistory()

    React.useEffect(() => {
        const linkColor = document.querySelectorAll('.nav__link')

        function colorLink() {
            linkColor.forEach(l => l.classList.remove('active'))
            this.classList.add('active')
        }

        linkColor.forEach(l => l.addEventListener('click', colorLink))
    }, )

    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

// Close the dropdown menu if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
    /*===== LINK ACTIVE  =====*/


    const logout = () => {
        setIsRole(false)
        sessionStorage.removeItem('role')
        history.push('/')


    }


    if (!(sessionStorage.getItem('role') === 'admin')) {
        return (
            <>
                <Redirect exact to='/'/>
            </>
        )
    }

    return (
        <>
            <header className='header'>

                <div className="header-name">
                    <span className='text'>
                        Online Shop
                    </span>

                </div>

                <div className="dropdown">
                    <button onClick={(e) => myFunction(e)} className="dropbtn">Click</button>
                    <div id="myDropdown" className="dropdown-content">
                        <p>Admin</p>

                        <p onClick={e => logout(e)}>
                            <ion-icon name="log-out-outline" className="nav__dropdownIcon"/>
                            Logout
                        </p>
                    </div>
                </div>

            </header>

            <body id="body-pd">
            <div className="l-navbar" id="navbar">
                <nav className="nav">
                    <div>

                        <div className="nav__list">
                            <Link exact to='/main' className="nav__link active">
                                <ion-icon name="home-outline" className="nav__icon"/>
                            </Link>
                            <Link exact to='/users' className="nav__link ">
                                <ion-icon name="people-outline" className="nav__icon"/>
                            </Link>
                            <Link exact to='/items' className="nav__link">
                                <ion-icon name="cube-outline" className="nav__icon"/>
                            </Link>
                            <Link exact to='/orders' className="nav__link">
                                <ion-icon name="bag-check-outline" className="nav__icon"/>
                            </Link>

                        </div>
                    </div>


                </nav>
            </div>

            </body>
        </>

    )
}