export default function UserProfileForm() {
  return (
    <form>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-2'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            className='w-full rounded-md border border-gray-300 bg-white p-2'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='email'>Email </label>
          <input
            type='email'
            id='email'
            className='w-full rounded-md border border-gray-300 bg-white p-2'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='phone'>Phone </label>
          <input
            type='text'
            id='phone'
            className='w-full rounded-md border border-gray-300 bg-white p-2'
          />
        </div>
      </div>
    </form>
  );
}
