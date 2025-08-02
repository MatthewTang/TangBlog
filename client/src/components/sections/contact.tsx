import { Mail, Phone, MapPin } from "lucide-react";
import { contactInfo } from "@/data/content";

export default function Contact() {
  const contactItems = [
    {
      icon: Mail,
      title: "Email",
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Phone,
      title: "Phone", 
      value: contactInfo.phone,
      href: `tel:+85266750566`,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    },
    {
      icon: MapPin,
      title: "Address",
      value: contactInfo.location,
      href: null,
      color: "text-slate-600",
      bgColor: "bg-slate-100"
    }
  ];

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
            Contacts
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactItems.map((item) => (
            <div key={item.title} className="text-center p-6">
              <div className={`w-16 h-16 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                {item.title}
              </h3>
              {item.href ? (
                <a 
                  href={item.href}
                  className={`${item.color} hover:opacity-70 transition-opacity`}
                >
                  {item.value}
                </a>
              ) : (
                <span className="text-slate-600">{item.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
