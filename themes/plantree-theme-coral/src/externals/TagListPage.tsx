import { slug } from 'github-slugger'
import Link from '../components/Link'
import PageTitle from '../components/PageTitle'
import Tag from '../components/Tag'
import { TagList } from '../components/TagList'

interface Props {
  tagData: Record<string, number>
}

export function TagListPage({ tagData }: Props) {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <div className="flex flex-col">
      <PageTitle>Tags</PageTitle>

      <div className="grid gap-y-3">
        {tagKeys.length === 0 && 'No tags found.'}
        {tagKeys.length > 0 && <TagList tagData={tagData} />}
      </div>
    </div>
  )
}
