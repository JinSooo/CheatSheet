import ShortCut from '@/components/ShortCut/ShortCut'

export default function Home() {
  return (
    <div className='h-screen w-screen rounded-2xl text-[var(--foreground)] bg-[var(--background)] overflow-auto no-scrollbar'>
      <ShortCut />
    </div>
  )
}
