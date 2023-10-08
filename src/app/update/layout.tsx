'use client'

import { DragRegion } from '@/components/common/DragRegion'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='w-full h-full text-[var(--foreground)] bg-[var(--background-fore)] overflow-hidden rounded-sm'>
      <DragRegion />
      {children}
    </div>
  )
}
