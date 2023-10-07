import Header from '@/components/Update/Header'
import Update from '@/components/Update/Update'

export default function Page() {
  return (
    <div className='h-screen w-screen relative text-[var(--foreground)] bg-[var(--background-fore)] rounded-xl overflow-hidden'>
      <Header />
      <Update />
    </div>
  )
}
