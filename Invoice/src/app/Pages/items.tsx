'use client'
import { IconAdjustments, IconDots, IconArrowsCross,IconTrash} from '@tabler/icons-react'
import { count } from 'console'
import React, { useState } from 'react'

const Items = () => {
    const [selectedOption, setSelectedOption] = React.useState('all')
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const options = [
        { value: 'all', label: 'All Items' },
        { value: 'products', label: 'Products' },
        { value: 'services', label: 'Services' }
    ]
    const formsubmition=()=>{
        alert('from submited')
        
    }
    return (
        <>
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
                    </div>
                    <div className='flex items-center justify-start gap-1'>
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-1 px-2 text-[12px] rounded-md">
                            + New
                        </button>
                        <button>
                            <IconDots className="h-4 w-4 shrink-0 text-white rotate-90" />
                        </button>
                    </div>
                </div>
                <div className="bg-neutral-800 rounded-lg shadow">
                    <table className="min-w-full">
                        <thead className=''>
                            <div className="border-t h-8 bg-neutral-700 border-b border-gray-700 flex justify-between gap-10 items-center" >
                                <div className=' w-1/2 flex justify-start gap-1 px-5'>
                                    <div className='flex items-center  w-1/2 justify-start gap-2'>
                                        <IconAdjustments className="h-4 w-4 shrink-0 text-white" />
                                        <input type="checkbox" name="" id="" className="accent-white" />
                                        <th className="text-left text-md text-white">NAME </th>
                                    </div>
                                    <th className="text-left w-1/2  text-md text-white">DESCRIPTION</th>
                                </div>
                                <div className='w-1/2 flex justify-between items-center gap-5 px-5'>
                                    <div className='flex justify-center gap-5'>
                                        <th className="text-left text-md text-white">RATE</th>
                                        <th className="text-left text-md text-white">USAGE UNIT</th>
                                    </div>
                                    <div className=''>
                                        <input
                                            type="text"
                                            placeholder="Search items..."
                                            className="w-40 outline-none bg-neutral-800 border border-gray-700  px-2 py-1 text-md text-white placeholder-gray-400"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="border-t h-8 bg-neutral-700 border-b border-gray-700 flex justify-between gap-10 items-center" >
                                <div className=' w-1/2 flex justify-start gap-1 px-5'>
                                    <div className='flex items-center w-1/2 justify-start gap-2'>
                                        <IconTrash className="h-4 w-4 shrink-0 text-white " />
                                        <input type="checkbox" name="" id="" className="accent-white" />
                                        <p className="text-left text-md text-white">apple</p>
                                    </div>
                                    <p className="text-left w-1/2  text-md text-white">best quality apple from germany</p>
                                </div>
                                <div className='w-1/2 flex justify-between items-center gap-5 px-5'>
                                    <div className='flex justify-center gap-5'>
                                        <p className="text-left text-md text-white">200</p>
                                        <p className="text-left text-md text-white">10</p>
                                    </div>
                                </div>
                            </div>
                        </thead>
                    </table>
                </div>
            </div>
            {isProfileOpen && (
                <div className={`w-full min-h-screen bg-black/90 text-white absolute  top-0  items-center justify-center `} >
                    <div
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className={`w-10 h-10 right-20 cursor-pointer absolute top-0 p-3 `}>
                        <IconArrowsCross className="h-4 w-4 shrink-0 text-white" />
                    </div>
                    <div className='w-4/12 min-h-[40rem] mx-auto mt-32  p-5 '>
                        <h1 className='text-center font-bold text-2xl'>Add Item</h1>
                        <form className='w-full' action={formsubmition} >
                            <div className='flex flex-wrap justify-between p-5 items-start'>
                                <label className='text-center'>Item Name</label>
                                <input type="text" placeholder='dresses/apple/cloths..' className='bg-gray-500 text-center rounded px-5 py-1' />
                            </div>
                            <div className='flex flex-wrap justify-between p-5 items-start'>
                                <label className='text-center'>Description</label>
                                <textarea placeholder='about the item' className='bg-gray-500 w-56 text-center rounded px-5 py-1' />
                            </div>
                            <div className='flex flex-wrap justify-between p-5 items-start'>
                                <label className='text-center'>Rate (INR)</label>
                                <input type="number" placeholder='1000/-' className='bg-gray-500 text-center rounded px-5 py-1' />
                            </div>
                            <div className='flex flex-wrap justify-between p-5 items-start'>
                                <label className='text-center'>Usage Unit</label>
                                <input type="text" placeholder='1box/10kg...' className='bg-gray-500 text-center rounded px-5 py-1' />
                            </div>
                            <div className='flex flex-wrap justify-between p-5 items-start'>
                                <button  className='px-10 rounded-sm  mx-auto bg-blue-500 py-2'>Add Item</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default Items