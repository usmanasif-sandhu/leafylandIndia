import { ourSpecsData } from '@/assets/assets'

const OurSpecs = () => {
    return (
        <div className='px-6 my-12 max-w-6xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {ourSpecsData.map((spec, index) => (
                    <div key={index} className='flex items-start gap-4 p-5 rounded-2xl border border-slate-100 bg-white hover:shadow-md transition'>
                        <div className='w-10 h-10 rounded-xl flex items-center justify-center shrink-0' style={{ backgroundColor: spec.accent + '20' }}>
                            <spec.icon size={20} style={{ color: spec.accent }} />
                        </div>
                        <div>
                            <h3 className='text-slate-800 font-semibold text-sm'>{spec.title}</h3>
                            <p className='text-xs text-slate-500 mt-1 leading-relaxed'>{spec.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OurSpecs
