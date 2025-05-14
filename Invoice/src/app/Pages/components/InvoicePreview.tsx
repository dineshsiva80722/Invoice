import React, { useRef } from 'react';
import { useInvoice } from '@/app/Pages/context/InvoiceContext'
import { useReactToPrint } from 'react-to-print';
import { motion } from 'framer-motion';
import { format, parse } from 'date-fns';

const InvoicePreview: React.FC = () => {
  const { invoiceData } = useInvoice();
  const invoiceRef = useRef<HTMLDivElement>(null);
  
const handlePrint = useReactToPrint({
  contentRef: invoiceRef,
  documentTitle: `Challan-${invoiceData.invoiceNumber}`,
});
  
  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    try {
      const date = parse(dateString, 'yyyy-MM-dd', new Date());
      return format(date, 'dd MMM yyyy');
    } catch (error) {
      return dateString;
    }
  };
  
  return (
    <div className="w-full max-w-[42rem]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-4 flex justify-end"
      >
        <button
          onClick={handlePrint}
          className="btn btn-primary flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
          </svg>
          Print / Save
        </button>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-invoice rounded-lg overflow-hidden"
      >
        <div
          ref={invoiceRef}
          className="p-8 min-h-[842px] w-full"
          style={{ maxWidth: '800px' }}
        >
          {/* Invoice Header */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-12 border-b border-gray-200 pb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">{invoiceData.businessName}</h1>
              <div className="invoice-preview-text whitespace-pre-line">
                {invoiceData.businessAddress}
              </div>
              <div className="text-gray-600 mt-2">
                {invoiceData.businessPhone && <div>{invoiceData.businessPhone}</div>}
                {invoiceData.businessEmail && <div>{invoiceData.businessEmail}</div>}
              </div>
            </div>
            
            <div className="mt-6 md:mt-0">
              <div className="text-2xl font-bold text-primary-600 mb-1">CHALLAN</div>
              <div className="text-gray-600">
                <div className="flex">
                  <span className="font-medium w-32">Challan Number:</span>
                  <span>{invoiceData.invoiceNumber}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-32">Challan Date:</span>
                  <span>{formatDate(invoiceData.invoiceDate)}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-32">Due Date:</span>
                  <span>{formatDate(invoiceData.dueDate)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Client Information */}
          <div className="mb-10">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Client Information</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="text-lg font-medium text-gray-800 mb-1">
                {invoiceData.clientName || 'Client Name'}
              </div>
              <div className="invoice-preview-text whitespace-pre-line">
                {invoiceData.clientAddress || 'Client Address'}
              </div>
              <div className="text-gray-600 mt-2">
                {invoiceData.clientPhone && <div>{invoiceData.clientPhone}</div>}
                {invoiceData.clientEmail && <div>{invoiceData.clientEmail}</div>}
              </div>
            </div>
          </div>
          
          {/* Invoice Items */}
          <div className="mb-10">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Challan Items</h2>
            
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoiceData.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item.description || 'Item description'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-right">
                        {item.unitPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-right">
                        {item.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Invoice Totals */}
          <div className="flex justify-end mb-10">
            <div className="w-64 space-y-2">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-700">Subtotal:</span>
                <span>{invoiceData.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-700">Tax ({invoiceData.taxRate}%):</span>
                <span>{invoiceData.taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="font-bold text-gray-800 text-lg">Total:</span>
                <span className="font-bold text-gray-800 text-lg">{invoiceData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Notes and Terms */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            {invoiceData.notes && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Notes</h3>
                <p className="text-sm text-gray-600 whitespace-pre-line">{invoiceData.notes}</p>
              </div>
            )}
            
            {invoiceData.terms && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Terms & Conditions</h3>
                <p className="text-sm text-gray-600 whitespace-pre-line">{invoiceData.terms}</p>
              </div>
            )}
          </div>
          
          {/* Thank you message */}
          <div className="mt-10 text-center text-gray-500 text-sm">
            Thank you for your business!
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InvoicePreview;