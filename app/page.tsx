'use client'

// 🏠 หน้าหลัก Expense Tracker - แสดงรายการ transactions และสรุปยอดเงิน

import { useState, useEffect } from 'react'
import { DateFilterType } from '@/types'
import { useExpense } from '@/contexts/ExpenseContext'
import { calculateSummary, filterTransactionsByDate } from '@/utils/calculations'
import { initializeMockData } from '@/data/mockData'

// Components
import SummaryCard from '@/components/SummaryCard'
import TransactionItem from '@/components/TransactionItem'
import TransactionForm from '@/components/TransactionForm'
import DateFilter from '@/components/DateFilter'

export default function Home() {
  const { transactions, categories, addTransaction, updateTransaction, deleteTransaction } = useExpense()
  const [dateFilter, setDateFilter] = useState<DateFilterType>('all')
  const [showTransactionForm, setShowTransactionForm] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

  // 🔄 Initialize mock data เมื่อ component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      initializeMockData()
    }
  }, [])

  // 📊 กรองและคำนวณข้อมูล
  const filteredTransactions = filterTransactionsByDate(transactions, dateFilter)
  const summary = calculateSummary(filteredTransactions)

  // 🎯 Handle transaction form
  const handleAddTransaction = async (transactionData: any) => {
    addTransaction(transactionData)
    setShowTransactionForm(false)
  }

  const handleUpdateTransaction = async (transactionData: any) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, transactionData)
      setEditingTransaction(null)
      setShowTransactionForm(false)
    }
  }

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction)
    setShowTransactionForm(true)
  }

  const handleDeleteTransaction = (id: string) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?')) {
      deleteTransaction(id)
    }
  }

  const handleCancelForm = () => {
    setShowTransactionForm(false)
    setEditingTransaction(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 📋 Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            💰 Personal Expense Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            จัดการรายรับ-รายจ่ายของคุณอย่างง่ายดาย
          </p>
        </div>

        {/* 🔄 Transaction Form Modal/Section */}
        {showTransactionForm && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
              {/* Background Overlay - ให้กดได้เพื่อปิด modal */}
              <div 
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                aria-hidden="true"
                onClick={handleCancelForm}
              ></div>
              
              {/* Modal Content - z-index สูงกว่า overlay */}
              <div className="relative inline-block w-full max-w-2xl p-0 my-8 overflow-hidden align-middle bg-white dark:bg-gray-800 shadow-xl rounded-2xl z-10">
                <TransactionForm
                  categories={categories}
                  onSubmit={editingTransaction ? handleUpdateTransaction : handleAddTransaction}
                  onCancel={handleCancelForm}
                  initialData={editingTransaction}
                />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 👈 ซ้าย: Summary + Filters + Add Button */}
          <div className="lg:col-span-1 space-y-6">
            {/* Summary Card */}
            <SummaryCard summary={summary} />
            
            {/* Date Filter */}
            <DateFilter 
              currentFilter={dateFilter}
              onFilterChange={setDateFilter}
            />
            
            {/* Add Transaction Button */}
            <button
              onClick={() => setShowTransactionForm(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>เพิ่มรายการใหม่</span>
            </button>
          </div>

          {/* 👉 ขวา: Transaction List */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  รายการ {dateFilter === 'today' ? 'วันนี้' : 
                           dateFilter === 'week' ? '7 วันล่าสุด' : 
                           dateFilter === 'month' ? 'เดือนนี้' : 'ทั้งหมด'}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {filteredTransactions.length} รายการ
                </p>
              </div>

              {/* Transaction List */}
              <div className="p-6">
                {filteredTransactions.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      ยังไม่มีรายการ
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      เริ่มต้นด้วยการเพิ่มรายการรายรับหรือรายจ่ายแรกของคุณ
                    </p>
                    <button
                      onClick={() => setShowTransactionForm(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      เพิ่มรายการแรก
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredTransactions.map((transaction) => {
                      const category = categories.find(cat => cat.id === transaction.category)
                      
                      return (
                        <TransactionItem
                          key={transaction.id}
                          transaction={transaction}
                          category={category}
                          onEdit={handleEditTransaction}
                          onDelete={handleDeleteTransaction}
                        />
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
