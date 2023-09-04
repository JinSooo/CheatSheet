import routes from '@/components/Config/routes'

export default function Page({ params }: { params: { slug: string } }) {
  return routes.find((route) => route.id === params.slug)?.element
}
