import { Button } from './ui/button'

interface Props {}

export const HomePage = ({}: Props) => {
  return (
    <div className="bg-muted h-screen">
      <Button>Click me</Button>
      <Button variant="destructive">Click me</Button>
      <Button variant="outline">Click me</Button>
      <div className="bg-amber-200">Home page</div>
    </div>
  )
}
