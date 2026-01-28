import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { TrendingUp, Users, Award, Building2, IndianRupee, Target, Clock } from "lucide-react";

const approvalRateData = [
  { name: "HDFC Bank", rate: 94, fill: "hsl(173, 58%, 39%)" },
  { name: "ICICI Bank", rate: 91, fill: "hsl(185, 72%, 32%)" },
  { name: "SBI", rate: 89, fill: "hsl(152, 69%, 40%)" },
  { name: "Axis Bank", rate: 87, fill: "hsl(35, 91%, 55%)" },
  { name: "Kotak Bank", rate: 85, fill: "hsl(173, 58%, 39%)" },
  { name: "PNB", rate: 83, fill: "hsl(185, 72%, 32%)" },
  { name: "Bank of Baroda", rate: 81, fill: "hsl(152, 69%, 40%)" },
  { name: "Canara Bank", rate: 79, fill: "hsl(35, 91%, 55%)" },
  { name: "Union Bank", rate: 77, fill: "hsl(173, 58%, 39%)" },
  { name: "IDBI Bank", rate: 75, fill: "hsl(185, 72%, 32%)" },
];

const trustScoreData = [
  { name: "HDFC", score: 98, users: 45000 },
  { name: "ICICI", score: 95, users: 38000 },
  { name: "SBI", score: 93, users: 52000 },
  { name: "Axis", score: 91, users: 32000 },
  { name: "Kotak", score: 89, users: 28000 },
];

const userDistribution = [
  { name: "HDFC Bank", value: 32, color: "hsl(173, 58%, 39%)" },
  { name: "ICICI Bank", value: 26, color: "hsl(185, 72%, 32%)" },
  { name: "SBI", value: 22, color: "hsl(152, 69%, 40%)" },
  { name: "Axis Bank", value: 12, color: "hsl(35, 91%, 55%)" },
  { name: "Others", value: 8, color: "hsl(210, 40%, 80%)" },
];

const monthlyTrends = [
  { month: "Jan", approvals: 8500, applications: 9200, amount: 45000000 },
  { month: "Feb", approvals: 9200, applications: 9800, amount: 52000000 },
  { month: "Mar", approvals: 10100, applications: 10800, amount: 61000000 },
  { month: "Apr", approvals: 11200, applications: 12100, amount: 73000000 },
  { month: "May", approvals: 12500, applications: 13500, amount: 85000000 },
  { month: "Jun", approvals: 14100, applications: 15200, amount: 98000000 },
];

const loanAmountData = [
  { range: "₹0-5L", count: 3500, avgAmount: 350000 },
  { range: "₹5-10L", count: 4800, avgAmount: 750000 },
  { range: "₹10-25L", count: 6200, avgAmount: 1750000 },
  { range: "₹25-50L", count: 2800, avgAmount: 3750000 },
  { range: "₹50L+", count: 1200, avgAmount: 7500000 },
];

const processingTimeData = [
  { bank: "HDFC Bank", minHours: 24, avgHours: 48, maxHours: 72 },
  { bank: "ICICI Bank", minHours: 36, avgHours: 60, maxHours: 96 },
  { bank: "SBI", minHours: 48, avgHours: 72, maxHours: 120 },
  { bank: "Axis Bank", minHours: 24, avgHours: 54, maxHours: 84 },
  { bank: "Kotak Bank", minHours: 36, avgHours: 66, maxHours: 96 },
];

const stateWiseData = [
  { state: "Maharashtra", applications: 18500, approvals: 17200, amount: 125000000 },
  { state: "Karnataka", applications: 14200, approvals: 13100, amount: 98000000 },
  { state: "Delhi NCR", applications: 16800, approvals: 15400, amount: 112000000 },
  { state: "Gujarat", applications: 12300, approvals: 11200, amount: 85000000 },
  { state: "Tamil Nadu", applications: 10900, approvals: 9800, amount: 72000000 },
  { state: "West Bengal", applications: 8700, approvals: 7900, amount: 58000000 },
];

const formatCurrency = (value: number) => {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(1)}Cr`;
  } else if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  } else {
    return `₹${value.toLocaleString('en-IN')}`;
  }
};

const Statistics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Indian Bank <span className="gradient-text">Statistics</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive data on loan approval rates, trust scores, and user
              distribution across major Indian banks.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: TrendingUp,
                label: "Highest Approval Rate",
                value: "94%",
                bank: "HDFC Bank",
                color: "text-primary",
                bgColor: "bg-primary/10",
              },
              {
                icon: Award,
                label: "Most Trusted Bank",
                value: "98/100",
                bank: "HDFC Bank",
                color: "text-success",
                bgColor: "bg-success/10",
              },
              {
                icon: Users,
                label: "Most Users",
                value: "52,000+",
                bank: "SBI",
                color: "text-accent",
                bgColor: "bg-accent/10",
              },
              {
                icon: IndianRupee,
                label: "Avg Loan Amount",
                value: "₹12.5L",
                bank: "National Average",
                color: "text-primary",
                bgColor: "bg-primary/10",
              },
            ].map((stat) => (
              <div key={stat.label} className="stat-card">
                <div className={`p-3 rounded-xl ${stat.bgColor} w-fit mb-4`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-2xl font-display font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xs text-primary mt-2">{stat.bank}</p>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Approval Rate Chart */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-display font-semibold text-foreground mb-6">
                Top 10 Indian Banks by Approval Rate
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={approvalRateData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 31%, 91%)" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(210, 31%, 91%)",
                      borderRadius: "12px",
                    }}
                  />
                  <Bar dataKey="rate" fill="hsl(173, 58%, 39%)" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* User Distribution Pie Chart */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-display font-semibold text-foreground mb-6">
                User Distribution by Bank
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={userDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={140}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {userDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Loan Amount Distribution */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-display font-semibold text-foreground mb-6">
                Loan Amount Distribution
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={loanAmountData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 31%, 91%)" />
                  <XAxis dataKey="range" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" tickFormatter={formatCurrency} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(210, 31%, 91%)",
                      borderRadius: "12px",
                    }}
                    formatter={(value: any, name: string) => {
                      if (name === 'avgAmount') return [formatCurrency(value), 'Avg Amount'];
                      return [value, 'Applications'];
                    }}
                  />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="count"
                    fill="hsl(173, 58%, 39%)"
                    name="Applications"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="avgAmount"
                    fill="hsl(35, 91%, 55%)"
                    name="Avg Amount"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Processing Time Analysis */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-display font-semibold text-foreground mb-6">
                Processing Time Analysis (Hours)
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={processingTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 31%, 91%)" />
                  <XAxis dataKey="bank" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(210, 31%, 91%)",
                      borderRadius: "12px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="minHours" fill="hsl(152, 69%, 40%)" name="Min Hours" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="avgHours" fill="hsl(173, 58%, 39%)" name="Avg Hours" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="maxHours" fill="hsl(35, 91%, 55%)" name="Max Hours" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* State-wise Analysis */}
          <div className="glass-card p-6 mb-8">
            <h3 className="text-lg font-display font-semibold text-foreground mb-6">
              State-wise Loan Analysis
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={stateWiseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 31%, 91%)" />
                <XAxis dataKey="state" angle={-45} textAnchor="end" height={80} />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" tickFormatter={formatCurrency} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(210, 31%, 91%)",
                    borderRadius: "12px",
                  }}
                  formatter={(value: any, name: string) => {
                    if (name === 'amount') return [formatCurrency(value), 'Total Amount'];
                    return [value.toLocaleString('en-IN'), name];
                  }}
                />
                <Legend />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="applications"
                  stackId="1"
                  stroke="hsl(210, 40%, 70%)"
                  fill="hsl(210, 40%, 70%)"
                  name="Applications"
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="approvals"
                  stackId="1"
                  stroke="hsl(152, 69%, 40%)"
                  fill="hsl(152, 69%, 40%)"
                  name="Approvals"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="amount"
                  stroke="hsl(35, 91%, 55%)"
                  strokeWidth={3}
                  dot={{ fill: "hsl(35, 91%, 55%)", strokeWidth: 2, r: 4 }}
                  name="Total Amount"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Trends with Amount */}
          <div className="glass-card p-6 mb-8">
            <h3 className="text-lg font-display font-semibold text-foreground mb-6">
              Monthly Application Trends with Disbursement Amount
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 31%, 91%)" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" tickFormatter={formatCurrency} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(210, 31%, 91%)",
                    borderRadius: "12px",
                  }}
                  formatter={(value: any, name: string) => {
                    if (name === 'amount') return [formatCurrency(value), 'Disbursement'];
                    return [value.toLocaleString('en-IN'), name];
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="applications"
                  stroke="hsl(210, 40%, 70%)"
                  strokeWidth={3}
                  dot={{ fill: "hsl(210, 40%, 70%)", strokeWidth: 2, r: 4 }}
                  name="Applications"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="approvals"
                  stroke="hsl(152, 69%, 40%)"
                  strokeWidth={3}
                  dot={{ fill: "hsl(152, 69%, 40%)", strokeWidth: 2, r: 4 }}
                  name="Approvals"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="amount"
                  stroke="hsl(35, 91%, 55%)"
                  strokeWidth={3}
                  dot={{ fill: "hsl(35, 91%, 55%)", strokeWidth: 2, r: 4 }}
                  name="Disbursement"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bank Rankings Table */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-display font-semibold text-foreground mb-6">
              Complete Indian Bank Rankings
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold text-foreground">
                      Rank
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-foreground">
                      Bank Name
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-foreground">
                      Approval Rate
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-foreground">
                      Trust Score
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-foreground">
                      Total Users
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-foreground">
                      Avg Loan Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {approvalRateData.slice(0, 5).map((bank, index) => (
                    <tr
                      key={bank.name}
                      className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <span
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            index === 0
                              ? "bg-accent text-accent-foreground"
                              : index === 1
                              ? "bg-muted text-muted-foreground"
                              : index === 2
                              ? "bg-accent/50 text-accent-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {index + 1}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-medium text-foreground">
                        {bank.name}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${bank.rate}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            {bank.rate}%
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
                          {98 - index * 2}/100
                        </span>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        {(52000 - index * 5000).toLocaleString('en-IN')}+
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        {formatCurrency(1500000 - index * 200000)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Additional Insights */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-display font-semibold text-foreground">
                  Quick Approval
                </h3>
              </div>
              <p className="text-3xl font-bold text-primary mb-2">24-48 hrs</p>
              <p className="text-sm text-muted-foreground">
                Fastest approval time for pre-verified customers with HDFC Bank
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-accent" />
                <h3 className="text-lg font-display font-semibold text-foreground">
                  Peak Processing
                </h3>
              </div>
              <p className="text-3xl font-bold text-accent mb-2">2-3 days</p>
              <p className="text-sm text-muted-foreground">
                Average processing time for complete loan applications
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <IndianRupee className="w-6 h-6 text-success" />
                <h3 className="text-lg font-display font-semibold text-foreground">
                  Total Disbursement
                </h3>
              </div>
              <p className="text-3xl font-bold text-success mb-2">₹4.1Cr</p>
              <p className="text-sm text-muted-foreground">
                Monthly average loan amount disbursed across all banks
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Statistics;
