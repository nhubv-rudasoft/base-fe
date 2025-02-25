import { ReactNode } from 'react';

interface TextInputProps {
  label: string;
  value: string;
  icon?: ReactNode;
  onChange: (value: string) => void;
}

export const TextInput = ({ label, value, icon, onChange }: TextInputProps) => (
  <div className='flex flex-col'>
    <label className='text-secondary font-sans text-lg'>{label}</label>
    <div className='flex items-center'>
      {icon}
      <input
        type='text'
        className='bg-primary text-secondary rounded-md px-4 py-2 font-sans text-lg'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </div>
);
