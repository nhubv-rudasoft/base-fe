export function Footer() {
  return (
    <footer className='w-full pb-4 text-center'>
      <p className='text-xs font-light text-gray-500'>
        &copy; {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
