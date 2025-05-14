import React from 'react'
import { motion } from 'framer-motion'

function InvoiceFormSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
    >
      <h3 className="section-title border-b border-gray-200 pb-2">{title}</h3>
      <div className="mt-4">
        {children}
      </div>
    </motion.section>
  )
}

export default InvoiceFormSection