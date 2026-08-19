'use client'
import { useEffect, useState } from 'react'
import { AlertTriangle, Search } from 'lucide-react'
import toast from 'react-hot-toast'

export default function VendorInventory() {
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('stock-asc')
    const [vendorProducts, setVendorProducts] = useState([])

    const load = () => {
        fetch('/api/vendor/products')
            .then((r) => r.json())
            .then((data) => { if (Array.isArray(data)) setVendorProducts(data) })
    }

    useEffect(() => { load() }, [])

    const vendorInventoryAlerts = vendorProducts
        .filter((p) => (p.stock ?? 0) <= 5)
        .map((p) => ({
            id: p.id,
            name: p.name,
            stock: p.stock,
            status: p.stock <= 2 ? 'critical' : 'low',
        }))

    const sorted = [...vendorProducts]
        .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sort === 'stock-asc') return a.stock - b.stock
            if (sort === 'stock-desc') return b.stock - a.stock
            if (sort === 'name') return a.name.localeCompare(b.name)
            return 0
        })

    const updateStock = async (product) => {
        const next = window.prompt(`New stock for ${product.name}`, String(product.stock ?? 0))
        if (next == null || next === '') return
        const stock = Number(next)
        if (Number.isNaN(stock) || stock < 0) return toast.error('Enter a valid stock number')
        const res = await fetch(`/api/vendor/products/${product.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stock }),
        })
        if (!res.ok) return toast.error('Could not update stock')
        toast.success('Stock updated')
        load()
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-slate-800">
                    Store <span className="font-bold">Inventory</span>
                </h1>
                <p className="text-sm text-slate-500 mt-1">{vendorProducts.length} products tracked</p>
            </div>

            {vendorInventoryAlerts.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle size={18} className="text-amber-600" />
                        <h2 className="text-sm font-semibold text-amber-800">Low Stock Alerts</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {vendorInventoryAlerts.map(item => (
                            <span key={item.id} className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                                item.status === 'critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                                {item.name} — {item.stock} left
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition"
                    />
                </div>
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-emerald-500"
                >
                    <option value="stock-asc">Stock: Low to High</option>
                    <option value="stock-desc">Stock: High to Low</option>
                    <option value="name">Name A-Z</option>
                </select>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-slate-500 border-b border-slate-100">
                                <th className="px-5 py-3 font-medium">Product</th>
                                <th className="px-5 py-3 font-medium">Category</th>
                                <th className="px-5 py-3 font-medium">Stock</th>
                                <th className="px-5 py-3 font-medium">Status</th>
                                <th className="px-5 py-3 font-medium">Total Sold</th>
                                <th className="px-5 py-3 font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sorted.map(product => (
                                <tr key={product.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                                    <td className="px-5 py-3 font-medium text-slate-700">{product.name}</td>
                                    <td className="px-5 py-3 text-slate-500">{product.category}</td>
                                    <td className="px-5 py-3">
                                        <span className={`font-semibold ${
                                            product.stock <= 3 ? 'text-red-600' : product.stock <= 10 ? 'text-amber-600' : 'text-emerald-600'
                                        }`}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3">
                                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                            product.stock <= 3 ? 'bg-red-100 text-red-600' :
                                            product.stock <= 10 ? 'bg-amber-100 text-amber-600' :
                                            'bg-emerald-100 text-emerald-600'
                                        }`}>
                                            {product.stock <= 3 ? 'Critical' : product.stock <= 10 ? 'Low' : 'In Stock'}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-slate-600">{product.totalSales || 0}</td>
                                    <td className="px-5 py-3">
                                        <button
                                            onClick={() => updateStock(product)}
                                            className="px-3 py-1.5 bg-emerald-50 text-emerald-600 text-xs font-medium rounded-lg hover:bg-emerald-100 transition-colors"
                                        >
                                            Update Stock
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
