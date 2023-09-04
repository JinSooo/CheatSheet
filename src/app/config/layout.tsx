import ConfigAside from '@/components/Config/ConfigAside'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='h-screen w-screen text-[var(--foreground)] bg-[var(--background)] overflow-auto flex'>
      <ConfigAside />
      <div className='flex-1'>{children}</div>
    </div>
  )
}
