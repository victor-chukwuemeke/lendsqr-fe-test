import React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'
import Notification from '../../../_assets/images/new-bell.png'
import Pill from './pill'

const Navitems: React.FC = () => {
    return (
        <div className="nav-items d-flex align-items-center">
            <div className="docs d-none d-lg-flex">
                <Link to="#!">Docs</Link>
            </div>
            <div className="bell d-none d-lg-flex">
                <img
                    src={Notification}
                    alt="notification"
                    className="h-100 w-100"
                />
            </div>
            <div>
                <Pill />
            </div>
        </div>
    )
}

export default Navitems
