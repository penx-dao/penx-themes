'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAccount } from 'wagmi'
import { AddContributorDialog } from './AddContributorDialog/AddContributorDialog'
import { AddShareOrderDialog } from './AddShareOrderDialog/AddShareOrderDialog'
import { AddVestingDialog } from './AddVestingDialog/AddVestingDialog'
import { BuyShareDialog } from './BuyShareDialog/BuyShareDialog'
import { ClaimShareRewards } from './ClaimShareRewards'
import { ContributorList } from './ContributorList'
import { GiveShareDialog } from './GiveShareDialog/GiveShareDialog'
import { ShareOrderList } from './ShareOrderList'
import { VestingList } from './VestingList'

enum TabTypes {
  Holders = 'Holders',
  Funding = 'Funding',
  Vesting = 'Vesting',
}

export default function Page() {
  const [type, setType] = useState(TabTypes.Holders)
  const { isConnected } = useAccount()
  return (
    <div className="space-y-4">
      <GiveShareDialog />
      <BuyShareDialog />

      {isConnected && <ClaimShareRewards />}

      <Tabs
        className="w-full"
        value={type}
        onValueChange={(v) => {
          setType(v as TabTypes)
        }}
      >
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value={TabTypes.Holders}>Holders</TabsTrigger>
            <TabsTrigger value={TabTypes.Funding}>Funding</TabsTrigger>
            <TabsTrigger value={TabTypes.Vesting}>Vesting</TabsTrigger>
          </TabsList>
          {type === TabTypes.Holders && <AddContributorDialog />}
          {type === TabTypes.Funding && <AddShareOrderDialog />}
          {type === TabTypes.Vesting && <AddVestingDialog />}
        </div>
        <TabsContent value={TabTypes.Holders} className="pt-4">
          <ContributorList />
        </TabsContent>
        <TabsContent value={TabTypes.Funding} className="pt-4">
          <ShareOrderList />
        </TabsContent>
        <TabsContent value={TabTypes.Vesting} className="pt-4">
          <VestingList />
        </TabsContent>
      </Tabs>
    </div>
  )
}
