import { profileData } from "@/data/content";

export default function Biography() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-8">
            Biography
          </h2>
        </div>
        <div className="prose prose-lg mx-auto text-slate-600 leading-relaxed">
          <p className="mb-6 text-lg">
            {profileData.biography.paragraph1}
          </p>
          <p className="text-lg">
            {profileData.biography.paragraph2}
          </p>
        </div>
      </div>
    </section>
  );
}
