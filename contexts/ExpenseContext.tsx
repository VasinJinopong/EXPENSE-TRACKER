'use client'

// 📦 State Management ด้วย React Context API
// ทำให้ component ต่างๆ แชร์ข้อมูล transactions และ categories ได้

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { 
  Transaction, 
  Category, 
  TransactionFormData, 
  ExpenseContextType 
} from '@/types'

// 🔄 Actions สำหรับ reducer
type ExpenseAction = 
  | { type: 'SET_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_TRANSACTION'; payload: { id: string; transaction: Transaction } }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'SET_CATEGORIES'; payload: Category[] }
  | { type: 'ADD_CATEGORY'; payload: Category }
  | { type: 'UPDATE_CATEGORY'; payload: { id: string; category: Category } }
  | { type: 'DELETE_CATEGORY'; payload: string }

// 📊 State structure
interface ExpenseState {
  transactions: Transaction[]
  categories: Category[]
}

// 🎯 Initial state
const initialState: ExpenseState = {
  transactions: [],
  categories: []
}

// 🔄 Reducer function - จัดการการเปลี่ยนแปลง state
function expenseReducer(state: ExpenseState, action: ExpenseAction): ExpenseState {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload }
    
    case 'ADD_TRANSACTION':
      return { 
        ...state, 
        transactions: [action.payload, ...state.transactions] // เพิ่มที่ด้านบน (ล่าสุดก่อน)
      }
    
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t => 
          t.id === action.payload.id ? action.payload.transaction : t
        )
      }
    
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload)
      }
    
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload }
    
    case 'ADD_CATEGORY':
      return { 
        ...state, 
        categories: [...state.categories, action.payload] 
      }
    
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map(c => 
          c.id === action.payload.id ? action.payload.category : c
        )
      }
    
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(c => c.id !== action.payload)
      }
    
    default:
      return state
  }
}

// 📱 Context
const ExpenseContext = createContext<ExpenseContextType | null>(null)

// 🎛️ Provider component
export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState)

  // 💾 โหลดข้อมูลจาก localStorage เมื่อ component mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('expense-transactions')
    const savedCategories = localStorage.getItem('expense-categories')
    
    if (savedTransactions) {
      try {
        const transactions = JSON.parse(savedTransactions)
        dispatch({ type: 'SET_TRANSACTIONS', payload: transactions })
      } catch (error) {
        console.error('Error loading transactions:', error)
      }
    }
    
    if (savedCategories) {
      try {
        const categories = JSON.parse(savedCategories)
        dispatch({ type: 'SET_CATEGORIES', payload: categories })
      } catch (error) {
        console.error('Error loading categories:', error)
      }
    }
  }, [])

  // 💾 บันทึกข้อมูลลง localStorage เมื่อ state เปลี่ยน
  useEffect(() => {
    localStorage.setItem('expense-transactions', JSON.stringify(state.transactions))
  }, [state.transactions])

  useEffect(() => {
    localStorage.setItem('expense-categories', JSON.stringify(state.categories))
  }, [state.categories])

  // 🛠️ Helper functions
  const generateId = () => Date.now().toString() + Math.random().toString(36).substring(2, 11)

  const addTransaction = (transactionData: TransactionFormData) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: generateId(),
      createdAt: new Date().toISOString()
    }
    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction })
  }

  const updateTransaction = (id: string, transactionData: TransactionFormData) => {
    const updatedTransaction: Transaction = {
      ...transactionData,
      id,
      createdAt: state.transactions.find(t => t.id === id)?.createdAt || new Date().toISOString()
    }
    dispatch({ type: 'UPDATE_TRANSACTION', payload: { id, transaction: updatedTransaction } })
  }

  const deleteTransaction = (id: string) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id })
  }

  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: generateId()
    }
    dispatch({ type: 'ADD_CATEGORY', payload: newCategory })
  }

  const updateCategory = (id: string, categoryData: Omit<Category, 'id'>) => {
    const updatedCategory: Category = {
      ...categoryData,
      id
    }
    dispatch({ type: 'UPDATE_CATEGORY', payload: { id, category: updatedCategory } })
  }

  const deleteCategory = (id: string) => {
    dispatch({ type: 'DELETE_CATEGORY', payload: id })
  }

  const contextValue: ExpenseContextType = {
    transactions: state.transactions,
    categories: state.categories,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addCategory,
    updateCategory,
    deleteCategory
  }

  return (
    <ExpenseContext.Provider value={contextValue}>
      {children}
    </ExpenseContext.Provider>
  )
}

// 🪝 Custom hook สำหรับใช้ context
export function useExpense() {
  const context = useContext(ExpenseContext)
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider')
  }
  return context
}