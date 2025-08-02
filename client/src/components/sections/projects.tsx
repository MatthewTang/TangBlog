import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/content";

export default function Projects() {
  const getTagColor = (tag: string) => {
    const colors = {
      blockchain: "bg-blue-100 text-blue-700",
      ticketing: "bg-emerald-100 text-emerald-700", 
      Database: "bg-slate-100 text-slate-700",
      testing: "bg-slate-100 text-slate-700"
    };
    return colors[tag as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  return (
    <section id="projects" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800">
            Projects
          </h2>
          <a 
            href="#projects" 
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Go to projects →
          </a>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="bg-slate-50 border-0 overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-8">
                <div className="flex gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary"
                      className={`${getTagColor(tag)} hover:${getTagColor(tag)}`}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  {project.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {project.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
