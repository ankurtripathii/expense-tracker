export const CATEGORIES = [
  { value: 'food', label: 'Food & Dining', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', icon: '🍔' },
  { value: 'transport', label: 'Transport', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', icon: '🚗' },
  { value: 'shopping', label: 'Shopping', color: '#a855f7', bg: 'rgba(168,85,247,0.12)', icon: '🛍️' },
  { value: 'health', label: 'Health', color: '#10b981', bg: 'rgba(16,185,129,0.12)', icon: '💊' },
  { value: 'entertainment', label: 'Entertainment', color: '#f97316', bg: 'rgba(249,115,22,0.12)', icon: '🎬' },
  { value: 'bills', label: 'Bills & Utilities', color: '#ef4444', bg: 'rgba(239,68,68,0.12)', icon: '⚡' },
  { value: 'education', label: 'Education', color: '#06b6d4', bg: 'rgba(6,182,212,0.12)', icon: '📚' },
  { value: 'other', label: 'Other', color: '#9898b0', bg: 'rgba(152,152,176,0.12)', icon: '📌' },
]

export function getCategoryMeta(value) {
  return CATEGORIES.find(c => c.value === value) || CATEGORIES[CATEGORIES.length - 1]
}

export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function formatCurrency(amount, currency = '₹') {
  return `${currency}${Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatMonth(monthStr) {
  if (!monthStr) return ''
  const [year, month] = monthStr.split('-')
  const d = new Date(year, parseInt(month) - 1)
  return d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
}

export function todayString() {
  return new Date().toISOString().slice(0, 10)
}

export const SEED_EXPENSES = [
  { id: generateId(), title: 'Grocery run', amount: 2340, category: 'food', date: '2025-05-28', note: 'Weekly groceries', marked: false, createdAt: new Date().toISOString() },
  { id: generateId(), title: 'Uber to office', amount: 180, category: 'transport', date: '2025-05-27', note: '', marked: false, createdAt: new Date().toISOString() },
  { id: generateId(), title: 'Netflix subscription', amount: 649, category: 'entertainment', date: '2025-05-25', note: 'Monthly plan', marked: true, createdAt: new Date().toISOString() },
  { id: generateId(), title: 'New sneakers', amount: 3499, category: 'shopping', date: '2025-05-22', note: 'Nike Air', marked: false, createdAt: new Date().toISOString() },
  { id: generateId(), title: 'Electricity bill', amount: 1120, category: 'bills', date: '2025-05-20', note: 'May bill', marked: true, createdAt: new Date().toISOString() },
  { id: generateId(), title: 'Udemy course', amount: 399, category: 'education', date: '2025-05-18', note: 'React hooks course', marked: false, createdAt: new Date().toISOString() },
  { id: generateId(), title: 'Doctor visit', amount: 800, category: 'health', date: '2025-04-30', note: 'Checkup', marked: true, createdAt: new Date().toISOString() },
  { id: generateId(), title: 'Restaurant dinner', amount: 1650, category: 'food', date: '2025-04-26', note: 'Birthday dinner', marked: false, createdAt: new Date().toISOString() },
  { id: generateId(), title: 'Metro card recharge', amount: 500, category: 'transport', date: '2025-04-20', note: '', marked: false, createdAt: new Date().toISOString() },
  { id: generateId(), title: 'Internet bill', amount: 999, category: 'bills', date: '2025-04-15', note: 'Monthly broadband', marked: true, createdAt: new Date().toISOString() },
]
