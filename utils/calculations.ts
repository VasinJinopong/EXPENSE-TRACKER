// 🧮 Utility functions สำหรับ calculations และ data processing

import { Transaction, TransactionSummary, DateFilterType } from '@/types'

// 💰 คำนวณสรุปยอดเงิน
export function calculateSummary(transactions: Transaction[]): TransactionSummary {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
  
  return {
    totalIncome,
    totalExpense,
    netAmount: totalIncome - totalExpense,
    transactionCount: transactions.length
  }
}

// 📅 กรองข้อมูลตามช่วงเวลา
export function filterTransactionsByDate(
  transactions: Transaction[], 
  filterType: DateFilterType
): Transaction[] {
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0] // YYYY-MM-DD
  
  switch (filterType) {
    case 'today':
      return transactions.filter(t => t.date === todayStr)
    
    case 'week':
      const weekStart = new Date(today)
      weekStart.setDate(today.getDate() - 7)
      const weekStartStr = weekStart.toISOString().split('T')[0]
      
      return transactions.filter(t => t.date >= weekStartStr && t.date <= todayStr)
    
    case 'month':
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
      const monthStartStr = monthStart.toISOString().split('T')[0]
      
      return transactions.filter(t => t.date >= monthStartStr && t.date <= todayStr)
    
    case 'all':
    default:
      return transactions
  }
}

// 🎨 Format จำนวนเงินให้อ่านง่าย
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount)
}

// 📅 Format วันที่ให้อ่านง่าย
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  
  return new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short'
  }).format(date)
}

// 🕐 Format เวลาให้อ่านง่าย (สำหรับ createdAt)
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString)
  
  return new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// 📊 จัดกลุ่ม transactions ตาม category
export function groupTransactionsByCategory(transactions: Transaction[]) {
  return transactions.reduce((acc, transaction) => {
    const categoryId = transaction.category
    if (!acc[categoryId]) {
      acc[categoryId] = []
    }
    acc[categoryId].push(transaction)
    return acc
  }, {} as Record<string, Transaction[]>)
}

// 📈 คำนวณเปอร์เซ็นต์สำหรับแต่ละ category
export function calculateCategoryPercentages(
  transactions: Transaction[], 
  type: 'income' | 'expense'
) {
  const filteredTransactions = transactions.filter(t => t.type === type)
  const total = filteredTransactions.reduce((sum, t) => sum + t.amount, 0)
  
  if (total === 0) return {}
  
  const grouped = groupTransactionsByCategory(filteredTransactions)
  const percentages: Record<string, { amount: number; percentage: number }> = {}
  
  Object.entries(grouped).forEach(([categoryId, categoryTransactions]) => {
    const categoryTotal = categoryTransactions.reduce((sum, t) => sum + t.amount, 0)
    percentages[categoryId] = {
      amount: categoryTotal,
      percentage: Math.round((categoryTotal / total) * 100)
    }
  })
  
  return percentages
}