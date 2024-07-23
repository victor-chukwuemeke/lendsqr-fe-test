import './index.scss'
import { useIsAuthRoute, useLocationCode } from '../../_helpers/hooks'
// import ModalCenter, { useModalCenter } from '../../_controllers/ModalCenter'
import { numToString } from '../../_helpers/helpers'
import React, { memo, useCallback, useRef, useState } from 'react'
import { pageRoutes } from '../../_helpers'
import { useMediaQuery } from 'react-responsive'
import classNames from 'classnames'
import useOnClickOutside from '../../_components/useOnClickOutside'

import { ReactComponent as ArrowDownIcon } from '../../_assets/icons/arrow-down-2.svg'
import { ReactComponent as BriefCaseIcon } from '../../_assets/icons/briefcase.svg'
import { ReactComponent as LogoutIcon } from '../../_assets/icons/sign-out.svg'
import { ReactComponent as CloseIcon } from '../../_assets/icons/close-x.svg'
import { Link } from 'react-router-dom'

interface SidebarProps {
    closeSideBar: () => void
    sideBarOpen: boolean
}

const Sidebar: React.FC<SidebarProps> = memo(
    ({ sideBarOpen, closeSideBar }) => {
        const ulRef = useRef(null)
        const sideRef = useRef(null)
        const code = useLocationCode()
        const [drop, setDrop] = useState(false)
        useOnClickOutside(ulRef, () => {
            if (drop) setDrop(false)
        })

        const toggle = useCallback(() => setDrop((prev) => !prev), [])

        const activeRoute = useCallback(
            (num: number) => {
                return code === num
            },
            [code]
        )

        return (
            <>
                <div
                    className={`sidebar-backdrop ${sideBarOpen ? 'open' : ''}`}
                    onClick={() => {
                        closeSideBar()
                    }}
                />

                <div
                    className={classNames(
                        `sidebar p-0 pb-3 ${sideBarOpen ? 'open' : ''}`
                    )}
                >
                    <div
                        className={classNames(
                            `${sideBarOpen ? 'd-flex' : 'd-none'}`
                        )}
                        onClick={() => closeSideBar()}
                    >
                        <CloseIcon />
                    </div>
                    <button
                        onBlur={() => setDrop(false)}
                        onClick={toggle}
                        className="switch-organization"
                    >
                        <div
                            className={classNames(
                                'icon-wrapper h-100 d-flex align-items-center justify-content-center',
                                {}
                            )}
                        >
                            <BriefCaseIcon />
                        </div>
                        <span className="">switch organization</span>
                        <div
                            className={classNames(
                                'icon-wrapper h-100 d-flex align-items-center justify-content-center',
                                {}
                            )}
                        >
                            <ArrowDownIcon />
                        </div>
                        {drop && (
                            <ul className="dropdown">
                                <li
                                    onBlur={() => setDrop(false)}
                                    className="d-flex"
                                >
                                    <div
                                        className={classNames(
                                            'icon-wrapper h-100 d-flex align-items-center justify-content-center',
                                            {}
                                        )}
                                    >
                                        <BriefCaseIcon />
                                    </div>
                                    <span>Lendsqr</span>
                                </li>
                                <li
                                    onBlur={() => setDrop(false)}
                                    className="d-flex"
                                >
                                    <div
                                        className={classNames(
                                            'icon-wrapper h-100 d-flex align-items-center justify-content-center',
                                            {}
                                        )}
                                    >
                                        <BriefCaseIcon />
                                    </div>
                                    <span>Irorun</span>
                                </li>
                                <li
                                    onBlur={() => setDrop(false)}
                                    className="d-flex"
                                >
                                    <div
                                        className={classNames(
                                            'icon-wrapper h-100 d-flex align-items-center justify-content-center',
                                            {}
                                        )}
                                    >
                                        <BriefCaseIcon />
                                    </div>
                                    <span>Lendstar</span>
                                </li>
                            </ul>
                        )}
                    </button>
                    <ul className="sidebar_list position-relative">
                        {pageRoutes?.map((item, i) => (
                            <li key={i} className="">
                                {!item?.group ? (
                                    <Link
                                        to={item?.link as string}
                                        className={classNames(
                                            'h-100 d-flex align-items-center',
                                            {
                                                active: activeRoute(
                                                    item?.activeCode as number
                                                ),
                                            }
                                        )}
                                    >
                                        {item?.icon && (
                                            <div
                                                className={classNames(
                                                    'icon-wrapper h-100 d-flex align-items-center justify-content-center',
                                                    numToString(i + 1, true)
                                                )}
                                            >
                                                {item?.icon}
                                            </div>
                                        )}
                                        <span className="text-nowrap">
                                            {item?.label}
                                        </span>
                                    </Link>
                                ) : (
                                    <>
                                        <label htmlFor="" className="">
                                            {item?.label}
                                        </label>
                                        {item?.group?.map((itm, i) => (
                                            <Link
                                                key={i}
                                                to={itm?.link as string}
                                                className={classNames(
                                                    'h-100 d-flex align-items-center',
                                                    {
                                                        active: activeRoute(
                                                            itm?.activeCode as number
                                                        ),
                                                    }
                                                )}
                                            >
                                                {itm?.icon && (
                                                    <div
                                                        className={classNames(
                                                            'icon-wrapper h-100 d-flex align-items-center justify-content-center',
                                                            numToString(
                                                                i + 1,
                                                                true
                                                            )
                                                        )}
                                                    >
                                                        {itm?.icon}
                                                    </div>
                                                )}
                                                <span className="text-nowrap">
                                                    {itm?.label}
                                                </span>
                                            </Link>
                                        ))}
                                    </>
                                )}
                            </li>
                        ))}
                        <hr className="mb-2" />
                        <li className="last">
                            <Link
                                to={'/' as string}
                                className={classNames(
                                    'h-100 d-flex align-items-center',
                                    {
                                        active: '',
                                    }
                                )}
                            >
                                <div
                                    className={classNames(
                                        'icon-wrapper h-100 d-flex align-items-center justify-content-center',
                                        {}
                                    )}
                                >
                                    <LogoutIcon />
                                </div>
                                <span className="text-nowrap">Logout</span>
                            </Link>
                        </li>
                    </ul>
                    <div className="version">v1.2.0</div>
                </div>
            </>
        )
    }
)

export default Sidebar
