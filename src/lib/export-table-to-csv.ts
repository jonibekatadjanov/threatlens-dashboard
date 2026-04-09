import { type Table } from '@tanstack/react-table'

/**
 * Converts a TanStack table's filtered rows and visible columns to a CSV string
 * and triggers a browser file download.
 *
 * - Skips columns whose id is `'select'` or `'actions'` (checkbox / row-action columns).
 * - Uses `row.getValue(columnId)` so the raw data value is exported, not a React node.
 *
 * @param table    - The TanStack `Table<TData>` instance.
 * @param filename - The suggested download file name (`.csv` is appended automatically
 *                   when the name does not already end with it).
 */
export function exportTableToCSV<TData>(
  table: Table<TData>,
  filename: string = 'export'
): void {
  const exportableColumns = table
    .getAllLeafColumns()
    .filter(
      (col) =>
        col.getIsVisible() && col.id !== 'select' && col.id !== 'actions'
    )

  // Build header row using the column id as a human-readable fallback.
  const headers = exportableColumns.map((col) => {
    const header = col.columnDef.header
    if (typeof header === 'string') return header
    return col.id
  })

  // Collect filtered (and sorted) rows.
  const rows = table.getFilteredRowModel().rows

  const csvRows = [
    headers,
    ...rows.map((row) =>
      exportableColumns.map((col) => {
        const value = row.getValue(col.id)
        // Wrap in quotes and escape any existing quotes.
        const cell =
          value === null || value === undefined ? '' : String(value)
        return `"${cell.replace(/"/g, '""')}"`
      })
    ),
  ]

  const csvContent = csvRows.map((r) => r.join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const normalizedFilename = filename.endsWith('.csv')
    ? filename
    : `${filename}.csv`

  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = normalizedFilename
  anchor.style.display = 'none'
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  // Defer revocation to give the browser time to start the download.
  setTimeout(() => URL.revokeObjectURL(url), 100)
}
