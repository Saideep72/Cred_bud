import { LoanApplication, TransactionRecord } from '@/types/loan';

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Get auth token
const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const loanService = {
  // Submit a new loan application
  async submitApplication(applicationData: any) {
    try {
      console.log('Submitting application data:', applicationData);
      
      const response = await fetch(`${API_BASE_URL}/api/loan/applications`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('API error:', error);
        throw new Error(error.detail || 'Failed to submit application');
      }
      
      const data = await response.json();
      console.log('Application submitted successfully:', data);
      return data;
    } catch (error) {
      console.error('Error submitting loan application:', error);
      throw error;
    }
  },

  // Get user's loan applications
  async getUserApplications(email?: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/loan/applications`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to fetch applications');
      }

      const data = await response.json();
      return data.applications || [];
    } catch (error) {
      console.error('Error fetching loan applications:', error);
      throw error;
    }
  },

  // Get single application by ID
  async getApplicationById(id: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/loan/applications/${id}`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to fetch application');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching loan application:', error);
      throw error;
    }
  },

  // Upload transaction file (placeholder - would need file upload endpoint)
  async uploadTransactionFile(file: File, applicationId: string) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('application_id', applicationId);
      
      const response = await fetch(`${API_BASE_URL}/api/loan/upload`, {
        method: 'POST',
        headers: {
          // Don't set Content-Type for FormData - browser sets it with boundary
          ...(localStorage.getItem('auth_token') && { 
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}` 
          })
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to upload file');
      }

      return await response.json();
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  // Update application with file reference (placeholder)
  async updateApplicationWithFile(applicationId: string, fileUrl: string, fileName: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/loan/applications/${applicationId}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          transaction_file_url: fileUrl,
          transaction_file_name: fileName
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to update application');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating application with file:', error);
      throw error;
    }
  },

  // Parse and store transaction records (placeholder)
  async storeTransactionRecords(applicationId: string, transactions: any[]) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/loan/${applicationId}/transactions`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ transactions }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to store transactions');
      }

      return await response.json();
    } catch (error) {
      console.error('Error storing transaction records:', error);
      throw error;
    }
  }
};
