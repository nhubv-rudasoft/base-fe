export function IncomingWidget() {
  return (
    <div className='flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5'>
      <div className='flex justify-between'>
        <div className='flex flex-row items-center gap-2'>
          <span className='flex h-8 w-8 items-center justify-center rounded-lg border border-green-200 shadow-sm'>
            <i className='flex h-4 w-4 items-center justify-center rounded-full border border-green-500 bg-green-200 text-xs font-semibold text-green-600'>
              $
            </i>
          </span>
          <p className='font-sm text-gray-700'>Income</p>
        </div>
        <div className='flex items-center'>
          <i className='pi pi-ellipsis-v text-lg text-gray-500'></i>
        </div>
      </div>

      <div className='flex flex-col items-start gap-2 md:flex-col md:items-start lg:flex-row lg:items-center'>
        <p className='text-xl font-extrabold text-black'>
          $ 1,200.00
          <span className='text-xs font-light text-green-600'>+20%</span>
        </p>
        <p className='text-sm text-gray-800'>Increased from last month</p>
      </div>

      <div className='rounded-md bg-green-50'>
        <div className='flex flex-col p-3'>
          <p className='text-sm text-green-600'>Latest Income</p>
          <div className='flex flex-col items-start justify-start gap-2 lg:flex-row lg:items-end lg:justify-between'>
            <span className='text-sm font-semibold text-black'>$ 200.000.000.000</span>
            <span className='pb-0.5 text-xs text-gray-800'>
              <i className='pi pi-calendar text-xs text-gray-500'></i>
              12th May 2021
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomingWidget;
