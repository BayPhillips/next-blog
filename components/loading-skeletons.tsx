export function PostCardSkeleton() {
  return (
    <article className="animate-pulse">
      <div className="border-b pb-8 mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-6 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </article>
  )
}

export function PostListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="max-w-2xl mx-auto">
      {Array.from({ length: count }, (_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <section className="animate-pulse">
      <div className="max-w-4xl mx-auto text-center py-16">
        <div className="h-12 bg-gray-200 rounded w-2/3 mx-auto mb-6"></div>
        <div className="space-y-4 mb-8">
          <div className="h-5 bg-gray-200 rounded w-full"></div>
          <div className="h-5 bg-gray-200 rounded w-5/6 mx-auto"></div>
          <div className="h-5 bg-gray-200 rounded w-4/5 mx-auto"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-32 mx-auto"></div>
      </div>
    </section>
  )
}