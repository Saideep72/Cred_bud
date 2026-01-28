import { Upload, Brain, FileCheck, Banknote } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Transaction Data",
    description:
      "Simply upload your last 3 months of bank transactions in CSV format. Your data is encrypted and secure.",
    color: "bg-primary",
  },
  {
    icon: Brain,
    title: "AI Analyzes Behavior",
    description:
      "Our advanced AI examines your spending patterns, income stability, and financial responsibility.",
    color: "bg-accent",
  },
  {
    icon: FileCheck,
    title: "Get Explainable Decision",
    description:
      "Receive a clear, transparent credit decision with detailed explanations of all factors considered.",
    color: "bg-success",
  },
  {
    icon: Banknote,
    title: "Receive Your Funds",
    description:
      "Once approved, funds are transferred directly to your account within 24 hours.",
    color: "bg-primary",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-heading mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our streamlined process makes getting a loan simple and stress-free.
            From application to approval in just a few steps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent z-0" />
              )}

              <div className="relative z-10 glass-card p-6 h-full hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">
                  {index + 1}
                </div>

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center mb-5`}
                >
                  <step.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                <h3 className="font-display font-semibold text-lg mb-3 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
