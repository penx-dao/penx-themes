import { Box } from '@fower/react'
import { Modal, ModalCloseButton, ModalContent, ModalOverlay } from 'uikit'
import { ModalNames } from '@plantreexyz/constants'
import { DomainsModalContent } from './DomainsModalContent'

export const DomainsModal = () => {
  return (
    <Modal name={ModalNames.DOMAINS}>
      <ModalOverlay />
      <ModalContent w={['100%']} h-100vh px={[20, 32]} py20 roundedNone--i>
        <ModalCloseButton />
        <Box column w={['100%', 760, 800]} mx-auto gap2>
          <Box fontSemibold text3XL>
            Visit my site
          </Box>
          <DomainsModalContent />
        </Box>
      </ModalContent>
    </Modal>
  )
}
