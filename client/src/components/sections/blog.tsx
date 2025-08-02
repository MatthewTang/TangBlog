import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

export default function Blog() {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['/api/blog'],
    queryFn: async () => {
      const response = await fetch('/api/blog');
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      return response.json();
    }
  });

  const recentPosts = posts.slice(0, 3);

  if (isLoading) {
    return (
      <section id="blog" className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Blog
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white border-0">
                <CardContent className="p-8">
                  <div className="animate-pulse">
                    <div className="h-4 bg-slate-200 rounded mb-4"></div>
                    <div className="h-6 bg-slate-200 rounded mb-4"></div>
                    <div className="h-4 bg-slate-200 rounded mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded mb-6"></div>
                    <div className="h-4 bg-slate-200 rounded w-24"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
            Blog
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post: any) => (
            <Card key={post.slug} className="bg-white border-0 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Read more →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
