import { useParams, Link } from "wouter";
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import { getPostBySlug } from "@/lib/blog";

export default function BlogPost() {
  const { slug } = useParams();
  
  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => (slug ? getPostBySlug(slug) : Promise.resolve(undefined)),
    enabled: !!slug
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <main className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-10 bg-slate-200 rounded mb-6 w-32"></div>
              <div className="h-4 bg-slate-200 rounded mb-4 w-24"></div>
              <div className="h-12 bg-slate-200 rounded mb-6"></div>
              <div className="h-6 bg-slate-200 rounded mb-8"></div>
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <main className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardContent className="p-8 text-center">
                <h1 className="text-2xl font-bold text-slate-800 mb-4">
                  Blog post not found
                </h1>
                <p className="text-slate-600 mb-6">
                  The blog post you're looking for doesn't exist.
                </p>
                <Link href="/">
                  <Button>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <div className="flex items-center gap-2 text-slate-500 mb-4">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          <Card>
            <CardContent className="p-8">
              <div 
                className="prose-content max-w-none"
                dangerouslySetInnerHTML={{
                  __html: post.content.replace(/\n/g, '<br>').replace(/#{1,3}\s/g, (match: string) => {
                    const level = match.trim().length;
                    return level === 1 ? '<h1 class="text-3xl font-semibold mt-8 mb-4 text-slate-800">' :
                           level === 2 ? '<h2 class="text-2xl font-semibold mt-6 mb-3 text-slate-800">' :
                           '<h3 class="text-xl font-semibold mt-4 mb-2 text-slate-800">';
                  }).replace(/```[\s\S]*?```/g, (match: string) => {
                    const code = match.slice(3, -3);
                    return `<pre class="bg-slate-100 p-4 rounded-lg overflow-x-auto my-4"><code>${code}</code></pre>`;
                  }).replace(/`([^`]+)`/g, '<code class="bg-slate-100 px-2 py-1 rounded text-sm">$1</code>')
                    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
                    .replace(/^\d+\.\s/gm, '<li>')
                    .replace(/^-\s/gm, '<li>')
                }}
              />
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
