import { useState } from 'react'
import { Box } from '@fower/react'
import { Button, Spinner, toast } from 'uikit'
import { usePublishing, useTrees } from '@plantreexyz/hooks'
import { TreeService } from '@plantreexyz/service'

export const PublishButton = () => {
  const { activeTree } = useTrees()
  const { publishing } = usePublishing()
  async function publish() {
    try {
      const treeService = new TreeService(activeTree)
      const res = await treeService.publish()

      toast.success(res)
    } catch (error: any) {
      toast.error(error?.message || 'Failed to publish site.')
    }
  }
  return (
    <Button
      w-100p
      gap1
      colorScheme="black"
      disabled={publishing.isLoading}
      onClick={async () => {
        await publish()
      }}
    >
      {publishing.isLoading && <Spinner color="white" square4></Spinner>}
      <Box>{publishing.status}</Box>
    </Button>
  )
}
