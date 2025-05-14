import React from 'react'
import { useInvoice } from '@/app/Pages/context/InvoiceContext'
import InvoiceFormSection from './InvoiceFormSection'
import InvoiceItemsTable from '@/app/Pages/components/InvoiceItemsTable' 
import { motion } from 'framer-motion'

function InvoiceForm() {
  const { 
    invoiceData, 
    updateField, 
    updateTaxRate 
  } = useInvoice()
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-medium text-gray-800 mb-6">Challan Details</h2>
      
      {/* Business Information */}
      <InvoiceFormSection title="Business Information">
        <div className="grid grid-cols-1 gap-4">
          <div className='flex items-center justify-start gap-1'>
            <label htmlFor="businessName" className="form-label w-1/3">Business Name</label>
            <input
              type="text"
              id="businessName"
              className="form-input w-2/3 bg-gray-200 text-center"
              value={invoiceData.businessName}
              onChange={(e) => updateField('businessName', e.target.value)}
            />
          </div>
          
          <div className='flex items-center justify-start gap-1'>
            <label htmlFor="businessAddress" className="form-label w-1/3">Business Address</label>
            <textarea
              id="businessAddress"
              className="form-input w-2/3 bg-gray-200 text-start p-1"
              rows="3"
              value={invoiceData.businessAddress}
              onChange={(e) => updateField('businessAddress', e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className='flex gap-1'>
              <label htmlFor="businessPhone" className="form-label w-1/3">Business Phone</label>
              <input
                type="text"
                id="businessPhone"
                className="form-input w-2/3 bg-gray-200 text-center"
                value={invoiceData.businessPhone}
                onChange={(e) => updateField('businessPhone', e.target.value)}
              />
            </div>
            
            <div className='flex gap-1'>
              <label htmlFor="businessEmail" className="form-label w-1/3">Business Email</label>
              <input
                type="email"
                id="businessEmail"
                className="form-input w-2/3 bg-gray-200 text-center"
                value={invoiceData.businessEmail}
                onChange={(e) => updateField('businessEmail', e.target.value)}
              />
            </div>
          </div>
        </div>
      </InvoiceFormSection>
      
      {/* Invoice Details */}
      <InvoiceFormSection title="Challan Details">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className=''>
            <label htmlFor="invoiceNumber" className="form-label w-1/3">Challan Number</label>
            <input
              type="text"
              id="invoiceNumber"
              className="form-input w-2/3 bg-gray-200 text-center"
              value={invoiceData.invoiceNumber}
              onChange={(e) => updateField('invoiceNumber', e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="invoiceDate" className="form-label">Challan Date</label>
            <input
              type="date"
              id="invoiceDate"
              className="form-input bg-gray-200"
              value={invoiceData.invoiceDate}
              onChange={(e) => updateField('invoiceDate', e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="dueDate" className="form-label">Due Date</label>
            <input
              type="date"
              id="dueDate"
              className="form-input bg-gray-200"
              value={invoiceData.dueDate}
              onChange={(e) => updateField('dueDate', e.target.value)}
            />
          </div>
        </div>
      </InvoiceFormSection>
      
      {/* Client Information */}
      <InvoiceFormSection title="Client Information">
        <div className="grid grid-cols-1 gap-4">
          <div className='flex gap-1'>
            <label htmlFor="clientName" className="form-label w-1/3">Client Name</label>
            <input
              type="text"
              id="clientName"
              className="form-input w-2/3 bg-gray-200 text-center"
              value={invoiceData.clientName}
              onChange={(e) => updateField('clientName', e.target.value)}
              required
            />
          </div>
          
          <div className='flex gap-1'>
            <label htmlFor="clientAddress" className="form-label w-1/3">Client Address</label>
            <textarea
              id="clientAddress"
              className="form-input w-2/3 bg-gray-200 text-start p-1"
              rows="2"
              value={invoiceData.clientAddress}
              onChange={(e) => updateField('clientAddress', e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className='flex gap-1'>
              <label htmlFor="clientPhone" className="form-label w-1/3">Client Phone</label>
              <input
                type="text"
                id="clientPhone"
                className="form-input w-2/3 bg-gray-200 text-center"
                value={invoiceData.clientPhone}
                onChange={(e) => updateField('clientPhone', e.target.value)}
              />
            </div>
            
            <div className='flex gap-1'>
              <label htmlFor="clientEmail" className="form-label w-1/3">Client Email</label>
              <input
                type="email"
                id="clientEmail"
                className="form-input w-2/3 bg-gray-200 text-center"
                value={invoiceData.clientEmail}
                onChange={(e) => updateField('clientEmail', e.target.value)}
              />
            </div>
          </div>
        </div>
      </InvoiceFormSection>
      
      {/* Items */}
      <InvoiceFormSection title="Items">
        <InvoiceItemsTable />
      </InvoiceFormSection>
      
      {/* Tax and Notes */}
      <InvoiceFormSection title="Additional Information">
        <div className="grid grid-cols-1 gap-4">
          <div className='flex gap-1'>
            <label htmlFor="taxRate" className="form-label w-1/3">Tax Rate (%)</label>
            <input
              type="number"
              id="taxRate"
              className="form-input w-2/3 bg-gray-200 text-center"
              value={invoiceData.taxRate}
              onChange={(e) => updateTaxRate(parseFloat(e.target.value) || 0)}
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          
          <div className='flex gap-1'>
            <label htmlFor="notes" className="form-label w-1/3">Notes</label>
            <textarea
              id="notes"
              className="form-input w-2/3 bg-gray-200 text-center"
              rows="2"
              value={invoiceData.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              placeholder="Any additional notes for the client..."
            />
          </div>
          
          <div className='flex gap-1'>
            <label htmlFor="terms" className="form-label w-1/3">Terms & Conditions</label>
            <textarea
              id="terms"
              className="form-input w-2/3 bg-gray-200 text-center"
              rows="2"
              value={invoiceData.terms}
              onChange={(e) => updateField('terms', e.target.value)}
            />
          </div>
        </div>
      </InvoiceFormSection>
    </motion.div>
  )
}

export default InvoiceForm