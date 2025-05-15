export interface InvoiceItem {
    id: number;
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
}

export interface InvoiceData {
    businessName: string;
    businessAddress: string;
    businessPhone: string;
    businessEmail: string;
    businessLogo: string;

    invoiceNumber: string;
    invoiceDate: string;
    dueDate: string;

    clientName: string;
    clientAddress: string;
    clientPhone: string;
    clientEmail: string;

    items: InvoiceItem[];

    subtotal: number;
    taxRate: number;
    taxAmount: number;
    total: number;

    notes: string;
    terms: string;
}

export type ItemType = 'product' | 'service'; // Define item types

export interface StoredItem {
    id: string; // Add an ID
    name: string;
    description: string;
    rate: string;
    usageUnit: string;
    type: ItemType; // Add item type
    createdAt: string;
}

export interface InvoiceContextType {
    invoiceData: InvoiceData;
    updateField: (field: keyof InvoiceData, value: string | number) => void;
    updateItem: (id: number, field: keyof InvoiceItem, value: string | number) => void;
    addItem: () => void;
    removeItem: (id: number) => void;
    updateTaxRate: (rate: number) => void;
}
