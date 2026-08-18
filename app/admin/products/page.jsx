'use client'

import { useState, useMemo } from 'react'
import PageHeader from '@/components/admin/PageHeader'
import DataTable from '@/components/admin/DataTable'
import StatusBadge from '@/components/admin/StatusBadge'
import DetailSlideOver from '@/components/admin/DetailSlideOver'
import { products, productCategories } from '@/lib/data/products'

export default function ProductsPage() {
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const filteredData = useMemo(() => {
    if (categoryFilter === 'All') return products
    return products.filter((p) => p.category === categoryFilter)
  }, [categoryFilter])

  const columns = [
    {
      key: 'images',
      label: 'Image',
      render: (val, row) => (
        <img
          src={val?.[0] || 'https://via.placeholder.com/40'}
          alt={row.name || ''}
          className="w-12 h-12 rounded-lg object-cover"
        />
      ),
    },
    { key: 'name', label: 'Name', render: (val) => <span className="font-semibold">{val || 'N/A'}</span> },
    {
      key: 'storeId',
      label: 'Store',
      render: (val) => {
        const num = val?.replace('store-', '') || '?'
        return `Store #${num}`
      },
    },
    { key: 'category', label: 'Category' },
    {
      key: 'price',
      label: 'Price',
      render: (val) => `₹${(val || 0).toLocaleString('en-IN')}`,
    },
    {
      key: 'stock',
      label: 'Stock',
      render: (val) => <StatusBadge status={val > 0 ? 'active' : 'inactive'} />,
    },
    {
      key: 'id',
      label: 'View',
      render: (_val, row) => (
        <button
          onClick={() => setSelectedProduct(row)}
          className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
        >
          View
        </button>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Products" description="Manage all products across stores" />

      <div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="All">All Categories</option>
          {productCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        searchKeys={['name', 'category']}
        emptyMessage="No products found"
      />

      <DetailSlideOver
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        title={selectedProduct?.name || 'Product Details'}
      >
        {selectedProduct && (
          <div className="space-y-4">
            <img
              src={selectedProduct.images?.[0] || 'https://via.placeholder.com/400'}
              alt={selectedProduct.name || ''}
              className="w-full h-48 rounded-lg object-cover"
            />

            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Description</h3>
              <p className="text-sm text-slate-700 mt-1">{selectedProduct.description || 'N/A'}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</h3>
                <p className="text-sm text-slate-700 mt-1">{selectedProduct.category || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Store</h3>
                <p className="text-sm text-slate-700 mt-1">
                  Store #{(selectedProduct.storeId?.replace('store-', '') || '?')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">MRP</h3>
                <p className="text-sm text-slate-700 mt-1">
                  ₹{(selectedProduct.mrp || 0).toLocaleString('en-IN')}
                </p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Price</h3>
                <p className="text-sm text-slate-700 mt-1">
                  ₹{(selectedProduct.price || 0).toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Stock</h3>
              <div className="mt-1">
                <StatusBadge status={selectedProduct.stock > 0 ? 'active' : 'inactive'} />
              </div>
            </div>
          </div>
        )}
      </DetailSlideOver>
    </div>
  )
}