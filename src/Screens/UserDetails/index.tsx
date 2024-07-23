import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageWrapper from '../../_components/PageWrapper'
import { Link } from 'react-router-dom'
import { tabLists } from '../../_constants'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../_actions'
import { capitalizeFirstLetter, numberWithCommas } from '../../_helpers'
import { useNavigate } from 'react-router-dom'
import './index.scss'

import { ReactComponent as ArrowBackIcon } from '../../_assets/icons/go-back-arrow.svg'
import { ReactComponent as AvatarIcon } from '../../_assets/icons/user-details-avatar.svg'
import NewAvatarIcon from '../../_assets/images/l_avartar.png'
import StarRating from 'react-svg-star-rating'

interface IParams {
    id: string
}

const UserDetail: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams<IParams | any>()
    const { allUsers } = useSelector((s: any) => s.user)
    const user = allUsers?.find((obj: any) => obj._id === id)
    console.log('🚀 ~ user:', user)
    const [activeTab, setActiveTab] = useState(1)
    const [starRating, setStarRating] = useState(1)

    const personalInformation = [
        { label: 'full name', value: user?.name },
        { label: 'phone number', value: user?.phone },
        { label: 'email address', value: user?.email },
        { label: 'bvn', value: user?.bvn },
        { label: 'gender', value: user?.gender },
        { label: 'marital status', value: user?.marital_status },
        { label: 'children', value: user?.children },
        { label: 'type of residence', value: user?.residential_type },
    ]

    const educationAndEmployment = [
        { label: 'level of education', value: user?.educational_level },
        { label: 'employment status', value: user?.employment_status },
        { label: 'sector of employment', value: user?.employment_sector },
        { label: 'duration of employment', value: user?.employment_duration },
        { label: 'office email', value: user?.office_email },
        {
            label: 'monthly income',
            value: numberWithCommas(user?.monthly_income),
        },
        {
            label: 'loan repayment',
            value: numberWithCommas(user?.loan_repayment),
        },
    ]

    const socials = [
        { label: 'twitter', value: user?.twitter },
        { label: 'facebook', value: user?.facebook },
        { label: 'instagram', value: user?.instagram },
    ]

    const guarantor = [
        { label: 'full name', value: user?.guarantor?.[0].name },
        { label: 'email address', value: user?.guarantor?.[0].email },
        { label: 'relationship', value: user?.guarantor?.[0].relationship },
    ]

    useEffect(() => {
        dispatch(userActions.getAllUsers())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        dispatch(userActions.retrieveAllUsers())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    const handleGoBack = () => {
        navigate('/users')
    }

    const handleStarClick = (rating: number) => {
        setStarRating(rating)
    }

    return (
        <>
            <PageWrapper>
                <div className="users user__details">
                    <div
                        onClick={handleGoBack}
                        className="back__to__prev__page"
                    >
                        <ArrowBackIcon />
                        <span className="ms-2">Back to Users</span>
                    </div>
                    <div className="w-100 mb-4 d-flex flex-wrap align-items-center justify-content-between">
                        <h4 className="pb-0 title">User Details</h4>
                        <div className="py-3 d-flex align-items-center">
                            <button className="blacklist__user">
                                blacklist user
                            </button>
                            <button className="ms-3 activate__user">
                                activate user
                            </button>
                        </div>
                    </div>

                    <div className="w-100 details mb-4">
                        <div className="p-4 pb-5 d-flex flex-wrap align-items-center">
                            <div className="image">
                                <img
                                    src={NewAvatarIcon}
                                    alt="..."
                                    className="h-100 w-100"
                                />
                                <AvatarIcon />
                            </div>
                            <div className="name mx-3 mt-sm-0">
                                <h4 className="">{user?.name}</h4>
                                <span className="">{id}</span>
                            </div>
                            <div className="user__tier mt-md-0 mt-4 text-center">
                                <p className="">user&apos;s tier</p>
                                <StarRating
                                    unit="full"
                                    size={18}
                                    count={3}
                                    initialRating={starRating}
                                    activeColor="#E9B200"
                                    hoverColor="#E9B200"
                                    emptyColor="#E9B20056"
                                    roundedCorner={true}
                                    handleOnClick={handleStarClick}
                                    innerRadius={20}
                                    outerRadius={45}
                                    // isReadOnly={true}
                                    starClassName="mx-1 each-star"
                                    containerClassName=""
                                />
                            </div>
                            <div className="bank__details mx-3 mt-lg-0 mt-4">
                                <h4 className="">{user?.balance}</h4>
                                <small className="account__details">
                                    {user?.account_number}
                                    <span className="ms-2">{user?.bank}</span>
                                </small>
                            </div>
                        </div>

                        <ul className="d-flex align-items-center justify-content-around">
                            {tabLists?.map((list, i) => (
                                <li
                                    key={i}
                                    onClick={() =>
                                        setActiveTab(list.tab_number)
                                    }
                                    className={classNames('text-nowrap', {
                                        active: activeTab === list.tab_number,
                                    })}
                                >
                                    {list.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {activeTab === 1 && (
                        <>
                            <div className="complete__details px-4 w-100">
                                <div className="personal__information py-4">
                                    <h5 className="">Personal Information</h5>
                                    <div className="row flex-wrap">
                                        {personalInformation?.map((info, i) => (
                                            <div className="col-12 col-md-6 col-lg-3">
                                                <div
                                                    key={i}
                                                    className="my-3 me-5 pe-2"
                                                >
                                                    <p className="pb-2">
                                                        {info?.label}
                                                    </p>
                                                    <h6
                                                        className="col-12 text-truncate"
                                                        title={info?.value}
                                                    >
                                                        {capitalizeFirstLetter(
                                                            info?.value
                                                        )}
                                                    </h6>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="personal__information py-4">
                                    <h5 className="">
                                        Education and Employment
                                    </h5>
                                    <div className="row flex-wrap">
                                        {educationAndEmployment?.map(
                                            (edu, i) => (
                                                <div className="col-12 col-md-6 col-lg-3">
                                                    <div
                                                        key={i}
                                                        className="my-3 me-5 pe-4"
                                                    >
                                                        <p className="pb-2">
                                                            {edu?.label}
                                                        </p>
                                                        <h6
                                                            title={edu?.value}
                                                            className="col-12 text-truncate"
                                                        >
                                                            {capitalizeFirstLetter(
                                                                edu?.value
                                                            )}
                                                        </h6>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="personal__information py-4">
                                    <h5 className="">Socials</h5>
                                    <div className="row flex-wrap">
                                        {socials?.map((social, i) => (
                                            <div className="col-12 col-md-6 col-lg-3">
                                                <div
                                                    key={i}
                                                    className="my-3 me-5 pe-4"
                                                >
                                                    <p className="pb-2">
                                                        {social?.label}
                                                    </p>
                                                    <h6
                                                        className=""
                                                        title={social?.value}
                                                    >
                                                        {social?.value}
                                                    </h6>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="personal__information py-4">
                                    <h5 className="">Guarantor</h5>
                                    <div className="row flex-wrap">
                                        {guarantor?.map((gua, i) => (
                                            <div className="col-12 col-md-6 col-lg-3">
                                                <div
                                                    key={i}
                                                    className="my-3 me-5 pe-4"
                                                >
                                                    <p className="pb-2">
                                                        {gua?.label}
                                                    </p>
                                                    <h6
                                                        title={gua?.value}
                                                        className="col-12 text-truncate"
                                                    >
                                                        {gua?.value}
                                                    </h6>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 2 && (
                        <div className="p-4 details">documents</div>
                    )}
                    {activeTab === 3 && (
                        <div className="p-4 details">bank details</div>
                    )}
                    {activeTab === 4 && (
                        <div className="p-4 details">loans</div>
                    )}
                    {activeTab === 5 && (
                        <div className="p-4 details">savings</div>
                    )}
                    {activeTab === 6 && (
                        <div className="p-4 details">app and system</div>
                    )}
                </div>
            </PageWrapper>
        </>
    )
}

export default UserDetail
