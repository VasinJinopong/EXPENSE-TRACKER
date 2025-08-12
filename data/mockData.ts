// 🎭 Mock Data สำหรับ development และ testing
// ข้อมูลตัวอย่างที่จะใช้ในการทดสอบ app

import { Category, Transaction } from '@/types'

// 🏷️ Categories ตัวอย่าง - แบ่งเป็นรายรับและรายจ่าย
export const defaultCategories: Category[] = [
  // 💰 Income Categories (รายรับ)
  {
    id: 'income-salary',
    name: 'เงินเดือน',
    icon: '💼',
    color: 'bg-green-500',
    type: 'income'
  },
  {
    id: 'income-freelance',
    name: 'งานฟรีแลนซ์',
    icon: '💻',
    color: 'bg-blue-500',
    type: 'income'
  },
  {
    id: 'income-investment',
    name: 'การลงทุน',
    icon: '📈',
    color: 'bg-purple-500',
    type: 'income'
  },
  {
    id: 'income-other',
    name: 'รายรับอื่นๆ',
    icon: '💎',
    color: 'bg-teal-500',
    type: 'income'
  },

  // 💸 Expense Categories (รายจ่าย)
  {
    id: 'expense-food',
    name: 'อาหาร',
    icon: '🍜',
    color: 'bg-orange-500',
    type: 'expense'
  },
  {
    id: 'expense-transport',
    name: 'ค่าเดินทาง',
    icon: '🚗',
    color: 'bg-red-500',
    type: 'expense'
  },
  {
    id: 'expense-shopping',
    name: 'ช้อปปิ้ง',
    icon: '🛒',
    color: 'bg-pink-500',
    type: 'expense'
  },
  {
    id: 'expense-entertainment',
    name: 'ความบันเทิง',
    icon: '🎬',
    color: 'bg-indigo-500',
    type: 'expense'
  },
  {
    id: 'expense-health',
    name: 'สุขภาพ',
    icon: '🏥',
    color: 'bg-emerald-500',
    type: 'expense'
  },
  {
    id: 'expense-bills',
    name: 'ค่าใช้จ่ายประจำ',
    icon: '📄',
    color: 'bg-gray-500',
    type: 'expense'
  },
  {
    id: 'expense-other',
    name: 'อื่นๆ',
    icon: '📝',
    color: 'bg-slate-500',
    type: 'expense'
  }
]

// 📊 Transaction ตัวอย่าง - สำหรับ demo
export const sampleTransactions: Transaction[] = [
  {
    id: 'trans-1',
    amount: 35000,
    type: 'income',
    category: 'income-salary',
    description: 'เงินเดือนประจำเดือน',
    date: '2024-08-10',
    createdAt: '2024-08-10T09:00:00.000Z'
  },
  {
    id: 'trans-2',
    amount: 250,
    type: 'expense',
    category: 'expense-food',
    description: 'อาหารกลางวัน',
    date: '2024-08-10',
    createdAt: '2024-08-10T12:30:00.000Z'
  },
  {
    id: 'trans-3',
    amount: 1200,
    type: 'expense',
    category: 'expense-shopping',
    description: 'เสื้อผ้า',
    date: '2024-08-09',
    createdAt: '2024-08-09T15:45:00.000Z'
  },
  {
    id: 'trans-4',
    amount: 5000,
    type: 'income',
    category: 'income-freelance',
    description: 'งานเขียนเว็บไซต์',
    date: '2024-08-08',
    createdAt: '2024-08-08T18:00:00.000Z'
  },
  {
    id: 'trans-5',
    amount: 800,
    type: 'expense',
    category: 'expense-transport',
    description: 'ค่าแก๊สรถยนต์',
    date: '2024-08-07',
    createdAt: '2024-08-07T08:15:00.000Z'
  },
  {
    id: 'trans-6',
    amount: 450,
    type: 'expense',
    category: 'expense-entertainment',
    description: 'ดูหนัง',
    date: '2024-08-06',
    createdAt: '2024-08-06T19:30:00.000Z'
  },
  {
    id: 'trans-7',
    amount: 15000,
    type: 'income',
    category: 'income-investment',
    description: 'กำไรจากหุ้น',
    date: '2024-08-05',
    createdAt: '2024-08-05T16:20:00.000Z'
  },
  {
    id: 'trans-8',
    amount: 180,
    type: 'expense',
    category: 'expense-food',
    description: 'กาแฟ',
    date: '2024-08-11',
    createdAt: '2024-08-11T07:45:00.000Z'
  }
]

// 🛠️ Helper function สำหรับ initialize ข้อมูล
export const initializeMockData = () => {
  // เช็คว่ามีข้อมูลใน localStorage หรือยัง
  const existingCategories = localStorage.getItem('expense-categories')
  const existingTransactions = localStorage.getItem('expense-transactions')
  
  if (!existingCategories) {
    localStorage.setItem('expense-categories', JSON.stringify(defaultCategories))
  }
  
  if (!existingTransactions) {
    localStorage.setItem('expense-transactions', JSON.stringify(sampleTransactions))
  }
}