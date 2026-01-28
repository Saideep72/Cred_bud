import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, CheckCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen gradient-bg overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-success/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                AI-Powered Credit Decisions
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
              Smart Credit for{" "}
              <span className="gradient-text">Everyone</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Our AI analyzes your financial behavior to provide fair, transparent
              loan decisions. No hidden fees, no bias—just smart lending for
              underbanked communities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/apply">
                <Button variant="hero" size="lg" className="gap-2">
                  Apply for Loan
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/statistics">
                <Button variant="outline" size="lg">
                  View Bank Stats
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              {[
                "No credit score required",
                "Decision in minutes",
                "100% transparent",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Stats Cards */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="stat-card animate-float" style={{ animationDelay: "0s" }}>
                <div className="text-4xl font-display font-bold gradient-text">
                  94%
                </div>
                <p className="text-muted-foreground text-sm mt-2">
                  Approval Rate
                </p>
              </div>
              <div className="stat-card animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="text-4xl font-display font-bold text-success">
                  5min
                </div>
                <p className="text-muted-foreground text-sm mt-2">
                  Average Decision Time
                </p>
              </div>
              <div className="stat-card animate-float" style={{ animationDelay: "1s" }}>
                <div className="text-4xl font-display font-bold text-accent">
                  50K+
                </div>
                <p className="text-muted-foreground text-sm mt-2">
                  Loans Approved
                </p>
              </div>
              <div className="stat-card animate-float" style={{ animationDelay: "1.5s" }}>
                <div className="flex items-center gap-2">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <p className="text-muted-foreground text-sm mt-2">
                  Bank-Level Security
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
