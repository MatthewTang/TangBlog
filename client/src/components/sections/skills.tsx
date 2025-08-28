import { Card, CardContent } from "@/components/ui/card";
import { skillCategories } from "@/data/content";

export default function Skills() {
  return (
    <section id="skills" className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            My superpowers
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <Card key={index} className="bg-card border-0 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {category.title}
                </h3>
                <p className="text-muted-foreground">
                  {category.skills}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
