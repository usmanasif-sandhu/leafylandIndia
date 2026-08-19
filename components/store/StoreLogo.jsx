'use client'

export function isVendorPhoto(src) {
    if (!src || typeof src !== 'string') return false
    const value = src.trim()
    if (!value) return false
    if (value === '/logo.png' || value.endsWith('/logo.png')) return false
    return value.startsWith('data:image/') || value.startsWith('http://') || value.startsWith('https://') || value.startsWith('blob:')
}

export default function StoreLogo({ src, name = 'Store', className = 'w-8 h-8 rounded-full' }) {
    if (isVendorPhoto(src)) {
        return (
            <img
                src={src}
                alt={name}
                className={`${className} object-cover bg-slate-100`}
            />
        )
    }

    return (
        <div className={`${className} bg-emerald-100 flex items-center justify-center font-bold text-emerald-700`}>
            {name?.charAt(0)?.toUpperCase() || 'S'}
        </div>
    )
}

export function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
        if (!file) return resolve('')
        if (file.size > 2.5 * 1024 * 1024) {
            reject(new Error('Image must be under 2.5 MB'))
            return
        }
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => reject(new Error('Could not read file'))
        reader.readAsDataURL(file)
    })
}
