import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
    numberWithCommas,
    setObjectInStorage,
    summaryCards,
} from '../../_helpers'
import { parseISO, format } from 'date-fns'
import classNames from 'classnames'
import { Pagination, useOnClickOutside } from '../../_components'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../_actions'

//icons
import { ReactComponent as FilterIcon } from '../../_assets/icons/filter.svg'
import { ReactComponent as DotsIcon } from '../../_assets/icons/3-dots.svg'
import { ReactComponent as EyeIcon } from '../../_assets/icons/eye.svg'
import { ReactComponent as UserTimesIcon } from '../../_assets/icons/user-times-2.svg'
import { ReactComponent as UserCheckIcon } from '../../_assets/icons/user-check-2.svg'

import PageWrapper from '../../_components/PageWrapper'
import './index.scss'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Select from 'react-dropdown-select'
import Filters from './filters'

const Users: React.FC = () => {
    const ulRef = useRef()
    const [currentPage, setCurrentPage] = useState(1)
    const [filterOpen, setFilterOpen] = useState(false)

    const itemsPerPage = 10
    const dispatch = useDispatch()
    const { IsRequestingAllUsers, allUsers } = useSelector((s: any) => s.user)

    useEffect(() => {
        dispatch(userActions.retrieveAllUsers())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const formattedUsers = allUsers.map((user: { registered: string }) => {
        const cleanedIsoString = user.registered.replace(' -', '-')
        const date = parseISO(cleanedIsoString)
        const formattedDate = format(date, 'MMM dd, yyyy p')
        return { ...user, registered: formattedDate }
    })

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = formattedUsers.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(allUsers.length / itemsPerPage)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const toggleFilter = (evt: {
        preventDefault: () => void
        stopPropagation: () => void
    }) => {
        evt.preventDefault()
        evt.stopPropagation()
        setFilterOpen((prev) => !prev)
    }
    return (
        <PageWrapper>
            <div className="users">
                <h4 className="pb-3">Users</h4>
                <div className="row my-4">
                    {summaryCards?.map((card, i) => (
                        <div
                            key={i}
                            className="col-xl-3 col-md-4 col-sm-6 mb-4"
                        >
                            <div className="cards p-4 h-100">
                                <div className="icon">{card.icon}</div>
                                <p className="my-2">{card.label}</p>
                                <h5 className="">
                                    {numberWithCommas(card.value)}
                                </h5>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="table-responsive p-4">
                    {IsRequestingAllUsers ? (
                        <div className="d-flex justify-content-center">
                            <h6>loading still...?</h6>
                            <p className="text">check your your internet</p>
                        </div>
                    ) : (
                        <table className="">
                            <thead className="position-relative">
                                <tr className="d-table-row">
                                    <th
                                        onBlur={() => setFilterOpen(false)}
                                        onClick={toggleFilter}
                                        style={{ cursor: 'pointer' }}
                                        className="ps-0 align-middle  text-nowrap text-uppercase"
                                    >
                                        organization
                                        <FilterIcon />
                                        {filterOpen && <Filters />}
                                    </th>
                                    <th className="align-middle text-nowrap text-uppercase">
                                        username
                                        <FilterIcon />
                                    </th>
                                    <th className="align-middle text-nowrap text-uppercase">
                                        email
                                        <FilterIcon />
                                    </th>
                                    <th className="align-middle text-nowrap text-uppercase">
                                        phone number
                                        <FilterIcon />
                                    </th>
                                    <th className="align-middle text-nowrap text-uppercase">
                                        date joined
                                        <FilterIcon />
                                    </th>
                                    <th className="align-middle text-nowrap text-uppercase">
                                        status
                                        <FilterIcon />
                                    </th>
                                    <th className="align-middle p-0"></th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {currentItems?.length ? (
                                    currentItems?.map(
                                        (user: any, i: number) => (
                                            <TableRow
                                                key={user?.id}
                                                i={i}
                                                user={user}
                                            />
                                        )
                                    )
                                ) : (
                                    <tr className="d-table-row">
                                        <td
                                            align="center"
                                            className="pt-5"
                                            colSpan={6}
                                        >
                                            <p>No payments have been added</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
                {!IsRequestingAllUsers && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </PageWrapper>
    )
}

export default Users

const TableRow = ({ user, i }: any) => {
    const ulRef = useRef<HTMLUListElement>(null)
    const [drop, setDrop] = useState(false)

    useOnClickOutside(ulRef, () => {
        if (drop) setDrop(false)
    })

    return (
        <tr key={i} className="d-table-row">
            <td className="ps-0">{user?.company}</td>
            <td>{user?.name}</td>
            <td>{user?.email}</td>
            <td>{user?.phone}</td>
            <td>{user?.registered}</td>
            <td className="text-capitalize">
                <div
                    className={classNames('colors', {
                        active: user?.status === 'Active',
                        inactive: user?.status === 'Inactive',
                        pending: user?.status === 'Pending',
                        blacklisted: user?.status === 'Blacklisted',
                    })}
                >
                    {user?.status}
                </div>
            </td>
            <td className="p-0">
                <div className="options">
                    <div onClick={() => setDrop((s) => !s)}>
                        <DotsIcon />
                    </div>
                    {drop && (
                        <ul ref={ulRef} className="drop">
                            <li className="me-1">
                                <Link to={`${user?._id}`}>
                                    <EyeIcon /> view details
                                </Link>
                            </li>
                            <li className="me-1">
                                <UserTimesIcon /> blacklist user
                            </li>
                            <li className="me-1">
                                <UserCheckIcon /> activate user
                            </li>
                        </ul>
                    )}
                </div>
            </td>
        </tr>
    )
}
