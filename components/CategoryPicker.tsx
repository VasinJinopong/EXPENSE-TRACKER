// 🏷️ CategoryPicker - component สำหรับเลือก category

import { Category } from '@/types'

interface CategoryPickerProps {
  categories: Category[]
  selectedCategoryId: string
  transactionType: 'income' | 'expense'
  onCategorySelect: (categoryId: string) => void
  className?: string
}

export default function CategoryPicker({
  categories,
  selectedCategoryId,
  transactionType,
  onCategorySelect,
  className = ''
}: CategoryPickerProps) {
  // กรอง categories ตาม transaction type
  const filteredCategories = categories.filter(cat => cat.type === transactionType)
  
  if (filteredCategories.length === 0) {
    return (
      <div className={`p-4 text-center text-gray-500 dark:text-gray-400 ${className}`}>
        ไม่มีหมวดหมู่สำหรับ{transactionType === 'income' ? 'รายรับ' : 'รายจ่าย'}
      </div>
    )
  }

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        เลือกหมวดหมู่ ({transactionType === 'income' ? 'รายรับ' : 'รายจ่าย'})
      </label>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filteredCategories.map((category) => {
          const isSelected = category.id === selectedCategoryId
          
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onCategorySelect(category.id)}
              className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-400'
                  : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500'
              }`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white ${category.color}`}>
                <span className="text-xl">{category.icon}</span>
              </div>
              
              {/* Name */}
              <div className={`text-sm font-medium text-center ${
                isSelected 
                  ? 'text-blue-700 dark:text-blue-300' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}>
                {category.name}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}