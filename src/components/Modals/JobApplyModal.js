import { Modal, ModalBody, SIZE, ROLE,  } from 'baseui/modal';
import Text from 'components/Form/Text';

const ApplyJob =({ isOpen, onClose, state })=>{
return(
    <Modal
      onClose={onClose}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
      overrides={{
        Dialog: {
          style: {
            padding: '20px',
          },
        },
      }}

    >

<ModalBody align="center"
        justify="center" >

            <Text>new modal</Text>
        </ModalBody>
    </Modal>
)
}
export default ApplyJob