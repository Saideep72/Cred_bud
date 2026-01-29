import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  User,
  Briefcase,
  CreditCard,
  FileSpreadsheet,
} from "lucide-react";
import { toast } from "sonner";
import { loanService } from "@/services/loanService";
import { LoanApplication } from "@/types/loan";
import { testSupabaseConnection } from "@/utils/testSupabase";
import { debugSupabase } from "@/utils/debugSupabase";
import { directSupabaseTest } from "@/utils/directSupabaseTest";

const Apply = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Test function to debug Supabase connection
  const testConnection = async () => {
    const result = await testSupabaseConnection();
    console.log('Test result:', result);
    if (result.success) {
      toast.success('Supabase connection successful!');
    } else {
      toast.error(`Connection failed: ${result.error}`);
    }
  };

  // Comprehensive debug function
  const runDebug = async () => {
    console.log('🔍 Starting comprehensive debug...');
    const result = await debugSupabase();
    console.log('🔍 Debug result:', result);
    
    if (result.success) {
      toast.success('All tests passed! Check console for details.');
    } else {
      toast.error(`Debug failed at step: ${result.step} - ${result.error}`);
    }
  };

  // Test with realistic form data
  const testRealFormData = async () => {
    console.log('🧪 Testing with realistic form data...');
    
    const testData = {
      first_name: 'John',
      last_name: 'Doe',
      email: `john.doe${Date.now()}@example.com`,
      loan_amount: 10000,
      loan_term: 24,
    };

    console.log('📋 Minimal test data:', testData);

    try {
      const result = await loanService.submitApplication(testData as LoanApplication);
      console.log('✅ Real form data test successful:', result);
      toast.success('✅ Real form data test successful!');
    } catch (error) {
      console.error('❌ Real form data test failed:', error);
      toast.error('❌ Real form data test failed - check console');
    }
  };

  // Test with absolute minimal data
  const testMinimalData = async () => {
    console.log('🧪 Testing with absolute minimal data...');
    
    const minimalData = {
      first_name: 'Test',
      last_name: 'User',
      email: `test${Date.now()}@example.com`,
      loan_amount: 1000,
      loan_term: 12,
    };

    console.log('📋 Minimal data:', minimalData);

    try {
      const result = await loanService.submitApplication(minimalData as LoanApplication);
      console.log('✅ Minimal test successful:', result);
      toast.success('✅ Minimal test successful!');
    } catch (error) {
      console.error('❌ Minimal test failed:', error);
      toast.error('❌ Minimal test failed - check console');
    }
  };

  // Direct Supabase test
  const testDirectSupabase = async () => {
    console.log('🔥 Testing direct Supabase connection...');
    
    try {
      const result = await directSupabaseTest();
      console.log('🔥 Direct test result:', result);
      
      if (result.success) {
        toast.success('✅ Direct Supabase test successful!');
      } else {
        toast.error(`❌ Direct test failed: ${result.error}`);
        console.log('🔍 Full error details:', result.details);
      }
    } catch (error) {
      console.error('❌ Direct test exception:', error);
      toast.error('❌ Direct test exception - check console');
    }
  };

  // Test form submission with hardcoded working data
  const testFormSubmission = async () => {
    console.log('🧪 Testing form submission with working data...');
    
    try {
      const workingData = {
        first_name: 'Test',
        last_name: 'User',
        email: `test${Date.now()}@example.com`,
        loan_amount: 5000,
        loan_term: 12,
      };

      console.log('📤 Sending working data:', workingData);
      
      const result = await loanService.submitApplication(workingData);
      console.log('✅ Form submission test successful:', result);
      toast.success('✅ Form submission test successful!');
      
    } catch (error) {
      console.error('❌ Form submission test failed:', error);
      toast.error('❌ Form submission test failed - check console');
    }
  };

  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    // Employment Info
    employmentStatus: "",
    employer: "",
    jobTitle: "",
    monthlyIncome: "",
    employmentDuration: "",
    // Loan Details
    loanAmount: "",
    loanPurpose: "",
    loanTerm: "",
    // Financial Info
    totalAssets: "",
    hasPastDebts: "",
    numberOfDebts: "",
    hasEmi: "",
    emiAmount: "",
    // File upload
    transactionFile: null as File | null,
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type === "text/csv") {
      setFormData((prev) => ({ ...prev, transactionFile: file }));
      toast.success("File uploaded successfully!");
    } else {
      toast.error("Please upload a valid CSV file");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    maxFiles: 1,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Log the raw form data first
      console.log('📝 Raw form data:', formData);
      
      // Validate required fields first
      if (!formData.firstName || !formData.lastName || !formData.email) {
        throw new Error('Please fill in all required personal information fields');
      }

      if (!formData.loanAmount || !formData.loanTerm) {
        throw new Error('Please provide loan amount and loan term');
      }
      
      // Prepare application data with proper validation
      const applicationData: LoanApplication = {
        // Personal Information
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone?.trim() || undefined,
        date_of_birth: formData.dateOfBirth || undefined,
        address: formData.address?.trim() || undefined,
        city: formData.city?.trim() || undefined,
        state: formData.state?.trim() || undefined,
        zip_code: formData.zipCode?.trim() || undefined,
        
        // Employment Information
        employment_status: formData.employmentStatus || undefined,
        employer: formData.employer?.trim() || undefined,
        job_title: formData.jobTitle?.trim() || undefined,
        monthly_income: formData.monthlyIncome && !isNaN(parseFloat(formData.monthlyIncome)) ? parseFloat(formData.monthlyIncome) : undefined,
        employment_duration: formData.employmentDuration || undefined,
        
        // Loan Details
        loan_amount: parseFloat(formData.loanAmount),
        loan_purpose: formData.loanPurpose?.trim() || undefined,
        loan_term: parseInt(formData.loanTerm),
        
        // Financial Information
        total_assets: formData.totalAssets && !isNaN(parseFloat(formData.totalAssets)) ? parseFloat(formData.totalAssets) : undefined,
        has_past_debts: formData.hasPastDebts === "yes",
        number_of_debts: formData.numberOfDebts && !isNaN(parseInt(formData.numberOfDebts)) ? parseInt(formData.numberOfDebts) : undefined,
        has_emi: formData.hasEmi === "yes",
        emi_amount: formData.emiAmount && !isNaN(parseFloat(formData.emiAmount)) ? parseFloat(formData.emiAmount) : undefined,
        
        // Metadata
        user_agent: navigator.userAgent,
      };

      // Remove null values to avoid issues
      Object.keys(applicationData).forEach(key => {
        const typedKey = key as keyof LoanApplication;
        if (applicationData[typedKey] === null || applicationData[typedKey] === undefined) {
          delete (applicationData as Record<string, unknown>)[typedKey];
        }
      });

      // Log the prepared data
      console.log('📋 Prepared application data:', applicationData);

      // Final validation
      if (isNaN(applicationData.loan_amount) || isNaN(applicationData.loan_term)) {
        throw new Error('Invalid loan amount or term');
      }

      // Submit the application
      console.log('🚀 Submitting application...');
      const application = await loanService.submitApplication(applicationData);
      console.log('✅ Application submitted successfully:', application);

      // If there's a file, upload it
      if (formData.transactionFile && application.id) {
        const fileData = await loanService.uploadTransactionFile(
          formData.transactionFile,
          application.id
        );
        
        await loanService.updateApplicationWithFile(
          application.id,
          fileData.publicUrl,
          fileData.fileName
        );
      }

      toast.success("Application submitted successfully! We'll review your application and get back to you within 24 hours.");
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        employmentStatus: "",
        employer: "",
        jobTitle: "",
        monthlyIncome: "",
        employmentDuration: "",
        loanAmount: "",
        loanPurpose: "",
        loanTerm: "",
        totalAssets: "",
        hasPastDebts: "",
        numberOfDebts: "",
        hasEmi: "",
        emiAmount: "",
        transactionFile: null,
      });
      setStep(1);
      
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Employment", icon: Briefcase },
    { number: 3, title: "Loan Details", icon: CreditCard },
    { number: 4, title: "Documents", icon: FileSpreadsheet },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Apply for a <span className="gradient-text">Loan</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Complete the form below to submit your loan application. Our AI will
              analyze your financial data and provide a decision within minutes.
            </p>
            {/* Temporary debug button */}
            <div className="mt-4 flex gap-2 justify-center flex-wrap">
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={testConnection}
                className="text-xs"
              >
                Test Connection
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={testDirectSupabase}
                className="text-xs"
              >
                Direct Test
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={testFormSubmission}
                className="text-xs"
              >
                Test Form
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={testMinimalData}
                className="text-xs"
              >
                Test Minimal
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={testRealFormData}
                className="text-xs"
              >
                Test Real Data
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={runDebug}
                className="text-xs"
              >
                Full Debug
              </Button>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    step >= s.number
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <s.icon className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm font-medium">
                    {s.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 md:w-16 h-0.5 mx-2 ${
                      step > s.number ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="glass-card p-8">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-display font-semibold text-foreground mb-6">
                  Personal Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      placeholder="123 Main St"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="New York"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      placeholder="NY"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Employment Information */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-display font-semibold text-foreground mb-6">
                  Employment Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="employmentStatus">Employment Status</Label>
                    <Select
                      value={formData.employmentStatus}
                      onValueChange={(value) => handleInputChange("employmentStatus", value)}
                    >
                      <SelectTrigger className="input-field">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employed">Employed Full-Time</SelectItem>
                        <SelectItem value="part-time">Employed Part-Time</SelectItem>
                        <SelectItem value="self-employed">Self-Employed</SelectItem>
                        <SelectItem value="freelance">Freelancer</SelectItem>
                        <SelectItem value="retired">Retired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employer">Employer Name</Label>
                    <Input
                      id="employer"
                      placeholder="Company Inc."
                      value={formData.employer}
                      onChange={(e) => handleInputChange("employer", e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      placeholder="Software Engineer"
                      value={formData.jobTitle}
                      onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthlyIncome">Monthly Income ($)</Label>
                    <Input
                      id="monthlyIncome"
                      type="number"
                      placeholder="5000"
                      value={formData.monthlyIncome}
                      onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="employmentDuration">Employment Duration</Label>
                    <Select
                      value={formData.employmentDuration}
                      onValueChange={(value) => handleInputChange("employmentDuration", value)}
                    >
                      <SelectTrigger className="input-field">
                        <SelectValue placeholder="How long have you been employed?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                        <SelectItem value="1-2">1-2 years</SelectItem>
                        <SelectItem value="2-5">2-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Loan Details */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-display font-semibold text-foreground mb-6">
                  Loan Details & Financial Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount">Loan Amount ($)</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      placeholder="5000"
                      value={formData.loanAmount}
                      onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loanTerm">Loan Term</Label>
                    <Select
                      value={formData.loanTerm}
                      onValueChange={(value) => handleInputChange("loanTerm", value)}
                    >
                      <SelectTrigger className="input-field">
                        <SelectValue placeholder="Select term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">12 months</SelectItem>
                        <SelectItem value="24">24 months</SelectItem>
                        <SelectItem value="36">36 months</SelectItem>
                        <SelectItem value="48">48 months</SelectItem>
                        <SelectItem value="60">60 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="loanPurpose">Loan Purpose</Label>
                    <Textarea
                      id="loanPurpose"
                      placeholder="Describe the purpose of your loan..."
                      value={formData.loanPurpose}
                      onChange={(e) => handleInputChange("loanPurpose", e.target.value)}
                      className="input-field min-h-[120px]"
                    />
                  </div>

                  {/* Financial Information Section */}
                  <div className="md:col-span-2 pt-4 border-t border-border">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Financial Information
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="totalAssets">Total Assets Value ($)</Label>
                    <Input
                      id="totalAssets"
                      type="number"
                      placeholder="50000"
                      value={formData.totalAssets}
                      onChange={(e) => handleInputChange("totalAssets", e.target.value)}
                      className="input-field"
                    />
                    <p className="text-xs text-muted-foreground">
                      Include property, vehicles, savings, investments, etc.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hasPastDebts">Do you have any past debts?</Label>
                    <Select
                      value={formData.hasPastDebts}
                      onValueChange={(value) => handleInputChange("hasPastDebts", value)}
                    >
                      <SelectTrigger className="input-field">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.hasPastDebts === "yes" && (
                    <div className="space-y-2">
                      <Label htmlFor="numberOfDebts">Number of Debts</Label>
                      <Input
                        id="numberOfDebts"
                        type="number"
                        placeholder="2"
                        min="1"
                        value={formData.numberOfDebts}
                        onChange={(e) => handleInputChange("numberOfDebts", e.target.value)}
                        className="input-field"
                      />
                      <p className="text-xs text-muted-foreground">
                        Total number of outstanding debts
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="hasEmi">Do you pay any EMI?</Label>
                    <Select
                      value={formData.hasEmi}
                      onValueChange={(value) => handleInputChange("hasEmi", value)}
                    >
                      <SelectTrigger className="input-field">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.hasEmi === "yes" && (
                    <div className="space-y-2">
                      <Label htmlFor="emiAmount">Monthly EMI Amount ($)</Label>
                      <Input
                        id="emiAmount"
                        type="number"
                        placeholder="500"
                        value={formData.emiAmount}
                        onChange={(e) => handleInputChange("emiAmount", e.target.value)}
                        className="input-field"
                      />
                      <p className="text-xs text-muted-foreground">
                        Total EMI you pay per month
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Document Upload */}
            {step === 4 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-display font-semibold text-foreground mb-6">
                  Upload Transaction Data
                </h2>
                <p className="text-muted-foreground mb-6">
                  Upload your last 3 months of bank transaction data in CSV format.
                  This helps our AI analyze your financial behavior and make a fair
                  credit decision.
                </p>

                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                    isDragActive
                      ? "border-primary bg-primary/5"
                      : formData.transactionFile
                      ? "border-success bg-success/5"
                      : "border-border hover:border-primary hover:bg-primary/5"
                  }`}
                >
                  <input {...getInputProps()} />
                  {formData.transactionFile ? (
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-success" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {formData.transactionFile.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {(formData.transactionFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData((prev) => ({ ...prev, transactionFile: null }));
                        }}
                      >
                        Remove File
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Upload className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {isDragActive
                            ? "Drop your file here"
                            : "Drag & drop your CSV file here"}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          or click to browse
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="w-4 h-4" />
                        <span>Only CSV files accepted</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="glass-card p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      Your data is secure
                    </p>
                    <p className="text-sm text-muted-foreground">
                      All uploaded data is encrypted and only used for credit
                      assessment. We never share your information with third parties.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <Button
                  type="button"
                  variant="hero"
                  onClick={() => setStep(step + 1)}
                  className="gap-2"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  variant="success" 
                  className="gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Submit Application
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Apply;
