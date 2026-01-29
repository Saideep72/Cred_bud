export interface LoanApplication {
  id?: string;
  created_at?: string;
  updated_at?: string;
  
  // Personal Information
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  date_of_birth?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  
  // Employment Information
  employment_status?: string;
  employer?: string;
  job_title?: string;
  monthly_income?: number;
  employment_duration?: string;
  
  // Loan Details
  loan_amount: number;
  loan_purpose?: string;
  loan_term: number;
  
  // Financial Information
  total_assets?: number;
  has_past_debts?: boolean;
  number_of_debts?: number;
  has_emi?: boolean;
  emi_amount?: number;
  
  // Application Status
  status?: 'pending' | 'approved' | 'rejected' | 'under_review';
  
  // File upload
  transaction_file_url?: string;
  transaction_file_name?: string;
  
  // Metadata
  user_ip?: string;
  user_agent?: string;
}

export interface TransactionRecord {
  id?: string;
  created_at?: string;
  application_id: string;
  transaction_date?: string;
  description?: string;
  amount?: number;
  transaction_type?: 'credit' | 'debit';
  balance?: number;
  category?: string;
}
