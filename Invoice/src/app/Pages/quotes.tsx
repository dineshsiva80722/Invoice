'use client'
import React from 'react'
import { IconDots } from '@tabler/icons-react'

const quotes = () => {

    const [selectedOption, setSelectedOption] = React.useState('all')
    const options = [
        { value: 'all', label: 'All Quotes' },
        { value: 'draft', label: 'Draft' },
        { value: 'sent', label: 'Sent' },
        { value: 'accepted', label: 'Accepted' },
        { value: 'rejected', label: 'Rejected' }
    ]
    return (
        <div className="p-1 w-full bg-neutral-900">
            <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-4">
                    <select
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className="px-4 py-2 bg-neutral-800 border border-gray-700 outline-none text-[12px] rounded-md text-white"
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value} className='text-white'>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {/* <h1 className="text-xl font-semibold">All Items</h1> */}
                </div>
                <div className='flex items-center justify-start gap-1'>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white  p-1 px-2 text-[12px] rounded-md">
                        + New
                    </button>
                    <button>
                        <IconDots className="h-4 w-4 shrink-0 text-white rotate-90" />
                    </button>
                </div>
            </div>
            <hr />
            <div className='min-h-[80vh]  w-full  relative'>
                <div className='absolute bottom-0 h-[20rem] w-full '>
                    <div className='flex-col items-center justify-cneter text-center space-y-3' >
                        <h1 className='text-2xl text-white'>Seal the deal</h1>
                        <p className='text-gray-500 text-sm'> with quotes, give your customers an offer they can't refuse!</p>
                        <button className='px-5 py-2 text-sm text-white  bg-blue-500 rounded-sm uppercase'>
                            Create new quotes
                        </button>
                        <h1 className='text-sky-500 text-sm'>import Quotes</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default quotes