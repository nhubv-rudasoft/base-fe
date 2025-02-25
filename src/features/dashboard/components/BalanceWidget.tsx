export function BalanceWidget() {
  return (
    <div className='flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-5'>
      <div className='flex justify-between'>
        <div className='flex flex-row items-center gap-2'>
          <span className='flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 shadow-sm'>
            <i className='flex h-4 w-4 items-center justify-center rounded-full border border-red-500 bg-red-200 text-xs font-semibold text-red-600'>
              $
            </i>
          </span>
          <p className='font-sm text-gray-700'>Balance</p>
        </div>
        <div className='flex items-center'>
          <i className='pi pi-ellipsis-v text-lg text-gray-500'></i>
        </div>
      </div>

      <div className='flex flex-col items-start gap-2 md:flex-col md:items-start lg:flex-row lg:items-center'>
        <p className='text-xl font-extrabold text-black'>
          $ 1,800.00
          <span className='text-xs font-light text-red-600'>-30%</span>
        </p>
        <p className='text-sm text-gray-800'>Increased from last month</p>
      </div>

      <div className='rounded-md bg-red-50'>
        <div className='flex flex-col p-3'>
          <p className='text-sm text-red-600'>Latest Income</p>
          <div className='flex flex-col items-start justify-start gap-2 lg:flex-row lg:items-end lg:justify-between'>
            <span className='text-sm font-semibold text-black'>$ 40.000.000.000</span>
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

export default BalanceWidget;
