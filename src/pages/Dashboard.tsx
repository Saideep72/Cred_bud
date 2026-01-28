import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Edit,
  Download,
  Bell,
  Shield,
  Activity,
  Target,
  Eye,
  RefreshCw,
  Info,
  Zap,
  Award,
  Upload,
} from "lucide-react";

const userData = {
  name: "Rajesh Kumar",
  email: "rajesh.kumar@example.com",
  phone: "+91 98765 43210",
  address: "123 MG Road, Bangalore, Karnataka 560001",
  memberSince: "January 2024",
  avatar: "RK",
  creditScore: 77,
};

type LoanApplication = {
  id: string;
  amount: number;
  term: string;
  purpose: string;
  status: "approved" | "pending" | "rejected";
  appliedDate: string;
  bank: string;
  monthlyPayment?: number;
  reason?: string;
};

const loanApplications: LoanApplication[] = [
  {
    id: "LA-2024-001",
    amount: 500000,
    term: "12 months",
    purpose: "Home Renovation",
    status: "approved",
    appliedDate: "2024-01-15",
    bank: "HDFC Bank",
    monthlyPayment: 43650,
  },
  {
    id: "LA-2024-002",
    amount: 300000,
    term: "6 months",
    purpose: "Emergency Fund",
    status: "pending",
    appliedDate: "2024-01-20",
    bank: "ICICI Bank",
  },
  {
    id: "LA-2023-003",
    amount: 800000,
    term: "24 months",
    purpose: "Vehicle Purchase",
    status: "rejected",
    appliedDate: "2023-12-10",
    bank: "SBI",
    reason: "Insufficient income stability",
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [refreshing, setRefreshing] = useState(false);

  const handleApplyNewLoan = () => {
    window.location.href = '/apply';
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleImproveScore = () => {
    alert('Credit Score Improvement Tips:\n\n1. Pay all bills on time\n2. Keep credit utilization below 30%\n3. Don\'t close old credit cards\n\nYour current score: 77\nTarget score: 850+');
  };

  const handleTrackExpenses = () => {
    alert('Expense Tracking Features:\n\n• Categorize expenses automatically\n• Set spending limits\n• Track subscriptions\n\nYour average monthly spending: ₹49K');
  };

  const handleSetGoals = () => {
    const goal = prompt('What financial goal would you like to set?');
    if (goal) {
      alert(`Goal set: "${goal}"\n\nWe\'ll help you track your progress!`);
    }
  };

  const handleRewards = () => {
    alert('CreditCompass Rewards:\n\n🏆 Current Level: Silver\n📊 Points Earned: 2,450\n\nAvailable Rewards:\n• ₹500 cashback (1,000 points)');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "pending":
        return <Clock className="w-5 h-5 text-accent" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-success/10 text-success";
      case "pending":
        return "bg-accent/10 text-accent";
      case "rejected":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Welcome back, <span className="gradient-text">{userData.name.split(" ")[0]}</span>
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your loan applications and track your credit profile.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={refreshing}
                className="gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="hero" className="gap-2" onClick={handleApplyNewLoan}>
                <CreditCard className="w-4 h-4" />
                Apply for New Loan
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-8 bg-muted p-1 rounded-lg w-fit">
            {["overview", "analytics", "loans", "profile"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="space-y-6">
                {/* Profile Card */}
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display font-semibold text-lg text-foreground">
                      Profile
                    </h2>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xl font-bold text-primary">{userData.avatar}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{userData.name}</h3>
                      <p className="text-sm text-muted-foreground">Member since {userData.memberSince}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{userData.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{userData.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{userData.address}</span>
                    </div>
                  </div>
                </div>

                {/* Credit Score Card */}
                <div className="glass-card p-6">
                  <h2 className="font-display font-semibold text-lg text-foreground mb-6">
                    AI Credit Score
                  </h2>
                  <div className="text-center mb-6">
                    <div className="relative w-32 h-32 mx-auto">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="56" stroke="hsl(210, 40%, 96%)" strokeWidth="12" fill="none" />
                        <circle cx="64" cy="64" r="56" stroke="hsl(173, 58%, 39%)" strokeWidth="12" fill="none" strokeDasharray={`${352 * userData.creditScore / 100} 352`} strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-display font-bold text-foreground">{userData.creditScore}</span>
                      </div>
                    </div>
                    <p className="text-success font-medium mt-2">Good</p>
                    <p className="text-xs text-muted-foreground">Updated Jan 20, 2024</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                {/* Quick Stats */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="stat-card">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-success/10">
                        <IndianRupee className="w-5 h-5 text-success" />
                      </div>
                      <span className="text-sm text-muted-foreground">Active Loan</span>
                    </div>
                    <div className="text-2xl font-display font-bold text-foreground">₹5L</div>
                    <p className="text-xs text-muted-foreground mt-1">HDFC Bank</p>
                  </div>
                  <div className="stat-card">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">Applications</span>
                    </div>
                    <div className="text-2xl font-display font-bold text-foreground">3</div>
                    <p className="text-xs text-muted-foreground mt-1">2 pending</p>
                  </div>
                  <div className="stat-card">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-accent/10">
                        <TrendingUp className="w-5 h-5 text-accent" />
                      </div>
                      <span className="text-sm text-muted-foreground">Approval Rate</span>
                    </div>
                    <div className="text-2xl font-display font-bold text-foreground">67%</div>
                    <p className="text-xs text-muted-foreground mt-1">+5% this month</p>
                  </div>
                </div>

                {/* Loan Applications */}
                <div className="glass-card p-6">
                  <h2 className="font-display font-semibold text-lg text-foreground mb-6">
                    Loan Applications
                  </h2>
                  <div className="space-y-4">
                    {loanApplications.map((loan) => (
                      <div key={loan.id} className="p-4 rounded-xl border border-border hover:border-primary/30 transition-all duration-200">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            {getStatusIcon(loan.status)}
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-foreground">₹{(loan.amount / 100000).toFixed(1)}L</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(loan.status)}`}>
                                  {loan.status}
                                </span>
                                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{loan.bank}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">{loan.purpose} • {loan.term}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  Applied: {loan.appliedDate}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {loan.status === "approved" && (
                              <>
                                <div className="text-right">
                                  <p className="text-xs text-muted-foreground">Monthly EMI</p>
                                  <p className="font-semibold text-foreground">₹{(loan.monthlyPayment / 1000).toFixed(0)}K</p>
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm" className="gap-1">
                                    <Eye className="w-3 h-3" />
                                    Details
                                  </Button>
                                  <Button variant="outline" size="sm" className="gap-1">
                                    <Download className="w-3 h-3" />
                                    Download
                                  </Button>
                                </div>
                              </>
                            )}
                            {loan.status === "pending" && (
                              <div className="text-right">
                                <p className="text-sm text-accent">Decision in progress...</p>
                                <Button variant="outline" size="sm" className="gap-1 mt-2">
                                  <Eye className="w-3 h-3" />
                                  Track Status
                                </Button>
                              </div>
                            )}
                            {loan.status === "rejected" && (
                              <div className="text-right">
                                <p className="text-sm text-destructive">{loan.reason}</p>
                                <Button variant="outline" size="sm" className="gap-1 mt-2">
                                  <Info className="w-3 h-3" />
                                  Why Rejected?
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-4 gap-4 mt-6">
                  <Button variant="outline" className="gap-2 h-auto p-4 flex-col" onClick={handleImproveScore}>
                    <Shield className="w-6 h-6 text-primary" />
                    <span className="text-sm">Improve Score</span>
                  </Button>
                  <Button variant="outline" className="gap-2 h-auto p-4 flex-col" onClick={handleTrackExpenses}>
                    <Activity className="w-6 h-6 text-accent" />
                    <span className="text-sm">Track Expenses</span>
                  </Button>
                  <Button variant="outline" className="gap-2 h-auto p-4 flex-col" onClick={handleSetGoals}>
                    <Target className="w-6 h-6 text-success" />
                    <span className="text-sm">Set Goals</span>
                  </Button>
                  <Button variant="outline" className="gap-2 h-auto p-4 flex-col" onClick={handleRewards}>
                    <Award className="w-6 h-6 text-warning" />
                    <span className="text-sm">Rewards</span>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">Financial Analytics</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="glass-card p-6">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-4">Credit Score Analysis</h3>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-primary mb-2">{userData.creditScore}</div>
                    <p className="text-success font-medium">Good Score</p>
                    <p className="text-sm text-muted-foreground">Updated Jan 20, 2024</p>
                  </div>
                  <div className="space-y-4 mt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Income Stability</span>
                      <span className="text-sm font-medium">85/100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Payment History</span>
                      <span className="text-sm font-medium">90/100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Savings Behavior</span>
                      <span className="text-sm font-medium">62/100</span>
                    </div>
                  </div>
                </div>
                <div className="glass-card p-6">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-4">Monthly Overview</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Income</span>
                      <span className="text-sm font-semibold text-success">₹91K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Spending</span>
                      <span className="text-sm font-semibold text-warning">₹49K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Savings Rate</span>
                      <span className="text-sm font-semibold text-primary">54%</span>
                    </div>
                  </div>
                </div>
                <div className="glass-card p-6">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-4">Loan Statistics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Applications</span>
                      <span className="text-sm font-semibold">{loanApplications.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Success Rate</span>
                      <span className="text-sm font-semibold text-success">67%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Loans</span>
                      <span className="text-sm font-semibold">1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loans Tab */}
          {activeTab === "loans" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold text-foreground">Loan Management</h2>
                <Button variant="hero" className="gap-2" onClick={handleApplyNewLoan}>
                  <CreditCard className="w-4 h-4" />
                  Apply for New Loan
                </Button>
              </div>

              <div className="grid sm:grid-cols-4 gap-4">
                <div className="stat-card">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-sm text-muted-foreground">Approved</span>
                  </div>
                  <div className="text-2xl font-display font-bold text-foreground">1</div>
                  <p className="text-xs text-muted-foreground mt-1">₹5L total</p>
                </div>
                <div className="stat-card">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-accent" />
                    <span className="text-sm text-muted-foreground">Pending</span>
                  </div>
                  <div className="text-2xl font-display font-bold text-foreground">1</div>
                  <p className="text-xs text-muted-foreground mt-1">₹3L total</p>
                </div>
                <div className="stat-card">
                  <div className="flex items-center gap-3 mb-2">
                    <XCircle className="w-5 h-5 text-destructive" />
                    <span className="text-sm text-muted-foreground">Rejected</span>
                  </div>
                  <div className="text-2xl font-display font-bold text-foreground">1</div>
                  <p className="text-xs text-muted-foreground mt-1">₹8L total</p>
                </div>
                <div className="stat-card">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                  </div>
                  <div className="text-2xl font-display font-bold text-foreground">33%</div>
                  <p className="text-xs text-muted-foreground mt-1">Last 6 months</p>
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-display font-semibold text-lg text-foreground mb-6">All Loan Applications</h3>
                <div className="space-y-4">
                  {loanApplications.map((loan) => (
                    <div key={loan.id} className="p-4 rounded-xl border border-border hover:border-primary/30 transition-all duration-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          {getStatusIcon(loan.status)}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-foreground">₹{(loan.amount / 100000).toFixed(1)}L</span>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(loan.status)}`}>
                                {loan.status}
                              </span>
                              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{loan.bank}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{loan.purpose} • {loan.term}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Applied: {loan.appliedDate}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {loan.status === "approved" && (
                            <>
                              <div className="text-right">
                                <p className="text-xs text-muted-foreground">Monthly EMI</p>
                                <p className="font-semibold text-foreground">₹{(loan.monthlyPayment / 1000).toFixed(0)}K</p>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="gap-1">
                                  <Eye className="w-3 h-3" />
                                  Details
                                </Button>
                                <Button variant="outline" size="sm" className="gap-1">
                                  <Download className="w-3 h-3" />
                                  Download
                                </Button>
                              </div>
                            </>
                          )}
                          {loan.status === "pending" && (
                            <div className="text-right">
                              <p className="text-sm text-accent">Decision in progress...</p>
                              <Button variant="outline" size="sm" className="gap-1 mt-2">
                                <Eye className="w-3 h-3" />
                                Track Status
                              </Button>
                            </div>
                          )}
                          {loan.status === "rejected" && (
                            <div className="text-right">
                              <p className="text-sm text-destructive">{loan.reason}</p>
                              <Button variant="outline" size="sm" className="gap-1 mt-2">
                                <Info className="w-3 h-3" />
                                Why Rejected?
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold text-foreground">Profile Settings</h2>
                <Button variant="outline" size="sm" className="gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-display font-semibold text-lg text-foreground mb-6">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">{userData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email Address</p>
                      <p className="font-medium">{userData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone Number</p>
                      <p className="font-medium">{userData.phone}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Date of Birth</p>
                      <p className="font-medium">15 March 1990</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">PAN Card</p>
                      <p className="font-medium">ABCPJ1234K</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Aadhaar Number</p>
                      <p className="font-medium">****-****-1234</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-display font-semibold text-lg text-foreground mb-6">Address Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Address</p>
                    <p className="font-medium">{userData.address}</p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">City</p>
                      <p className="font-medium">Bangalore</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">State</p>
                      <p className="font-medium">Karnataka</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">PIN Code</p>
                      <p className="font-medium">560001</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-display font-semibold text-lg text-foreground mb-6">Security Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Activity className="w-5 h-5 text-accent" />
                      <div>
                        <p className="font-medium">Login Activity</p>
                        <p className="text-sm text-muted-foreground">View recent login attempts</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
