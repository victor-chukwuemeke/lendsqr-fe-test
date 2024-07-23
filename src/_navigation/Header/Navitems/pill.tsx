import React, { memo, useCallback, useState } from 'react'
import Avatar from '../../../_assets/images/avatar.png'
import classNames from 'classnames'
import { ReactComponent as Arrowdown } from '../../../_assets/icons/L_arrdown.svg'

const Pill: React.FC = memo(({}) => {
    const [open, setOpen] = useState(false)
    const toggle = useCallback(() => setOpen((prev) => !prev), [])

    return (
        <button
            onBlur={() => setOpen(false)}
            onClick={toggle}
            className="user-pill d-flex align-items-center"
        >
            <div className="img">
                <img src={Avatar} alt="" className="w-100 h-100" />
            </div>
            <span className="text-capitalize user-name d-none d-lg-flex">
                Adedeji
            </span>
            <div className="arrowdown h-100 d-flex align-items-center d-none d-lg-flex justify-content-center">
                <Arrowdown />
            </div>
            <ul className={classNames('drop-menu', { open })}>
                <li>Logout</li>
            </ul>
        </button>
    )
})

export default Pill
