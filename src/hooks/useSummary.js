import { useMemo } from 'react'

/**
 * useSummary
 * Derives total, monthly breakdown, and category breakdown from expenses.
 * Uses useMemo to avoid recalculation on every render.
 * @param {Array} expenses
 * @returns {{ total, monthlyData, categoryData, highestMonth, topCategory }}
 */
export function useSummary(expenses) {
  const total = useMemo(() => {
    return expenses.reduce((sum, e) => sum + e.amount, 0)
  }, [expenses])

  const monthlyData = useMemo(() => {
    const map = {}
    expenses.forEach(e => {
      const key = e.date.slice(0, 7) // YYYY-MM
      map[key] = (map[key] || 0) + e.amount
    })
    return Object.entries(map)
      .map(([month, amount]) => ({ month, amount: parseFloat(amount.toFixed(2)) }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-6) // last 6 months
  }, [expenses])

  const categoryData = useMemo(() => {
    const map = {}
    expenses.forEach(e => {
      map[e.category] = (map[e.category] || 0) + e.amount
    })
    return Object.entries(map)
      .map(([category, amount]) => ({ category, amount: parseFloat(amount.toFixed(2)) }))
      .sort((a, b) => b.amount - a.amount)
  }, [expenses])

  const highestMonth = useMemo(() => {
    if (!monthlyData.length) return null
    return monthlyData.reduce((max, m) => m.amount > max.amount ? m : max, monthlyData[0])
  }, [monthlyData])

  const topCategory = useMemo(() => {
    if (!categoryData.length) return null
    return categoryData[0]
  }, [categoryData])

  return { total, monthlyData, categoryData, highestMonth, topCategory }
}
