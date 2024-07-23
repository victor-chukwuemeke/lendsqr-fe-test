import React from 'react'
import './index.scss'
import { ReactComponent as Prev } from '../../_assets/icons/prev_btn.svg'
import { ReactComponent as Next } from '../../_assets/icons/next_btn.svg'

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1)
        }
    }

    const handlePageClick = (page: number) => {
        onPageChange(page)
    }

    const renderPageNumbers = () => {
        const pageNumbers = []
        const pageRange = 3
        const startPage = Math.max(1, currentPage - pageRange)
        const endPage = Math.min(totalPages, currentPage + pageRange)

        if (startPage > 1) {
            pageNumbers.push(
                <button
                    key={1}
                    onClick={() => handlePageClick(1)}
                    className={currentPage === 1 ? 'active' : 'regular'}
                >
                    1
                </button>
            )
            if (startPage > 2) {
                pageNumbers.push(<span key="start-ellipsis">...</span>)
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={
                        currentPage === i ? 'active px-2' : 'regular px-2'
                    }
                >
                    {i}
                </button>
            )
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push(<span key="end-ellipsis">...</span>)
            }
            pageNumbers.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageClick(totalPages)}
                    className={
                        currentPage === totalPages
                            ? 'active mx-2'
                            : 'regular mx-2'
                    }
                >
                    {totalPages}
                </button>
            )
        }

        return pageNumbers
    }

    return (
        <div className="pagination">
            <button onClick={handlePrevious} disabled={currentPage === 1}>
                <Prev />
            </button>
            {renderPageNumbers()}
            <button onClick={handleNext} disabled={currentPage === totalPages}>
                <Next />
            </button>
        </div>
    )
}

export default Pagination
