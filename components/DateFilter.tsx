// 📅 DateFilter - component สำหรับกรองข้อมูลตามช่วงเวลา

import { DateFilterType } from '@/types'

interface DateFilterProps {
  currentFilter: DateFilterType
  onFilterChange: (filter: DateFilterType) => void
  className?: string
}

const filterOptions: { value: DateFilterType; label: string; description: string }[] = [
  { value: 'today', label: 'วันนี้', description: 'รายการวันนี้' },
  { value: 'week', label: '7 วันที่ผ่านมา', description: 'รายการ 7 วันล่าสุด' },
  { value: 'month', label: 'เดือนนี้', description: 'รายการเดือนปัจจุบัน' },
  { value: 'all', label: 'ทั้งหมด', description: 'รายการทั้งหมด' }
]

export default function DateFilter({ 
  currentFilter, 
  onFilterChange, 
  className = '' 
}: DateFilterProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 ${className}`}>
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        กรองตามช่วงเวลา
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {filterOptions.map((option) => {
          const isActive = currentFilter === option.value
          
          return (
            <button
              key={option.value}
              onClick={() => onFilterChange(option.value)}
              className={`p-3 rounded-lg border transition-all text-left ${
                isActive
                  ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-300'
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <div className="font-medium text-sm">{option.label}</div>
              <div className={`text-xs mt-1 ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {option.description}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}