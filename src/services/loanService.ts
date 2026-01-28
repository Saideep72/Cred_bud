import { supabase } from '@/lib/supabase';
import { LoanApplication, TransactionRecord } from '@/types/loan';

export const loanService = {
  // Submit a new loan application
  async submitApplication(applicationData: Omit<LoanApplication, 'id' | 'created_at' | 'updated_at'>) {
    try {
      console.log('Submitting application data:', applicationData);
      
      const { data, error } = await supabase
        .from('loan_applications')
        .insert([applicationData])
        .select();

      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }
      
      console.log('Application submitted successfully:', data);
      // Return the first item from the array
      return data && data.length > 0 ? data[0] : null;
    } catch (error) {
      console.error('Error submitting loan application:', error);
      throw error;
    }
  },

  // Get user's loan applications
  async getUserApplications(email: string) {
    try {
      const { data, error } = await supabase
        .from('loan_applications')
        .select('*')
        .eq('email', email)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching loan applications:', error);
      throw error;
    }
  },

  // Get single application by ID
  async getApplicationById(id: string) {
    try {
      const { data, error } = await supabase
        .from('loan_applications')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching loan application:', error);
      throw error;
    }
  },

  // Upload transaction file to Supabase Storage
  async uploadTransactionFile(file: File, applicationId: string) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${applicationId}/transaction_${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('transaction-files')
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('transaction-files')
        .getPublicUrl(fileName);

      return {
        path: data.path,
        publicUrl,
        fileName: file.name
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  // Update application with file reference
  async updateApplicationWithFile(applicationId: string, fileUrl: string, fileName: string) {
    try {
      const { data, error } = await supabase
        .from('loan_applications')
        .update({
          transaction_file_url: fileUrl,
          transaction_file_name: fileName
        })
        .eq('id', applicationId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating application with file:', error);
      throw error;
    }
  },

  // Parse and store transaction records from CSV
  async storeTransactionRecords(applicationId: string, transactions: Omit<TransactionRecord, 'id' | 'created_at'>[]) {
    try {
      const transactionsWithAppId = transactions.map(transaction => ({
        ...transaction,
        application_id: applicationId
      }));

      const { data, error } = await supabase
        .from('transaction_records')
        .insert(transactionsWithAppId)
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error storing transaction records:', error);
      throw error;
    }
  }
};
