// import { useState } from 'react';
// import {
//   Modal,
//   ModalHeader,
//   ModalTitle,
//   ModalBody,
//   ModalFooter,
//   TextInput,
//   Select,
//   NumberInput,
// } from '@libs/ui/raptor';

// const FormModal = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//   });

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     // Xử lý dữ liệu form
//     console.log('Form data:', formData);
//     closeModal();
//   };

//   return (
//     <div className='py-16'>
//       <button className='rounded-[4px] bg-primary px-4 py-2 text-white' onClick={openModal}>
//         Thêm người dùng
//       </button>

//       <Modal isOpen={isOpen} onClose={closeModal} size='md'>
//         <ModalHeader>
//           <ModalTitle>Thêm người dùng mới</ModalTitle>
//         </ModalHeader>
//         <ModalBody>
//           <div className='space-y-4'>
//             <TextInput label='Họ tên' name='name' value={formData.name} onChange={handleChange} />
//             <TextInput label='Email' name='email' value={formData.email} onChange={handleChange} />
//             <Select
//               label='Giới tính'
//               name='gender'
//               options={[
//                 { label: 'Nam', value: 'male' },
//                 { label: 'Nữ', value: 'female' },
//               ]}
//             />
//             <NumberInput
//               label='VND Currency'
//               placeholder='Nhập số tiền'
//               currency
//               locale='vi-VN'
//               precision={0}
//               showStepper
//             />
//           </div>
//         </ModalBody>
//         <ModalFooter>
//           <button
//             className='rounded-[4px] border border-[#B4BFC9] px-4 py-2 text-[#222222] hover:bg-neutral100 font-roboto text-sm leading-[1.71]'
//             onClick={closeModal}
//           >
//             Hủy
//           </button>
//           <button
//             className='rounded-[4px] bg-[#D2132C] px-4 py-[10px] text-white hover:bg-[#D2132C]/90 font-roboto text-[13px] leading-[1.54]'
//             onClick={handleSubmit}
//           >
//             Lưu
//           </button>
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// };

// export default FormModal;
