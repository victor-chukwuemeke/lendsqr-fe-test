import React from 'react'
import './index.scss'
import { ReactComponent as Search } from '../../../_assets/icons/L_search_icon.svg'

const Searchbar: React.FC = () => {
    return (
        <div className="search-bar d-none d-lg-flex">
            <form className="search-form d-flex align-items-center">
                <input
                    type="text"
                    name="query"
                    placeholder="Search for anything"
                    title="Enter search keyword"
                />
                <button type="submit" title="Search" className="search-button">
                    <Search />
                </button>
            </form>
        </div>
    )
}

export default Searchbar
