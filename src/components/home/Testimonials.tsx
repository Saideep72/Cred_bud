import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    location: "Chicago, IL",
    rating: 5,
    text: "I was denied by traditional banks because of my thin credit file. CredBud looked at my actual financial behavior and approved me in minutes. Life-changing!",
    avatar: "SM",
  },
  {
    name: "Marcus T.",
    location: "Atlanta, GA",
    rating: 5,
    text: "The transparency is incredible. They showed me exactly why I was approved and what factors they considered. No other lender does this.",
    avatar: "MT",
  },
  {
    name: "Elena R.",
    location: "Miami, FL",
    rating: 5,
    text: "As a freelancer with variable income, getting credit was always hard. CredBud understood my income patterns and gave me a fair rate.",
    avatar: "ER",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-heading mb-4">
            Trusted by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real stories from real people who got the credit they deserved.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="glass-card p-6 hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="w-10 h-10 text-primary/20 mb-4" />

              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-accent text-accent"
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-semibold text-primary">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
