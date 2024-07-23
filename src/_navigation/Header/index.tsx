import React, { useRef, useState } from 'react'
import './index.scss'
import { ReactComponent as Logo } from '../../_assets/icons/lend_logo.svg'
import { ReactComponent as Burger } from '../../_assets/icons/burger-menu.svg'
import Searchbar from './Searchbar'
import Navitems from './Navitems'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'

interface HeaderProps {
    openSideBar: () => void
    sideBarOpen: boolean
}

const Header: React.FC<HeaderProps> = ({ openSideBar, sideBarOpen }) => {
    const view999 = useMediaQuery({ query: '(max-width: 999px)' })
    return (
        <header className="header d-flex align-items-center">
            <Link
                to="/dashboard"
                // onClick={ModalCenter.closeModal}
                className="logo-link d-flex align-items-center"
            >
                <div className="logo">
                    <Logo />
                </div>
            </Link>

            {view999 && (
                <div onClick={() => openSideBar()}>
                    <Burger />
                </div>
            )}
            <div className="nav d-flex align-items-center justify-content-between">
                <div>
                    <Searchbar />
                </div>
                <div>
                    <Navitems />
                </div>
            </div>
        </header>
    )
}

export default Header
