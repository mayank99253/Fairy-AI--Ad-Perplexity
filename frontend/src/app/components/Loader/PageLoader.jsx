import React from 'react'
import {Mosaic} from 'react-loading-indicators'
const PageLoader = () => {
    return (
        <div className='h-dvh w-dvw flex justify-center items-center flex-col text-white bg-black'>
            <Mosaic color="#ffffff" size="medium" textColor="#000000" />
            <div className='flex gap-2'>
                <h1 className='text-xs font-bold'>PROCESSING...</h1>
            </div>
        </div>
    )
}

export default PageLoader