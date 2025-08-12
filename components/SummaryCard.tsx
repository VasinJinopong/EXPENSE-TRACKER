// 💳 Summary Card - แสดงสรุปยอดรายรับ รายจ่าย และยอดคงเหลือ

import { TransactionSummary } from '@/types'
import { formatCurrency } from '@/utils/calculations'

interface SummaryCardProps {
  summary: TransactionSummary
  className?: string
}

export default function SummaryCard({ summary, className = '' }: SummaryCardProps) {
  const { totalIncome, totalExpense, netAmount, transactionCount } = summary
  
  // 🎨 กำหนดสีตาม net amount (บวก = เขียว, ลบ = แดง)
  const netAmountColor = netAmount >= 0 
    ? 'text-green-600 dark:text-green-400' 
    : 'text-red-600 dark:text-red-400'
  
  const netAmountBg = netAmount >= 0 
    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* 📊 Header */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          สรุปยอดเงิน
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {transactionCount} รายการ
        </p>
      </div>
      
      {/* 💰 Summary Content */}
      <div className="p-4 space-y-4">
        {/* รายรับ */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-300">รายรับ</span>
          </div>
          <span className="font-medium text-green-600 dark:text-green-400">
            +{formatCurrency(totalIncome)}
          </span>
        </div>
        
        {/* รายจ่าย */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-300">รายจ่าย</span>
          </div>
          <span className="font-medium text-red-600 dark:text-red-400">
            -{formatCurrency(totalExpense)}
          </span>
        </div>
        
        {/* เส้นคั่น */}
        <div className="border-t border-gray-200 dark:border-gray-600"></div>
        
        {/* ยอดคงเหลือ */}
        <div className={`p-3 rounded-lg border ${netAmountBg}`}>
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              ยอดคงเหลือ
            </span>
            <span className={`font-bold text-lg ${netAmountColor}`}>
              {netAmount >= 0 ? '+' : ''}{formatCurrency(netAmount)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}