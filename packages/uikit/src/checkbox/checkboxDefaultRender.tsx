import { Box } from '@fower/react'
import { Check } from 'lucide-react'
import { CheckboxStatus } from './types'

export const checkboxDefaultRender = ({
  checked,
  colorScheme,
}: CheckboxStatus & { colorScheme: string }) => {
  const atomicProps: any = {}
  if (!!checked) {
    atomicProps.borderColor = colorScheme
    atomicProps.bg = colorScheme
    atomicProps.color = 'white'
  }

  return (
    <Box
      toCenter
      square-20
      roundedLG
      border-1
      borderGray400={!checked}
      bgBrand500={checked}
      {...atomicProps}
    >
      <Check
        size={12}
        style={{
          strokeWidth: '2px',
          opacity: checked ? 100 : 0,
        }}
      />
    </Box>
  )
}
