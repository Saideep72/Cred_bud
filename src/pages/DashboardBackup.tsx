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
  PieChart,
  BarChart3,
  Eye,
  RefreshCw,
  ChevronRight,
  Info,
  Zap,
  Award,
  AlertTriangle,
  Upload,
  Key,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Mock user data
const userData = {
  name: "Rajesh Kumar",
  email: "rajesh.kumar@example.com",
  phone: "+91 98765 43210",
  address: "123 MG Road, Bangalore, Karnataka 560001",
  memberSince: "January 2024",
  avatar: "RK",
  creditScore: 77,
  lastUpdated: "Jan 20, 2024",
};

const loanApplications = [
  {
    id: "LA-2024-001",
    amount: 500000,
    term: "12 months",
    purpose: "Home Renovation",
    status: "approved",
    appliedDate: "2024-01-15",
    decisionDate: "2024-01-15",
    interestRate: "8.5%",
    monthlyPayment: 43650,
    bank: "HDFC Bank",
    nextPaymentDate: "2024-02-15",
    remainingAmount: 456350,
  },
  {
    id: "LA-2024-002",
    amount: 300000,
    term: "6 months",
    purpose: "Emergency Fund",
    status: "pending",
    appliedDate: "2024-01-20",
    decisionDate: null,
    interestRate: null,
    monthlyPayment: null,
    bank: "ICICI Bank",
    nextPaymentDate: null,
    remainingAmount: null,
  },
  {
    id: "LA-2023-003",
    amount: 800000,
    term: "24 months",
    purpose: "Vehicle Purchase",
    status: "rejected",
    appliedDate: "2023-12-10",
    decisionDate: "2023-12-10",
    reason: "Insufficient income stability",
    bank: "SBI",
    nextPaymentDate: null,
    remainingAmount: null,
  },
];

const creditFactors = [
  { name: "Income Stability", score: 85, status: "good", change: 5 },
  { name: "Spending Patterns", score: 78, status: "good", change: -2 },
  { name: "Savings Behavior", score: 62, status: "fair", change: 8 },
  { name: "Payment History", score: 90, status: "excellent", change: 0 },
  { name: "Account Balance", score: 70, status: "fair", change: 3 },
];

const initialNotifications = [
  {
    id: 1,
    type: "success",
    title: "Loan Approved!",
    message: "Your home renovation loan of ₹5L has been approved by HDFC Bank",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "info",
    title: "Credit Score Updated",
    message: "Your AI credit score has increased by 3 points",
    time: "1 day ago",
    read: false,
  },
  {
    id: 3,
    type: "warning",
    title: "Payment Due Soon",
    message: "Your next EMI payment of ₹43,650 is due in 5 days",
    time: "3 days ago",
    read: true,
  },
];

const monthlySpendingData = [
  { month: "Aug", spending: 45000, income: 85000, savings: 40000 },
  { month: "Sep", spending: 52000, income: 85000, savings: 33000 },
  { month: "Oct", spending: 48000, income: 90000, savings: 42000 },
  { month: "Nov", spending: 61000, income: 90000, savings: 29000 },
  { month: "Dec", spending: 55000, income: 95000, savings: 40000 },
  { month: "Jan", spending: 49000, income: 95000, savings: 46000 },
];

const loanDistributionData = [
  { name: "Home Loan", value: 45, color: "#22c55e" },
  { name: "Personal Loan", value: 30, color: "#3b82f6" },
  { name: "Vehicle Loan", value: 15, color: "#f59e0b" },
  { name: "Education", value: 10, color: "#8b5cf6" },
];

const creditScoreTrend = [
  { month: "Aug", score: 72 },
  { month: "Sep", score: 74 },
  { month: "Oct", score: 73 },
  { month: "Nov", score: 75 },
  { month: "Dec", score: 76 },
  { month: "Jan", score: 77 },
];

const formatCurrency = (value: number) => {
  return `₹${(value / 1000).toFixed(0)}K`;
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const [selectedLoan, setSelectedLoan] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showLoanDetails, setShowLoanDetails] = useState<string | null>(null);
  const [notifications, setNotifications] = useState(initialNotifications);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 1000);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

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

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-success";
    if (score >= 60) return "bg-accent";
    return "bg-destructive";
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-accent" />;
      case "info":
        return <Info className="w-5 h-5 text-primary" />;
      default:
        return <Bell className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
      // Add a new notification
      const newNotification = {
        id: Date.now(),
        type: "info",
        title: "Data Refreshed",
        message: "Dashboard data has been updated successfully",
        time: "Just now",
        read: false,
      };
      setNotifications(prev => [newNotification, ...prev]);
      setUnreadCount(prev => prev + 1);
    }, 2000);
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const handleApplyNewLoan = () => {
    // Navigate to apply page or show modal
    window.location.href = '/apply';
  };

  const handleViewAllLoans = () => {
    setActiveTab('loans');
  };

  const handleViewLoanDetails = (loanId: string) => {
    setShowLoanDetails(loanId === showLoanDetails ? null : loanId);
  };

  const handleDownloadLoan = (loanId: string) => {
    // Simulate download
    const loan = loanApplications.find(l => l.id === loanId);
    if (loan) {
      // Create a dummy download
      const data = {
        loanId: loan.id,
        amount: loan.amount,
        status: loan.status,
        bank: loan.bank,
        downloadDate: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `loan-${loan.id}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleTrackStatus = (loanId: string) => {
    // Show tracking modal or navigate
    alert(`Tracking status for loan ${loanId}. This would open a detailed tracking modal.`);
  };

  const handleWhyRejected = (loanId: string) => {
    const loan = loanApplications.find(l => l.id === loanId);
    if (loan) {
      alert(`Loan ${loanId} was rejected because: ${loan.reason}. Here are some tips to improve your chances next time:\n\n1. Increase your income stability\n2. Reduce existing debt\n3. Improve your credit score\n4. Provide complete documentation`);
    }
  };

  const handleAIAnalysis = () => {
    alert('AI Credit Analysis:\n\nBased on your financial profile:\n• Credit Score: 77 (Good)\n• Income Stability: Strong\n• Debt-to-Income Ratio: 28% (Healthy)\n• Payment History: Excellent\n\nRecommendations:\n• Consider increasing loan amount eligibility\n• Explore lower interest rate options\n• Maintain current financial habits');
  };

  const handleImproveScore = () => {
    alert('Credit Score Improvement Tips:\n\n1. Pay all bills on time\n2. Keep credit utilization below 30%\n3. Don\'t close old credit cards\n4. Limit new credit applications\n5. Regularly check your credit report\n\nYour current score: 77\nTarget score: 850+');
  };

  const handleTrackExpenses = () => {
    alert('Expense Tracking Features:\n\n• Categorize expenses automatically\n• Set spending limits\n• Track subscriptions\n• Monitor cash flow\n• Generate monthly reports\n\nYour average monthly spending: ₹49K\nAverage monthly income: ₹91K');
  };

  const handleSetGoals = () => {
    const goal = prompt('What financial goal would you like to set?\n\nExamples:\n• Save ₹50K for emergency fund\n• Pay off loan in 18 months\n• Increase credit score to 800');
    if (goal) {
      alert(`Goal set: "${goal}"\n\nWe\'ll help you track your progress and send reminders to keep you on track!`);
    }
  };

  const handleRewards = () => {
    alert('CreditCompass Rewards Program:\n\n🏆 Current Level: Silver\n📊 Points Earned: 2,450\n🎯 Next Reward: Gold (5,000 points)\n\nAvailable Rewards:\n• ₹500 cashback (1,000 points)\n• 0.5% interest rate reduction (2,000 points)\n• Free credit monitoring (3,000 points)\n• Priority processing (5,000 points)');
  };

  const handleEditProfile = () => {
    alert('Profile Editing:\n\nYou can update:\n• Personal information\n• Contact details\n• Bank account information\n• Document uploads\n• Notification preferences\n\nThis would open a profile editing modal.');
  };

  const handleAnalyticsTab = () => {
    setActiveTab('analytics');
  };

  const handleLoansTab = () => {
    setActiveTab('loans');
  };

  const handleProfileTab = () => {
    setActiveTab('profile');
  };

  const handleExportReport = () => {
    const reportData = {
      creditScore: userData.creditScore,
      monthlyIncome: 95000,
      monthlySpending: 49000,
      totalLoans: loanApplications.length,
      activeLoans: loanApplications.filter(l => l.status === 'approved').length,
      reportGenerated: new Date().toISOString(),
      recommendations: [
        'Increase credit utilization to below 30%',
        'Consider debt consolidation for better rates',
        'Maintain current payment history'
      ]
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `credit-report-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleScheduleConsultation = () => {
    const date = prompt('Schedule a free consultation:\n\nAvailable slots:\n• Tomorrow, 10:00 AM\n• Tomorrow, 2:00 PM\n• Friday, 11:00 AM\n\nEnter your preferred date and time:');
    if (date) {
      alert(`Consultation scheduled for: ${date}\n\nYou'll receive a confirmation email with meeting details and preparation checklist.`);
    }
  };

  const handleUploadDocument = () => {
    alert('Document Upload:\n\nSupported documents:\n• PAN Card\n• Aadhaar Card\n• Bank Statements (3 months)\n• Salary Slips (3 months)\n• Address Proof\n\nUpload documents to improve your credit score and loan approval chances.');
  };

  const handleUpdatePreferences = () => {
    const preferences = prompt('Notification Preferences:\n\nChoose your preferences (comma separated):\n• Email notifications\n• SMS alerts\n• WhatsApp updates\n• Push notifications\n• Monthly reports\n\nExample: email,sms,monthly');
    if (preferences) {
      alert(`Preferences updated: ${preferences}\n\nYou'll receive notifications through your selected channels.`);
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
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="gap-2"
                >
                  <Bell className="w-4 h-4" />
                  Notifications
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-background border border-border rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b border-border">
                      <h3 className="font-semibold text-foreground">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div 
                          key={notif.id}
                          className={`p-4 border-b border-border hover:bg-muted/50 cursor-pointer ${!notif.read ? 'bg-primary/5' : ''}`}
                          onClick={() => markAsRead(notif.id)}
                        >
                          <div className="flex items-start gap-3">
                            {getNotificationIcon(notif.type)}
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground text-sm">{notif.title}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
                              <p className="text-xs text-muted-foreground mt-2">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Button variant="hero" className="gap-2" onClick={handleApplyNewLoan}>
                <CreditCard className="w-4 h-4" />
                Apply for New Loan
              </Button>
            </div>
          </div>

          {/* Interactive Tabs */}
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

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Profile & Credit Score */}
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-semibold text-lg text-foreground">
                    Profile
                  </h2>
                  <Button variant="ghost" size="sm" onClick={handleEditProfile}>
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">
                      {userData.avatar}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {userData.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Member since {userData.memberSince}
                    </p>
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
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="hsl(210, 40%, 96%)"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="hsl(173, 58%, 39%)"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${(77 / 100) * 352} 352`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-display font-bold text-foreground">
                        77
                      </span>
                    </div>
                  </div>
                  <p className="text-success font-medium mt-2">Good</p>
                  <p className="text-xs text-muted-foreground">
                    Updated Jan 20, 2024
                  </p>
                </div>

                <div className="space-y-4">
                  {creditFactors.map((factor) => (
                    <div key={factor.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-foreground">
                          {factor.name}
                        </span>
                        <span className="text-sm font-medium text-foreground">
                          {factor.score}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getScoreColor(factor.score)} rounded-full transition-all duration-500`}
                          style={{ width: `${factor.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Loan Applications */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Stats */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="stat-card">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-success/10">
                      <IndianRupee className="w-5 h-5 text-success" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Active Loan
                    </span>
                  </div>
                  <div className="text-2xl font-display font-bold text-foreground">
                    ₹5L
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">HDFC Bank</p>
                </div>
                <div className="stat-card">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Applications
                    </span>
                  </div>
                  <div className="text-2xl font-display font-bold text-foreground">
                    3
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">2 pending</p>
                </div>
                <div className="stat-card">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <TrendingUp className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Approval Rate
                    </span>
                  </div>
                  <div className="text-2xl font-display font-bold text-foreground">
                    67%
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">+5% this month</p>
                </div>
              </div>

              {/* Loan Applications */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-semibold text-lg text-foreground">
                    Recent Loan Applications
                  </h2>
                  <Button variant="outline" size="sm" className="gap-2" onClick={handleLoansTab}>
                    <Eye className="w-4 h-4" />
                    View All
                  </Button>
                </div>

                <div className="space-y-4">
                  {loanApplications.slice(0, 2).map((loan) => (
                    <div
                      key={loan.id}
                      className={`p-4 rounded-xl border border-border hover:border-primary/30 transition-all duration-200 cursor-pointer ${
                        selectedLoan === loan.id ? 'border-primary bg-primary/5' : ''
                      }`}
                      onClick={() => setSelectedLoan(loan.id === selectedLoan ? null : loan.id)}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          {getStatusIcon(loan.status)}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-foreground">
                                ₹{(loan.amount / 100000).toFixed(1)}L
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(
                                  loan.status
                                )}`}
                              >
                                {loan.status}
                              </span>
                              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                                {loan.bank}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {loan.purpose} • {loan.term}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Applied: {loan.appliedDate}
                              </div>
                              {loan.nextPaymentDate && (
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  Next EMI: {loan.nextPaymentDate}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          {loan.status === "approved" && (
                            <>
                              <div className="text-right">
                                <p className="text-xs text-muted-foreground">
                                  Monthly EMI
                                </p>
                                <p className="font-semibold text-foreground">
                                  ₹{(loan.monthlyPayment / 1000).toFixed(0)}K
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="gap-1" onClick={() => handleViewLoanDetails(loan.id)}>
                                  <Eye className="w-3 h-3" />
                                  Details
                                </Button>
                                <Button variant="outline" size="sm" className="gap-1" onClick={() => handleDownloadLoan(loan.id)}>
                                  <Download className="w-3 h-3" />
                                  Download
                                </Button>
                              </div>
                            </>
                          )}
                          {loan.status === "pending" && (
                            <div className="text-right">
                              <p className="text-sm text-accent">
                                Decision in progress...
                              </p>
                              <Button variant="outline" size="sm" className="gap-1 mt-2" onClick={() => handleTrackStatus(loan.id)}>
                                <Eye className="w-3 h-3" />
                                Track Status
                              </Button>
                            </div>
                          )}
                          {loan.status === "rejected" && (
                            <div className="text-right">
                              <p className="text-sm text-destructive">
                                {loan.reason}
                              </p>
                              <Button variant="outline" size="sm" className="gap-1 mt-2" onClick={() => handleWhyRejected(loan.id)}>
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
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Applied: {loan.appliedDate}
                              </div>
                              {loan.nextPaymentDate && (
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  Next EMI: {loan.nextPaymentDate}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          {loan.status === "approved" && (
                            <>
                              <div className="text-right">
                                <p className="text-xs text-muted-foreground">
                                  Monthly EMI
                                </p>
                                <p className="font-semibold text-foreground">
                                  ₹{(loan.monthlyPayment / 1000).toFixed(0)}K
                                </p>
                                {loan.remainingAmount && (
                                  <p className="text-xs text-muted-foreground">
                                    Remaining: ₹{(loan.remainingAmount / 100000).toFixed(1)}L
                                  </p>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="gap-1" onClick={() => handleViewLoanDetails(loan.id)}>
                                  <Eye className="w-3 h-3" />
                                  Details
                                </Button>
                                <Button variant="outline" size="sm" className="gap-1" onClick={() => handleDownloadLoan(loan.id)}>
                                  <Download className="w-3 h-3" />
                                  Download
                                </Button>
                              </div>
                            </>
                          )}
                          {loan.status === "pending" && (
                            <div className="text-right">
                              <p className="text-sm text-accent">
                                Decision in progress...
                              </p>
                              <Button variant="outline" size="sm" className="gap-1 mt-2" onClick={() => handleTrackStatus(loan.id)}>
                                <Eye className="w-3 h-3" />
                                Track Status
                              </Button>
                            </div>
                          )}
                          {loan.status === "rejected" && (
                            <div className="text-right">
                              <p className="text-sm text-destructive">
                                {loan.reason}
                              </p>
                              <Button variant="outline" size="sm" className="gap-1 mt-2" onClick={() => handleWhyRejected(loan.id)}>
                                <Info className="w-3 h-3" />
                                Why Rejected?
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Expandable Details */}
                      {selectedLoan === loan.id && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Interest Rate</p>
                              <p className="font-medium">{loan.interestRate || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Processing Fee</p>
                              <p className="font-medium">₹{(loan.amount * 0.02 / 1000).toFixed(0)}K</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Loan Tenure</p>
                              <p className="font-medium">{loan.term}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Total Amount</p>
                              <p className="font-medium">₹{(loan.amount * 1.1 / 100000).toFixed(1)}L</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Analytics Section */}
              {activeTab === "analytics" && (
                <div className="grid lg:grid-cols-2 gap-6 mb-6">
                  {/* Credit Score Trend */}
                  <div className="glass-card p-6">
                    <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                      Credit Score Trend
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={creditScoreTrend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 31%, 91%)" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[70, 80]} />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="score"
                          stroke="hsl(173, 58%, 39%)"
                          strokeWidth={3}
                          dot={{ fill: "hsl(173, 58%, 39%)", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Spending vs Income */}
                  <div className="glass-card p-6">
                    <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                      Spending vs Income
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={monthlySpendingData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 31%, 91%)" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={formatCurrency} />
                        <Tooltip formatter={(value: any) => formatCurrency(value)} />
                        <Area
                          type="monotone"
                          dataKey="spending"
                          stackId="1"
                          stroke="hsl(35, 91%, 55%)"
                          fill="hsl(35, 91%, 55%)"
                        />
                        <Area
                          type="monotone"
                          dataKey="income"
                          stackId="2"
                          stroke="hsl(173, 58%, 39%)"
                          fill="hsl(173, 58%, 39%)"
                        />
                        <Legend />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Loan Distribution */}
                  <div className="glass-card p-6">
                    <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                      Loan Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <RePieChart>
                        <Pie
                          data={loanDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {loanDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RePieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Credit Factors with Changes */}
                  <div className="glass-card p-6">
                    <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                      Credit Factors
                    </h3>
                    <div className="space-y-3">
                      {creditFactors.map((factor) => (
                        <div key={factor.name}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-foreground">
                              {factor.name}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-foreground">
                                {factor.score}
                              </span>
                              {factor.change !== 0 && (
                                <span className={`text-xs flex items-center gap-1 ${
                                  factor.change > 0 ? 'text-success' : 'text-destructive'
                                }`}>
                                  {factor.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                  {Math.abs(factor.change)}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full ${getScoreColor(factor.score)} rounded-full transition-all duration-500`}
                              style={{ width: `${factor.score}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Decision Explanation */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-semibold text-lg text-foreground">
                    Latest Decision Explanation
                  </h2>
                  <Button variant="outline" size="sm" className="gap-2" onClick={handleAIAnalysis}>
                    <Zap className="w-4 h-4" />
                    AI Analysis
                  </Button>
                </div>
                <div className="p-4 rounded-xl bg-success/5 border border-success/20">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-success mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground mb-2">
                        Loan #LA-2024-001 - Approved
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Your application was approved based on the following
                        factors: <strong>Stable monthly income</strong> of ₹95,000
                        over the past 3 months, <strong>consistent payment history</strong> 
                        with no missed payments, and{" "}
                        <strong>responsible spending patterns</strong> with a
                        savings ratio of 48%. Your debt-to-income ratio of 28% is
                        well within acceptable limits.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                          Strong Income
                        </span>
                        <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                          Good Credit History
                        </span>
                        <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                          Low Debt Ratio
                        </span>
                        <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                          HDFC Bank Preferred
                        </span>
                      </div>
                    </div>
                  </div>
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
