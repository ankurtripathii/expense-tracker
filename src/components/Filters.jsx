import { CATEGORIES } from '../utils/helpers'
import styles from './Filters.module.css'

export default function Filters({ filters, setFilter, resetFilters, activeCount, totalExpenses }) {
  return (
    <div className={styles.container}>
      <div className={styles.searchRow}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search expenses..."
            value={filters.search}
            onChange={e => setFilter('search', e.target.value)}
          />
          {filters.search && (
            <button className={styles.clearSearch} onClick={() => setFilter('search', '')}>✕</button>
          )}
        </div>

        {activeCount > 0 && (
          <button className={styles.resetBtn} onClick={resetFilters}>
            Clear filters ({activeCount})
          </button>
        )}
      </div>

      <div className={styles.filterRow}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Category</label>
          <div className={styles.catChips}>
            <button
              className={`${styles.chip} ${filters.category === 'all' ? styles.chipActive : ''}`}
              onClick={() => setFilter('category', 'all')}
            >
              All
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                className={`${styles.chip} ${filters.category === cat.value ? styles.chipActive : ''}`}
                style={filters.category === cat.value ? { borderColor: cat.color, background: cat.bg, color: cat.color } : {}}
                onClick={() => setFilter('category', cat.value)}
              >
                {cat.icon} {cat.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Date range</label>
          <div className={styles.dateRow}>
            <input
              className={styles.dateInput}
              type="date"
              value={filters.dateFrom}
              onChange={e => setFilter('dateFrom', e.target.value)}
            />
            <span className={styles.dateSep}>→</span>
            <input
              className={styles.dateInput}
              type="date"
              value={filters.dateTo}
              onChange={e => setFilter('dateTo', e.target.value)}
            />
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={filters.markedOnly}
              onChange={e => setFilter('markedOnly', e.target.checked)}
              className={styles.checkbox}
            />
            Show paid only
          </label>
        </div>
      </div>
    </div>
  )
}
