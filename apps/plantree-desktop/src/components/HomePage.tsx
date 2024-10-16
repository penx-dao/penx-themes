import { Suspense } from 'react'
import { useSpaces } from '@/hooks/useSpaces'
import { precision } from '@/lib/math'
import { cn } from '@/lib/utils'
import { useRouter } from '@plantreexyz/hooks'
import { store } from '@plantreexyz/store'
import { Button } from './ui/button'

interface Props {}

export const HomePage = ({}: Props) => {
  const { data: spaces = [], isLoading } = useSpaces()

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="bg-muted h-screen px-6 py-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full gap-4 mx-auto sm:w-full rounded-lg">
        {spaces.map((space, index) => (
          <div
            key={space.id}
            className={cn(
              'flex items-center justify-between p-5 gap-3 bg-white rounded-2xl shadow-sm hover:scale-105 cursor-pointer transition-all',
              // spaces.length !== index + 1 && 'border-b border-neutral-100/90',
            )}
            onClick={() => {
              store.router.routeTo('SPACE_HOME')
            }}
          >
            <div className="flex items-center gap-2">
              <Suspense
                fallback={
                  <div className="w-12 h-12 rounded-lg bg-neutral-100" />
                }
              >
                {/* <SpaceLogo address={space.address} /> */}
              </Suspense>

              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <div className="text-xl font-semibold mr-3">{space.name}</div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="text-neutral-700 text-sm">
                    ${space.symbol}
                  </div>
                  <div className="text-xs text-neutral-500">
                    TVL {precision.toDecimal(space.ethVolume).toFixed(6)} ETH
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-xs text-neutral-500">
                    {space.memberCount} members
                  </div>
                  {/* <div className="flex gap-1">
                    {space.members.map((item) => (
                      <UserAvatar
                        key={item.id}
                        address={item.account}
                        className={cn('w-5 h-5')}
                      />
                    ))}
                  </div> */}
                </div>
              </div>
            </div>
            {/* <Button asChild size="sm" className="cursor-pointer rounded-xl">
              <Link href={`/space/${space.id}`}>Visit space</Link>
            </Button> */}
          </div>
        ))}
      </div>
    </div>
  )
}
