import { Box, styled } from '@fower/react'
import { open } from '@tauri-apps/plugin-shell'
import { ExternalLink } from 'lucide-react'
import { Button } from 'uikit'
import { useSelectedTreeName, useTrees } from '@plantreexyz/hooks'

const Title = styled('div', [
  'neutral400',
  'fontMedium',
  'textBase',
  'mb1',
  'uppercase',
])

function Link({ href }: { href: string }) {
  return (
    <Box
      textBase
      neutral500
      neutral800--hover
      cursorPointer
      breakWords
      toCenterY
      gap1
      onClick={() => {
        open(href)
      }}
    >
      <Box breakWords>{href}</Box>
      <Box>
        <ExternalLink size={16}></ExternalLink>
      </Box>
    </Box>
  )
}

export const DomainsModalContent = () => {
  const { activeTree, trees } = useTrees()
  const { cid, ipns } = activeTree

  const plantreeLink = `https://${activeTree.cid}.plantree.xyz`
  return (
    <Box column gap7 pt4>
      <Box column gap2>
        <Title>Plantree gateway</Title>
        <Link href={plantreeLink} />
        <Box mt1>
          <Button colorScheme="black">Custom domain</Button>
        </Box>
      </Box>

      <Box column gap2>
        <Title>Public gateway</Title>
        <Link href={`https://${ipns}.eth.sucks`} />
        <Link href={`https://${ipns}.ipfs2.eth.limo`} />
      </Box>

      <Box column gap2 neutral500>
        <Title>IPFS</Title>
        <Box toCenterY gap1>
          <Box textXS>(CID)</Box>
          <Box>{cid}</Box>
        </Box>
        <Box toCenterY gap1>
          <Box textXS>(IPNS)</Box>
          <Box>{ipns}</Box>
        </Box>
      </Box>
    </Box>
  )
}
