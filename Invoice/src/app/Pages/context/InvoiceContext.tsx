import React, { createContext, useState, useContext, ReactNode } from 'react';
import { format } from 'date-fns';
import { InvoiceData, InvoiceContextType } from '@/app/Pages/types/invoice';

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export function useInvoice(): InvoiceContextType {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoice must be used within an InvoiceProvider');
  }
  return context;
}

interface InvoiceProviderProps {
  children: ReactNode;
}
interface InvoiceItem {
    id: number;
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
}
export function InvoiceProvider({ children }: InvoiceProviderProps) {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    businessName: 'Your Business Name',
    businessAddress: '123 Business St, City, State, ZIP',
    businessPhone: '(123) 456-7890',
    businessEmail: 'business@example.com',
    businessLogo: '',
    
    invoiceNumber: '00001',
    invoiceDate: format(new Date(), 'yyyy-MM-dd'),
    dueDate: format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    
    clientName: '',
    clientAddress: '',
    clientPhone: '',
    clientEmail: '',
    
    items: [
      { id: 1, description: '', quantity: 1, unitPrice: 0, amount: 0 }
    ],
    
    subtotal: 0,
    taxRate: 18,
    taxAmount: 0,
    total: 0,
    
    notes: '',
    terms: 'Payment is due within 30 days',
  });
  
  const updateField = (field: keyof InvoiceData, value: string | number) => {
    setInvoiceData(prev => ({ ...prev, [field]: value }));
  };
  
  const updateItem = (id: number, field: keyof InvoiceItem, value: string | number) => {
    setInvoiceData(prev => {
      const updatedItems = prev.items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          
          if (field === 'quantity' || field === 'unitPrice') {
            updatedItem.amount = updatedItem.quantity * updatedItem.unitPrice;
          }
          
          return updatedItem;
        }
        return item;
      });
      
      const subtotal = updatedItems.reduce((sum, item) => sum + item.amount, 0);
      const taxAmount = subtotal * (prev.taxRate / 100);
      const total = subtotal + taxAmount;
      
      return { 
        ...prev, 
        items: updatedItems,
        subtotal,
        taxAmount,
        total
      };
    });
  };
  
  const addItem = () => {
    setInvoiceData(prev => {
      const newId = Math.max(0, ...prev.items.map(item => item.id)) + 1;
      const updatedItems = [
        ...prev.items,
        { id: newId, description: '', quantity: 1, unitPrice: 0, amount: 0 }
      ];
      
      return { ...prev, items: updatedItems };
    });
  };
  
  const removeItem = (id: number) => {
    setInvoiceData(prev => {
      if (prev.items.length <= 1) return prev;
      
      const updatedItems = prev.items.filter(item => item.id !== id);
      
      const subtotal = updatedItems.reduce((sum, item) => sum + item.amount, 0);
      const taxAmount = subtotal * (prev.taxRate / 100);
      const total = subtotal + taxAmount;
      
      return { 
        ...prev, 
        items: updatedItems,
        subtotal,
        taxAmount,
        total
      };
    });
  };
  
  const updateTaxRate = (rate: number) => {
    setInvoiceData(prev => {
      const taxAmount = prev.subtotal * (rate / 100);
      const total = prev.subtotal + taxAmount;
      
      return {
        ...prev,
        taxRate: rate,
        taxAmount,
        total
      };
    });
  };
  
  const value: InvoiceContextType = {
    invoiceData,
    updateField,
    updateItem,
    addItem,
    removeItem,
    updateTaxRate
  };
  
  return (
    <InvoiceContext.Provider value={value}>
      {children}
    </InvoiceContext.Provider>
  );
}