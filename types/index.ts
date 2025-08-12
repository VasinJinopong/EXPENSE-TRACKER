// 📝 TypeScript Interfaces สำหรับ Expense Tracker
// ทำให้ code มี type safety และ IDE ช่วย autocomplete ได้

export interface Transaction {
  id: string                    // UUID สำหรับแต่ละ transaction
  amount: number               // จำนวนเงิน (เป็น positive number เสมอ)
  type: 'income' | 'expense'   // ประเภท: รายรับ หรือ รายจ่าย
  category: string             // category ID ที่อ้างอิงไปยัง Category.id
  description: string          // คำอธิบาย (ไม่บังคับ แต่เก็บเป็น string เปล่า)
  date: string                 // วันที่ในรูปแบบ ISO string (YYYY-MM-DD)
  createdAt: string           // เวลาที่สร้าง transaction (ISO string)
}

export interface Category {
  id: string                   // UUID สำหรับแต่ละ category  
  name: string                // ชื่อหมวดหมู่ เช่น "อาหาร", "เงินเดือน"
  icon: string                // emoji หรือ icon name
  color: string               // สี (hex code หรือ Tailwind color class)
  type: 'income' | 'expense'  // ประเภท: สำหรับรายรับ หรือ รายจ่าย
}

// 🎯 Helper Types สำหรับ filtering และ calculations
export interface TransactionSummary {
  totalIncome: number         // รวมรายรับ
  totalExpense: number        // รวมรายจ่าย  
  netAmount: number          // รายรับ - รายจ่าย
  transactionCount: number   // จำนวน transactions ทั้งหมด
}

export type DateFilterType = 'today' | 'week' | 'month' | 'all'

export type TransactionFormData = Omit<Transaction, 'id' | 'createdAt'>

// 🔄 Context Types สำหรับ state management
export interface ExpenseContextType {
  transactions: Transaction[]
  categories: Category[]
  addTransaction: (transaction: TransactionFormData) => void
  updateTransaction: (id: string, transaction: TransactionFormData) => void
  deleteTransaction: (id: string) => void
  addCategory: (category: Omit<Category, 'id'>) => void
  updateCategory: (id: string, category: Omit<Category, 'id'>) => void
  deleteCategory: (id: string) => void
}