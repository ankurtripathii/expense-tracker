import { useSummary } from '../hooks/useSummary'
import { getCategoryMeta, formatCurrency, formatMonth } from '../utils/helpers'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts'
import styles from './Summary.module.css'

const CHART_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#a855f7', '#f97316']

export default function Summary({ expenses }) {
  const { total, monthlyData, categoryData, highestMonth, topCategory } = useSummary(expenses)

  const markedTotal = expenses.filter(e => e.marked).reduce((s, e) => s + e.amount, 0)
  const unpaidTotal = total - markedTotal

  return (
    <div className={styles.container}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Spent</span>
          <span className={styles.statValue}>{formatCurrency(total)}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Paid</span>
          <span className={`${styles.statValue} ${styles.green}`}>{formatCurrency(markedTotal)}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Unpaid</span>
          <span className={`${styles.statValue} ${styles.amber}`}>{formatCurrency(unpaidTotal)}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Transactions</span>
          <span className={styles.statValue}>{expenses.length}</span>
        </div>
      </div>

      {monthlyData.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Monthly Spending</span>
            {highestMonth && (
              <span className={styles.badge}>
                Peak: {formatMonth(highestMonth.month)}
              </span>
            )}
          </div>
          <div className={styles.chart}>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={monthlyData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <XAxis
                  dataKey="month"
                  tickFormatter={formatMonth}
                  tick={{ fontSize: 11, fill: '#9898b0' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: '#9898b0' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={v => `₹${v >= 1000 ? (v/1000).toFixed(0)+'k' : v}`}
                />
                <Tooltip
                  contentStyle={{ background: '#17171d', border: '1px solid #2e2e3a', borderRadius: '8px', fontSize: '12px' }}
                  labelFormatter={formatMonth}
                  formatter={v => [formatCurrency(v), 'Total']}
                  cursor={{ fill: 'rgba(99,102,241,0.08)' }}
                />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                  {monthlyData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {categoryData.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>By Category</span>
            {topCategory && (
              <span className={styles.badge}>
                Top: {getCategoryMeta(topCategory.category).label}
              </span>
            )}
          </div>
          <div className={styles.catList}>
            {categoryData.map(({ category, amount }) => {
              const cat = getCategoryMeta(category)
              const pct = total > 0 ? (amount / total) * 100 : 0
              return (
                <div key={category} className={styles.catRow}>
                  <span className={styles.catIcon} style={{ background: cat.bg }}>{cat.icon}</span>
                  <div className={styles.catInfo}>
                    <div className={styles.catMeta}>
                      <span className={styles.catName}>{cat.label}</span>
                      <span className={styles.catAmount}>{formatCurrency(amount)}</span>
                    </div>
                    <div className={styles.barTrack}>
                      <div
                        className={styles.barFill}
                        style={{ width: `${pct}%`, background: cat.color }}
                      />
                    </div>
                    <span className={styles.catPct}>{pct.toFixed(1)}%</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
