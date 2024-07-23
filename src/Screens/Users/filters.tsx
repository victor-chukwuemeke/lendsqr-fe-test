import React, { useCallback, useRef, useState } from 'react'
import Select from 'react-dropdown-select'
import { ReactComponent as DateIcon } from '../../_assets/icons/np_calendar_2080577_000000 1.svg'

const Filters: React.FC = () => {
    const [dateFilter, setDateFilter] = useState(false)
    const [date, setDate] = useState('')
    const DateValueRef = useRef()

    const dateRef = useRef()
    const handleDateChange = useCallback((evt: { target: { value: any } }) => {
        const date = evt.target.value
        dateRef.current = date
        setDate(date)

        if (date && DateValueRef.current) {
            setDateFilter(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="">
            <>
                <div className="position-absolute filters visibility mx-3 ms-auto">
                    <div>
                        <label>Organization</label>
                        <Select
                            className="input"
                            placeholder="Select"
                            values={[]}
                            options={[]}
                            onChange={function (value: {}[]): void {
                                throw new Error('Function not implemented.')
                            }}
                        />
                    </div>
                    <div className="my-3">
                        <label>Username</label>
                        <form className="form d-flex align-items-center">
                            <input
                                type="text"
                                name="name"
                                value=""
                                placeholder="user"
                                title="Enter email"
                                className="w-100"
                            />
                        </form>
                    </div>
                    <div className="">
                        <label>Email</label>
                        <form className="form d-flex align-items-center">
                            <input
                                type="email"
                                name="name"
                                value=""
                                placeholder="Email"
                                title="Enter email"
                                className="w-100"
                            />
                        </form>
                    </div>

                    <div className="date my-3 align-items-center">
                        <label>date</label>
                        <div className="position-relative w-100">
                            <input
                                type="date"
                                name="start-date"
                                onChange={handleDateChange}
                                className="input-time w-100"
                                placeholder="Date"
                            />
                            <div className="date_icon">
                                <DateIcon className="" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label>phone number</label>
                        <form className="form d-flex align-items-center w-100">
                            <input
                                type="text"
                                name="name"
                                value=""
                                placeholder="Phone Number"
                                title="Enter Number"
                                className="w-100"
                            />
                        </form>
                    </div>
                    <div className="mt-3">
                        <label>Status</label>
                        <Select
                            className="input"
                            placeholder="Select"
                            values={[]}
                            options={[]}
                            onChange={function (value: {}[]): void {
                                throw new Error('Function not implemented.')
                            }}
                        />
                    </div>
                    <div className="button w-100 mt-3">
                        <button className="reset">Reset</button>
                        <button className="filter_button">Filter</button>
                    </div>
                </div>
            </>
        </div>
    )
}

export default Filters
