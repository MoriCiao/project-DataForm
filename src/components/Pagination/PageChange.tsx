import React from 'react'
import Button from '../Button/Button'

export default function PageChange({
    goToPrevPage,
    currentPage,
    totalPages,
    goToNextPage}) {
    return (
        <div className='flex gap-4 '>
            <Button type="button" label="Prev" onClick={goToPrevPage} />
            
            <span>
            {currentPage} page / {totalPages} pages
            </span>
            <Button type="button" label="Next" onClick={goToNextPage} />
        </div>
    )
}
