// 📝 TransactionItem - แสดงรายการแต่ละ transaction

import { Transaction, Category } from '@/types'
import { formatCurrency, formatDate } from '@/utils/calculations'

interface TransactionItemProps {
  transaction: Transaction
  category: Category | undefined // อาจจะหา category ไม่เจอ
  onEdit?: (transaction: Transaction) => void
  onDelete?: (id: string) => void
  className?: string
}

export default function TransactionItem({ 
  transaction, 
  category, 
  onEdit, 
  onDelete,
  className = ''
}: TransactionItemProps) {
  const { amount, type, description, date } = transaction
  
  // 🎨 สีตาม type ของ transaction
  const typeColor = type === 'income' 
    ? 'text-green-600 dark:text-green-400' 
    : 'text-red-600 dark:text-red-400'
  
  const amountPrefix = type === 'income' ? '+' : '-'
  
  // 🏷️ ข้อมูล category (ถ้าหาไม่เจอจะแสดงค่า default)
  const categoryInfo = category || {
    name: 'ไม่ระบุหมวดหมู่',
    icon: '❓',
    color: 'bg-gray-500'
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-center justify-between">
        {/* ซ้าย: Category + รายละเอียด */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          {/* Category Icon */}
          <div className={`w-10 h-10 rounded-full ${categoryInfo.color} flex items-center justify-center text-white flex-shrink-0`}>
            <span className="text-lg">{categoryInfo.icon}</span>
          </div>
          
          {/* รายละเอียด */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="font-medium text-gray-900 dark:text-white truncate">
                {description || 'ไม่มีรายละเอียด'}
              </h3>
              {/* Type badge */}
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                type === 'income' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
              }`}>
                {type === 'income' ? 'รายรับ' : 'รายจ่าย'}
              </span>
            </div>
            
            <div className="flex items-center space-x-2 mt-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {categoryInfo.name}
              </p>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(date)}
              </p>
            </div>
          </div>
        </div>
        
        {/* ขวา: จำนวนเงิน + Actions */}
        <div className="flex items-center space-x-3">
          {/* จำนวนเงิน */}
          <div className="text-right">
            <p className={`font-bold text-lg ${typeColor}`}>
              {amountPrefix}{formatCurrency(amount)}
            </p>
          </div>
          
          {/* Actions */}
          {(onEdit || onDelete) && (
            <div className="flex items-center space-x-1">
              {onEdit && (
                <button
                  onClick={() => onEdit(transaction)}
                  className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                  title="แก้ไข"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              )}
              
              {onDelete && (
                <button
                  onClick={() => onDelete(transaction.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                  title="ลบ"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}