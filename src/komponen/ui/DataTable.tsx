import React from 'react';

interface Column<T> {
  header: string;
  accessor: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyMessage?: string;
  keyExtractor: (item: T, index: number) => string | number;
}

export default function DataTable<T>({
  data,
  columns,
  loading = false,
  emptyMessage = 'Tidak ada data untuk ditampilkan.',
  keyExtractor,
}: DataTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto border border-slate-200/80 rounded-2xl bg-white">
      <table className="w-full text-left border-collapse text-xs font-semibold text-[#0B1633]">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200/80 text-[10px] font-black uppercase text-zinc-400">
            {columns.map((col, idx) => (
              <th key={idx} className={`p-4 ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {loading ? (
            Array.from({ length: 3 }).map((_, rIdx) => (
              <tr key={rIdx} className="animate-pulse">
                {columns.map((col, cIdx) => (
                  <td key={cIdx} className="p-4">
                    <div className="h-4 bg-slate-100 rounded w-3/4" />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-8 text-center text-slate-400 font-normal">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={keyExtractor(item, index)} className="hover:bg-slate-50 transition-colors">
                {columns.map((col, cIdx) => (
                  <td key={cIdx} className={`p-4 ${col.className || ''}`}>
                    {col.accessor(item)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
