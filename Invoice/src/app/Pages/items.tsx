// 'use client'
// import { IconAdjustments, IconDots, IconArrowsCross, IconTrash } from '@tabler/icons-react'
// import React, { useState } from 'react'
// import { StoredItem } from './types/invoice';

// const Items = () => {
//     const [selectedOption, setSelectedOption] = React.useState('all')
//     const [isProfileOpen, setIsProfileOpen] = useState(false);
//     const [items, setItems] = useState<StoredItem[]>([]);
//     const [newItemName, setNewItemName] = useState('');
//     const [newItemDescription, setNewItemDescription] = useState('');
//     const [newItemRate, setNewItemRate] = useState('');
//     const [newItemUsageUnit, setNewItemUsageUnit] = useState('');


//     const options = [
//         { value: 'all', label: 'All Items' },
//         { value: 'products', label: 'Products' },
//         { value: 'services', label: 'Services' }
//     ]
//     const formsubmition = (e: any) => {
//         e.preventDefault();
//         const newItem: StoredItem = {
//             name: newItemName,
//             description: newItemDescription,
//             rate: newItemRate,
//             usageUnit: newItemUsageUnit,
//         };
//         setItems([...items, newItem]);
//         setNewItemName('');
//         setNewItemDescription('');
//         setNewItemRate('');
//         setNewItemUsageUnit('');
//         setIsProfileOpen(false);
//     };
//     return (
//         <>
//             <div className="p-1 w-full bg-neutral-900">
//                 <div className="flex justify-between items-center mb-1">
//                     <div className="flex items-center gap-4">
//                         <select
//                             value={selectedOption}
//                             onChange={(e) => setSelectedOption(e.target.value)}
//                             className="px-4 py-2 bg-neutral-800 border border-gray-700 outline-none text-[12px] rounded-md text-white"
//                         >
//                             {options.map((option) => (
//                                 <option key={option.value} value={option.value} className='text-white'>
//                                     {option.label}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className='flex items-center justify-start gap-1'>
//                         <button
//                             onClick={() => setIsProfileOpen(!isProfileOpen)}
//                             className="bg-blue-500 hover:bg-blue-600 text-white p-1 px-2 text-[12px] rounded-md">
//                             + New
//                         </button>
//                         <button>
//                             <IconDots className="h-4 w-4 shrink-0 text-white rotate-90" />
//                         </button>
//                     </div>
//                 </div>
//                 <div className="bg-neutral-800 rounded-lg shadow">
//                     <table className="min-w-full">
//                         <thead className=''>
//                             <div className="border-t h-8 bg-neutral-700 border-b border-gray-700 flex justify-between gap-10 items-center" >
//                                 <div className=' w-1/2 flex justify-start gap-1 px-5'>
//                                     <div className='flex items-center  w-1/2 justify-start gap-2'>
//                                         <IconAdjustments className="h-4 w-4 shrink-0 text-white" />
//                                         <input type="checkbox" name="" id="" className="accent-white" />
//                                         <th className="text-left text-md text-white">NAME </th>
//                                     </div>
//                                     <th className="text-left w-1/2  text-md text-white">DESCRIPTION</th>
//                                 </div>
//                                 <div className='w-1/2 flex justify-between items-center gap-5 px-5'>
//                                     <div className='flex justify-center gap-5'>
//                                         <th className="text-left text-md text-white">RATE</th>
//                                         <th className="text-left text-md text-white">USAGE UNIT</th>
//                                     </div>
//                                     <div className=''>
//                                         <input
//                                             type="text"
//                                             placeholder="Search items..."
//                                             className="w-40 outline-none bg-neutral-800 border border-gray-700  px-2 py-1 text-md text-white placeholder-gray-400"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                             {items.map((item, index) => (
//                                 <div key={index} className="border-t h-8 bg-neutral-700 border-b border-gray-700 flex justify-between gap-10 items-center" >
//                                     <div className=' w-1/2 flex justify-start gap-1 px-5'>
//                                         <div className='flex items-center w-1/2 justify-start gap-2'>
//                                             <IconTrash className="h-4 w-4 shrink-0 text-white " />
//                                             <input type="checkbox" name="" id="" className="accent-white" />
//                                             <p className="text-left text-md text-white">{item.name}</p>
//                                         </div>
//                                         <p className="text-left w-1/2  text-md text-white">{item.description}</p>
//                                     </div>
//                                     <div className='w-1/2 flex justify-between items-center gap-5 px-5'>
//                                         <div className='flex justify-center gap-5'>
//                                             <p className="text-left text-md text-white">{item.rate}</p>
//                                             <p className="text-left text-md text-white">{item.usageUnit}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </thead>
//                     </table>
//                 </div>
//             </div>
//             {isProfileOpen && (
//                 <div className={`w-full min-h-screen bg-black/90 text-white absolute  top-0  items-center justify-center `} >
//                     <div
//                         onClick={() => setIsProfileOpen(!isProfileOpen)}
//                         className={`w-10 h-10 right-20 cursor-pointer absolute top-0 p-3 `}>
//                         <IconArrowsCross className="h-4 w-4 shrink-0 text-white" />
//                     </div>
//                     <div className='w-4/12 min-h-[40rem] mx-auto mt-32  p-5 '>
//                         <h1 className='text-center font-bold text-2xl'>Add Item</h1>
//                         <form className='w-full' onSubmit={formsubmition} >
//                             <div className='flex flex-wrap justify-between p-5 items-start'>
//                                 <label className='text-center'>Item Name</label>
//                                 <input
//                                     type="text"
//                                     placeholder='dresses/apple/cloths..'
//                                     className='bg-gray-500 text-center rounded px-5 py-1'
//                                     value={newItemName}
//                                     onChange={(e) => setNewItemName(e.target.value)}
//                                 />
//                             </div>
//                             <div className='flex flex-wrap justify-between p-5 items-start'>
//                                 <label className='text-center'>Description</label>
//                                 <textarea
//                                     placeholder='about the item'
//                                     className='bg-gray-500 w-56 text-center rounded px-5 py-1'
//                                     value={newItemDescription}
//                                     onChange={(e) => setNewItemDescription(e.target.value)}
//                                 />
//                             </div>
//                             <div className='flex flex-wrap justify-between p-5 items-start'>
//                                 <label className='text-center'>Rate (INR)</label>
//                                 <input
//                                     type="number"
//                                     placeholder='1000/-'
//                                     className='bg-gray-500 text-center rounded px-5 py-1'
//                                     value={newItemRate}
//                                     onChange={(e) => setNewItemRate(e.target.value)}
//                                 />
//                             </div>
//                             <div className='flex flex-wrap justify-between p-5 items-start'>
//                                 <label className='text-center'>Usage Unit</label>
//                                 <input
//                                     type="text"
//                                     placeholder='1box/10kg...'
//                                     className='bg-gray-500 text-center rounded px-5 py-1'
//                                     value={newItemUsageUnit}
//                                     onChange={(e) => setNewItemUsageUnit(e.target.value)}
//                                 />
//                             </div>
//                             <div className='flex flex-wrap justify-between p-5 items-start'>
//                                 <button className='px-10 rounded-sm  mx-auto bg-blue-500 py-2'>Add Item</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </>
//     )
// }

// export default Items

'use client'
import { IconAdjustments, IconDots, IconArrowsCross, IconTrash, IconPencil, IconCheck, IconX } from '@tabler/icons-react'
import React, { useState, useEffect } from 'react'
import { StoredItem, ItemType } from './types/invoice';
import { v4 as uuidv4 } from 'uuid';

type SortOrder = 'asc' | 'desc';
type SortField = 'name' | 'rate' | 'createdAt';

const Items = () => {
    const [selectedOption, setSelectedOption] = React.useState('all')
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [items, setItems] = useState<StoredItem[]>([]);
    const [newItemName, setNewItemName] = useState('');
    const [newItemDescription, setNewItemDescription] = useState('');
    const [newItemRate, setNewItemRate] = useState('');
    const [newItemUsageUnit, setNewItemUsageUnit] = useState('');
    const [newItemType, setNewItemType] = useState<ItemType>('product'); // Default to 'product'
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]); // Track selected item IDs
    const [isBulkActionsOpen, setIsBulkActionsOpen] = useState(false); // For the options menu
    const [isSortOptionsOpen, setIsSortOptionsOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const [sortField, setSortField] = useState<SortField>('name');


    const options = [
        { value: 'all', label: 'All Items' },
        { value: 'products', label: 'Products' },
        { value: 'services', label: 'Services' }
    ]

    // Function to filter items based on selected option
    const filteredItems = React.useMemo(() => {
        let filtered = items;
        if (selectedOption === 'products') {
            filtered = items.filter(item => item.type === 'product');
        } else if (selectedOption === 'services') {
            filtered = items.filter(item => item.type === 'service');
        }

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply sorting
        filtered = [...filtered].sort((a, b) => {
            let comparison = 0;
            if (sortField === 'name') {
                comparison = a.name.localeCompare(b.name);
            } else if (sortField === 'rate') {
                comparison = Number(a.rate) - Number(b.rate);
            } else if (sortField === 'createdAt') {
                // Assuming createdAt is stored as a string in ISO format
                comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }

            return sortOrder === 'asc' ? comparison : comparison * -1;
        });

        return filtered;
    }, [items, selectedOption, searchTerm, sortOrder, sortField]);

    const formsubmition = (e: any) => {
        e.preventDefault();
        const newItem: StoredItem = {
            id: uuidv4(), // Generate a unique ID
            name: newItemName,
            description: newItemDescription,
            rate: newItemRate,
            usageUnit: newItemUsageUnit,
            type: newItemType,
            createdAt: new Date().toISOString(),
        };
        setItems([...items, newItem]);
        setNewItemName('');
        setNewItemDescription('');
        setNewItemRate('');
        setNewItemUsageUnit('');
        setNewItemType('product'); // Reset to default
        setIsProfileOpen(false);
    };

    const deleteItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
        setSelectedItemIds(selectedItemIds.filter(itemId => itemId !== id)); // Also remove from selected
    };

    const toggleSelectItem = (id: string) => {
        if (selectedItemIds.includes(id)) {
            setSelectedItemIds(selectedItemIds.filter(itemId => itemId !== id));
        } else {
            setSelectedItemIds([...selectedItemIds, id]);
        }
    };

    const deleteAllSelectedItems = () => {
        const newItems = items.filter(item => !selectedItemIds.includes(item.id));
        setItems(newItems);
        setSelectedItemIds([]);
    };

    // Function to toggle select all
    const toggleSelectAll = () => {
        if (selectedItemIds.length === filteredItems.length) {
            // If all are selected, deselect all
            setSelectedItemIds([]);
        } else {
            // Otherwise, select all filtered items
            setSelectedItemIds(filteredItems.map(item => item.id));
        }
    };

    // useEffect to update selectedItemIds when filteredItems change
    useEffect(() => {
        // Ensure that only IDs of currently filtered items are selected
        setSelectedItemIds(prevSelected => prevSelected.filter(id => filteredItems.find(item => item.id === id)));
    }, [filteredItems]);

    const closeBulkActions = (e: any) => {
        setIsBulkActionsOpen(!isBulkActionsOpen)
        e.preventDefault()
    }

    const toggleSortOptions = () => {
        setIsSortOptionsOpen(!isSortOptionsOpen);
    };

    const setSorting = (field: SortField) => {
        if (field === sortField) {
            // Toggle sort order if the same field is selected
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // Set new sort field and default to ascending order
            setSortField(field);
            setSortOrder('asc');
        }
        setIsSortOptionsOpen(false); // Close the sort options
    };

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
                        {selectedItemIds.length > 0 && (
                            <button
                                onClick={deleteAllSelectedItems}
                                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md"
                            >
                                Delete Selected Items
                            </button>
                        )}
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-1 px-2 text-[12px] rounded-md">
                            + New
                        </button>
                        <button onClick={() => setIsBulkActionsOpen(!isBulkActionsOpen)}>
                            <IconDots className="h-4 w-4 shrink-0 text-white rotate-90" />
                        </button>
                        {isBulkActionsOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-neutral-800 border border-gray-700 rounded-md shadow-lg z-10">
                                <div className="py-1">
                                    <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-blue-500 hover:text-white"
                                        onClick={closeBulkActions}>
                                        Action 1
                                    </a>
                                    <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-blue-500 hover:text-white"
                                        onClick={closeBulkActions}>
                                        Action 2
                                    </a>
                                    <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-blue-500 hover:text-white"
                                        onClick={closeBulkActions}>
                                        Action 3
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="bg-neutral-800 rounded-lg shadow">
                    <table className="min-w-full">
                        <thead className=''>
                            <div className="border-t h-8 bg-neutral-700 border-b border-gray-700 flex justify-between gap-10 items-center" >
                                <div className=' w-1/2 flex justify-start gap-1 px-5'>
                                    <div className='flex items-center  w-1/2 justify-start gap-2 relative'>
                                        <button onClick={toggleSortOptions} className="flex items-center">
                                            <IconAdjustments className="h-4 w-4 shrink-0 text-white" />
                                        </button>
                                        {isSortOptionsOpen && (
                                            <div className="absolute left-0 mt-2 w-48 bg-neutral-800 border border-gray-700 rounded-md shadow-lg z-10">
                                                <div className="py-1">
                                                    <a
                                                        href="#"
                                                        className={`block px-4 py-2 text-sm text-white hover:bg-blue-500 hover:text-white ${sortField === 'name' ? 'font-semibold' : ''}`}
                                                        onClick={() => setSorting('name')}
                                                    >
                                                        Name {sortField === 'name' && (sortOrder === 'asc' ? ' (A-Z)' : ' (Z-A)')}
                                                    </a>
                                                    <a
                                                        href="#"
                                                        className={`block px-4 py-2 text-sm text-white hover:bg-blue-500 hover:text-white ${sortField === 'createdAt' ? 'font-semibold' : ''}`}
                                                        onClick={() => setSorting('createdAt')}
                                                    >
                                                        Date {sortField === 'createdAt' && (sortOrder === 'asc' ? ' (Oldest)' : ' (Newest)')}
                                                    </a>
                                                    <a
                                                        href="#"
                                                        className={`block px-4 py-2 text-sm text-white hover:bg-blue-500 hover:text-white ${sortField === 'rate' ? 'font-semibold' : ''}`}
                                                        onClick={() => setSorting('rate')}
                                                    >
                                                        Rate {sortField === 'rate' && (sortOrder === 'asc' ? ' (Low to High)' : ' (High to Low)')}
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                        <input
                                            type="checkbox"
                                            checked={selectedItemIds.length === filteredItems.length && filteredItems.length > 0}
                                            onChange={toggleSelectAll}
                                            className="accent-white"
                                        />
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
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            {filteredItems.map((item, index) => (
                                <div key={index} className="border-t h-8 bg-neutral-700 border-b border-gray-700 flex justify-between gap-10 items-center" >
                                    <div className=' w-1/2 flex justify-start gap-1 px-5'>
                                        <div className='flex items-center w-1/2 justify-start gap-2'>
                                            <button onClick={() => deleteItem(item.id)}>
                                                <IconTrash className="h-4 w-4 shrink-0 text-white " />
                                            </button>
                                            <input
                                                type="checkbox"
                                                checked={selectedItemIds.includes(item.id)}
                                                onChange={() => toggleSelectItem(item.id)}
                                                className="accent-white"
                                            />
                                            <p className="text-left text-md text-white">{item.name}</p>
                                        </div>
                                        <p className="text-left w-1/2  text-md text-white">{item.description}</p>
                                    </div>
                                    <div className='w-1/2 flex justify-between items-center gap-5 px-5'>
                                        <div className='flex justify-center gap-5'>
                                            <p className="text-left text-md text-white">{item.rate}</p>
                                            <p className="text-left text-md text-white">{item.usageUnit}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                        <form className='w-full' onSubmit={formsubmition} >
                            <div className='flex flex-wrap justify-between p-5 items-start'>
                                <label className='text-center'>Item Name</label>
                                <input
                                    type="text"
                                    placeholder='dresses/apple/cloths..'
                                    className='bg-gray-500 text-center rounded px-5 py-1'
                                    value={newItemName}
                                    onChange={(e) => setNewItemName(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-wrap justify-between p-5 items-start'>
                                <label className='text-center'>Description</label>
                                <textarea
                                    placeholder='about the item'
                                    className='bg-gray-500 w-56 text-center rounded px-5 py-1'
                                    value={newItemDescription}
                                    onChange={(e) => setNewItemDescription(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-wrap justify-between p-5 items-start'>
                                <label className='text-center'>Rate (INR)</label>
                                <input
                                    type="number"
                                    placeholder='1000/-'
                                    className='bg-gray-500 text-center rounded px-5 py-1'
                                    value={newItemRate}
                                    onChange={(e) => setNewItemRate(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-wrap justify-between p-5 items-start'>
                                <label className='text-center'>Usage Unit</label>
                                <input
                                    type="text"
                                    placeholder='1box/10kg...'
                                    className='bg-gray-500 text-center rounded px-5 py-1'
                                    value={newItemUsageUnit}
                                    onChange={(e) => setNewItemUsageUnit(e.target.value)}
                                />
                            </div>
                            {/* Add the type selection */}
                            <div className="flex flex-wrap justify-between p-5 items-start">
                                <label className="text-center">Item Type</label>
                                <select
                                    value={newItemType}
                                    onChange={(e) => setNewItemType(e.target.value as ItemType)}
                                    className="bg-gray-500 text-center rounded px-5 py-1"
                                >
                                    <option value="product">Product</option>
                                    <option value="service">Service</option>
                                </select>
                            </div>
                            <div className='flex flex-wrap justify-between p-5 items-start'>
                                <button className='px-10 rounded-sm  mx-auto bg-blue-500 py-2'>Add Item</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default Items