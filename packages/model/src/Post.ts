import { format } from 'date-fns'
import YAML from 'yaml'

export interface Frontmatter {
  title: string
  description: string
  pubDate: string
  heroImage: string
}

export interface FrontmatterResult {
  frontmatter: Frontmatter
  mainContent: string
}

export function splitFrontmatter(text: string): FrontmatterResult {
  // Regex pattern to strictly match frontmatter at the start of the text
  const pattern = /^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/
  const match = text.match(pattern)

  if (match) {
    const frontmatterText = match[1].trim()
    const mainContent = match[2].trim()

    // Use yaml to parse frontmatter
    const frontmatter = YAML.parse(frontmatterText)

    return { frontmatter, mainContent }
  }

  return { frontmatter: {} as unknown as Frontmatter, mainContent: text }
}

export class Post {
  frontmatter: Frontmatter
  content = ''

  constructor(
    public fullPath: string,
    public raw: string,
  ) {
    const { frontmatter, mainContent } = splitFrontmatter(raw)
    this.frontmatter = frontmatter
    this.content = mainContent || ''
  }

  get title() {
    return this.frontmatter.title
  }

  get fileName() {
    const match = this.fullPath.match(/[^\\/]+$/)
    return match ? match[0] : ''
  }

  get pubDateFormatted() {
    if (!this.frontmatter.pubDate) return ''
    return format(new Date(this.frontmatter.pubDate), 'MMMM d, yyyy')
  }

  get wordCount() {
    return this.content.length
  }

  get brief() {
    return truncateText(this.content, 40)
  }

  updateFrontmatter(newFrontmatter: Partial<Frontmatter>) {
    this.frontmatter = { ...this.frontmatter, ...newFrontmatter }
  }

  updateContent(newContent: string) {
    this.content = newContent
  }

  toMarkdown() {
    const frontmatterYaml = YAML.stringify(this.frontmatter)
    return `---\n${frontmatterYaml}---\n\n${this.content}`
  }
}

function truncateText(text: string, limit: number): string {
  const words = text.match(/\S+/g)
  if (!words) return ''
  const truncatedWords = words.slice(0, limit).join(' ')
  return truncatedWords
}
