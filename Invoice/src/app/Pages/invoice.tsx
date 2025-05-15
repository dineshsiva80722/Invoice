'use client'
import React from 'react'
import InvoiceForm from '@/app/Pages/components/InvoiceFrom'
import InvoicePreview from '@/app/Pages/components/InvoicePreview'
import Header from '@/app/Pages/components/Header'
import { InvoiceProvider } from '@/app/Pages/context/InvoiceContext'

const  invoice = () => {
    return (
        <InvoiceProvider>
            <section className="p-4 w-full bg-neutral-900 min-h-screen">
                <div className="min-h-screen bg-gray-50">
                    <Header />
                    <main className="p-1 w-full">
                        <div className="w-full h-full bg-gray-100 flex flex-col md:flex-row justify-center items-stretch shadow-lg rounded-lg overflow-hidden">
                            <div className="w-full md:w-1/2 bg-white p-6 md:p-8 overflow-y-auto max-h-[90vh]">
                                <InvoiceForm />
                            </div>
                            <div className="w-full md:w-1/2 bg-gray-50 p-6 md:p-8 flex items-start justify-center overflow-y-auto max-h-[90vh]">
                                <InvoicePreview />
                            </div>
                        </div>
                    </main>
                </div>
            </section>
        </InvoiceProvider>
    )
}
export default invoice