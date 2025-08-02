import { Button } from "@/components/ui/button";
import { profileData } from "@/data/content";

export default function Hero() {
  const handleContactClick = () => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-shrink-0">
            <img 
              src={profileData.profileImage}
              alt={`${profileData.name} - ${profileData.title}`}
              className="w-64 h-64 lg:w-80 lg:h-80 rounded-3xl shadow-2xl object-cover"
            />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
              {profileData.name}
            </h1>
            <p className="text-xl lg:text-2xl text-slate-600 mb-6">
              {profileData.title}
            </p>
            <p className="text-lg lg:text-xl text-slate-700 mb-8 font-medium">
              {profileData.tagline}
            </p>
            <p className="text-base lg:text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl">
              {profileData.bio}
            </p>
            <Button 
              onClick={handleContactClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium shadow-lg"
            >
              Contacts
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
