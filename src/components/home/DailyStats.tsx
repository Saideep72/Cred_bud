import { TrendingUp, Users, DollarSign, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react";

const stats = [
  {
    label: "Applications Today",
    value: "1,247",
    change: "+12.5%",
    isPositive: true,
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Approved Today",
    value: "1,089",
    change: "+8.3%",
    isPositive: true,
    icon: TrendingUp,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    label: "Total Disbursed",
    value: "$2.4M",
    change: "+15.2%",
    isPositive: true,
    icon: DollarSign,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    label: "Avg. Decision Time",
    value: "4.2 min",
    change: "-0.8 min",
    isPositive: true,
    icon: Clock,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

const DailyStats = () => {
  return (
    <section className="py-24 gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-heading mb-4">
            Today's <span className="gradient-text">Live Stats</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real-time insights into our lending activity. Transparency is at the
            heart of everything we do.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="glass-card p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.isPositive ? "text-success" : "text-destructive"
                  }`}
                >
                  {stat.isPositive ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-3xl font-display font-bold text-foreground">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 glass-card p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-display font-bold gradient-text mb-2">
                87.3%
              </div>
              <p className="text-muted-foreground">Overall Approval Rate</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-display font-bold text-success mb-2">
                $847
              </div>
              <p className="text-muted-foreground">Average Loan Amount</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-display font-bold text-accent mb-2">
                98.2%
              </div>
              <p className="text-muted-foreground">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyStats;
