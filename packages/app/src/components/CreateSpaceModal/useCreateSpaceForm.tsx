import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast, useModalContext } from 'uikit'
import { TreeDirService } from '@plantreexyz/service'
import { createTree } from '../../common/createTree'

export type CreateSpaceValues = {
  name: string
}

export function useCreateSpaceForm() {
  const ctx = useModalContext<boolean>()
  const form = useForm<CreateSpaceValues>({
    defaultValues: {
      name: '',
    },
  })

  const name = form.watch('name')

  useEffect(() => {
    const newValue = name
      .toLowerCase()
      .trim()
      .replace(/[\W_]+/g, '-')
    if (name !== newValue) form.setValue('name', newValue)
  }, [name, form])

  const onSubmit: SubmitHandler<CreateSpaceValues> = async (data) => {
    try {
      //
      console.log('3')

      const treeDir = await TreeDirService.init()

      if (treeDir.isExists(data.name)) {
        toast.error('Tree name already exists!')
        return
      }

      await createTree(data.name)
      console.log('data:', data)

      // ctx?.close?.()
    } catch (error) {
      console.log('========error:', error)

      toast.error('Create space failed!')
    } finally {
      ctx?.setData?.(false)
    }
  }

  return { ...form, onSubmit: form.handleSubmit(onSubmit) }
}
