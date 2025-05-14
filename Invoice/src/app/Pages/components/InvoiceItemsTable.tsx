import React from 'react'
import { useInvoice } from '@/app/Pages/context/InvoiceContext'
import { motion } from 'framer-motion'


function InvoiceItemsTable() {
  const { invoiceData, updateItem, addItem, removeItem } = useInvoice()
  
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Qty
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoiceData.items.map((item, index) => (
              <motion.tr 
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <td className="px-4 py-2">
                  <input
                    type="text"
                    className="form-input py-1"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    placeholder="Item description"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    className="form-input py-1 w-20"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                    min="1"
                    step="1"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    className="form-input py-1 w-28"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.01"
                  />
                </td>
                <td className="px-4 py-2 text-gray-800 font-medium">
                  {(item.amount).toFixed(2)}
                </td>
                <td className="px-4 py-2">
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-900 transition-colors"
                    onClick={() => removeItem(item.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          className="btn btn-primary"
          onClick={addItem}
        >
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Item
          </span>
        </motion.button>
        
        <div className="space-y-2 text-right">
          <p className="text-gray-700">
            Subtotal: <span className="font-medium">{invoiceData.subtotal.toFixed(2)}</span>
          </p>
          <p className="text-gray-700">
            Tax ({invoiceData.taxRate}%): <span className="font-medium">{invoiceData.taxAmount.toFixed(2)}</span>
          </p>
          <p className="text-gray-800 text-lg font-medium">
            Total: <span>{invoiceData.total.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default InvoiceItemsTable