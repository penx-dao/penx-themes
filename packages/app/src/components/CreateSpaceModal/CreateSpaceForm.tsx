import { Controller } from 'react-hook-form'
import { Box } from '@fower/react'
import { Button, Input, ModalClose, Spinner, useModalContext } from 'uikit'
import { useCreateSpaceForm } from './useCreateSpaceForm'

export function CreateSpaceForm() {
  const { data: loading } = useModalContext<boolean>()
  const form = useCreateSpaceForm()
  const { control, formState } = form
  const { isValid } = formState

  return (
    <Box as="form" onSubmit={form.onSubmit} column gap6 pt3>
      <Box mb--12 fontMedium>
        Space Name
      </Box>
      <Controller
        name="name"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input autoFocus size="lg" placeholder="Name your space" {...field} />
        )}
      />

      <Box toCenterY toRight gap2 mt2>
        <ModalClose asChild>
          <Button
            flex-1
            type="button"
            size="lg"
            roundedFull
            colorScheme="white"
          >
            Cancel
          </Button>
        </ModalClose>

        <Button
          type="submit"
          size="lg"
          colorScheme="black"
          flex-1
          roundedFull
          disabled={!isValid || loading}
          gap2
        >
          {loading && <Spinner white square5 />}
          <Box>Create</Box>
        </Button>
      </Box>
    </Box>
  )
}
