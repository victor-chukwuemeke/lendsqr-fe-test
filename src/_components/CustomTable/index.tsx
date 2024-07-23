import React from 'react'
import Formsy from 'formsy-react'
import { TextInput } from '../CustomInput'
import { ReactComponent as SearchIcon } from '../../_assets/icons/search__icon.svg'
import { ReactComponent as FilterIcon } from '../../_assets/icons/filterIcon.svg'
import Pagination from '../Pagination'

// Define the props interface
interface CustomTableProps {
    children: React.ReactNode
}

const CustomTable: React.FC<CustomTableProps> = (props) => {
    return (
        <div className="custom-table scroll pb-0 px-0">
            <div className="table-values w-100">
                <div className="bar p-4">
                    <div className="search-form d-flex align-items-center">
                        <Formsy className="search">
                            <TextInput
                                type="text"
                                name="search"
                                placeholder="Search"
                                className=""
                                autoComplete="on"
                                leftIcon={
                                    <button type="submit" className="icon-wrap">
                                        <SearchIcon />
                                    </button>
                                }
                            />
                        </Formsy>
                        <div className="filter px-3">
                            <FilterIcon />
                            <span className="ms-2">Filters</span>
                        </div>
                    </div>
                    <button className="dwnld me-3">Download CSV</button>
                </div>
                {props.children}
            </div>
            {/* <Pagination
                from={0}
                count={0}
                to={0}
                page={0}
                lastPage={0}
                rowsPerPage={0}
                onChangePage={function (
                    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
                    newPage: number
                ): void {
                    throw new Error('Function not implemented.')
                }}
            /> */}
        </div>
    )
}

export default CustomTable
