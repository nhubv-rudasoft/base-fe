import { useState } from 'react';
import { NumberInput } from '@libs/ui/raptor';

const BasicExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button className='rounded-[4px] bg-primary px-4 py-2 text-white' onClick={openModal}>
        Mở Modal
      </button>

      <NumberInput
        label='Enter a number'
        locale='vi-VN'
        decimalPlaces={2}
        allowNegative={true}
        size='md'
        placeholder='Type a number...'
      />

      {/* <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalHeader>
          <ModalTitle>Xác nhận thông tin</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p>Bạn có chắc chắn muốn thực hiện hành động này?</p>
        </ModalBody>
        <ModalFooter>
          <button
            className='rounded-[4px] border border-[#B4BFC9] px-4 py-2 text-[#222222] hover:bg-neutral100 font-roboto text-sm leading-[1.71]'
            onClick={closeModal}
          >
            Hủy
          </button>
          <button
            className='rounded-[4px] bg-[#D2132C] px-4 py-[10px] text-white hover:bg-[#D2132C]/90 font-roboto text-[13px] leading-[1.54]'
            onClick={() => {
              // Xử lý logic xác nhận
              closeModal();
            }}
          >
            Xác nhận
          </button>
        </ModalFooter>
      </Modal> */}
    </div>
  );
};

export default BasicExample;
