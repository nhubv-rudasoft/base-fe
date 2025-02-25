interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className='pt-14 font-bold antialiased'>
      <h2 className='text-xl font-bold'>{title}</h2>
      <p className='text-xs font-light text-gray-500'>{description}</p>
    </div>
  );
}
