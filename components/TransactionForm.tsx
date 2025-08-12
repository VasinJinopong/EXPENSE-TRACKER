// 📝 TransactionForm - ฟอร์มสำหรับเพิ่ม/แก้ไข transaction

'use client'

import { useState, useEffect } from 'react'
import { Transaction, Category, TransactionFormData } from '@/types'
import CategoryPicker from './CategoryPicker'

interface TransactionFormProps {
  categories: Category[]
  onSubmit: (transaction: TransactionFormData) => void
  onCancel: () => void
  initialData?: Transaction // สำหรับ edit mode
  className?: string
}

export default function TransactionForm({
  categories,
  onSubmit,
  onCancel,
  initialData,
  className = ''
}: TransactionFormProps) {
  // 📝 Form state
  const [formData, setFormData] = useState<TransactionFormData>({
    amount: 0,
    type: 'expense',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0] // YYYY-MM-DD
  })
  
  const [errors, setErrors] = useState<Partial<Record<keyof TransactionFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 🔄 Load initial data สำหรับ edit mode
  useEffect(() => {
    if (initialData) {
      setFormData({
        amount: initialData.amount,
        type: initialData.type,
        category: initialData.category,
        description: initialData.description,
        date: initialData.date
      })
    }
  }, [initialData])

  // 📝 Handle input changes
  const handleInputChange = (field: keyof TransactionFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error เมื่อผู้ใช้เริ่มแก้ไข
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  // ✅ Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TransactionFormData, string>> = {}
    
    if (formData.amount <= 0) {
      newErrors.amount = 'กรุณาระบุจำนวนเงินที่มากกว่า 0'
    }
    
    if (!formData.category) {
      newErrors.category = 'กรุณาเลือกหมวดหมู่'
    }
    
    if (!formData.date) {
      newErrors.date = 'กรุณาระบุวันที่'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 📤 Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error('Error submitting transaction:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isEditMode = !!initialData

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* 📋 Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {isEditMode ? 'แก้ไขรายการ' : 'เพิ่มรายการใหม่'}
        </h2>
      </div>

      {/* 📝 Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Transaction Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            ประเภท
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                handleInputChange('type', 'income')
                handleInputChange('category', '') // Reset category
              }}
              className={`p-4 rounded-lg border-2 transition-all ${
                formData.type === 'income'
                  ? 'border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30 dark:border-green-400 dark:text-green-300'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <div className="text-2xl mb-2">💰</div>
              <div className="font-medium">รายรับ</div>
            </button>
            
            <button
              type="button"
              onClick={() => {
                handleInputChange('type', 'expense')
                handleInputChange('category', '') // Reset category
              }}
              className={`p-4 rounded-lg border-2 transition-all ${
                formData.type === 'expense'
                  ? 'border-red-500 bg-red-50 text-red-700 dark:bg-red-900/30 dark:border-red-400 dark:text-red-300'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <div className="text-2xl mb-2">💸</div>
              <div className="font-medium">รายจ่าย</div>
            </button>
          </div>
        </div>

        {/* Amount */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            จำนวนเงิน (บาท)
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            value={formData.amount || ''}
            onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
            className={`w-full px-4 py-3 rounded-lg border text-lg font-medium ${
              errors.amount
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200 dark:border-gray-600 dark:focus:border-blue-400'
            } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            placeholder="0.00"
          />
          {errors.amount && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.amount}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <CategoryPicker
            categories={categories}
            selectedCategoryId={formData.category}
            transactionType={formData.type}
            onCategorySelect={(categoryId) => handleInputChange('category', categoryId)}
          />
          {errors.category && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.category}</p>
          )}
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            วันที่
          </label>
          <input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.date
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200 dark:border-gray-600 dark:focus:border-blue-400'
            } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
          />
          {errors.date && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.date}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            รายละเอียด (ไม่บังคับ)
          </label>
          <input
            id="description"
            type="text"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-200 focus:outline-none focus:ring-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-400 text-gray-900 dark:text-white"
            placeholder="เช่น อาหารกลางวัน, ค่าแก๊ส..."
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-600">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            disabled={isSubmitting}
          >
            ยกเลิก
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              formData.type === 'income'
                ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSubmitting 
              ? 'กำลังบันทึก...' 
              : isEditMode 
                ? 'อัปเดต' 
                : 'บันทึก'
            }
          </button>
        </div>
      </form>
    </div>
  )
}