import { supabase } from '@/lib/supabase';

export const simpleConnectionTest = async () => {
  try {
    // Test 1: Check if we can reach Supabase at all
    console.log('Testing Supabase URL reachability...');
    
    // Test 2: Try to access the auth service
    const { data, error } = await supabase.auth.getSession();
    console.log('Auth service test:', { data, error });
    
    // Test 3: Try a simple query that should work even if table doesn't exist
    try {
      const { data: tableData, error: tableError } = await supabase
        .from('loan_applications')
        .select('count')
        .limit(1);
      
      console.log('Table test result:', { tableData, tableError });
      
      if (tableError) {
        // Check if it's a "relation does not exist" error
        if (tableError.message?.includes('relation') && tableError.message?.includes('does not exist')) {
          return { 
            success: false, 
            error: 'Table does not exist. Please run the SQL schema to create the loan_applications table.',
            fix: 'Run the SQL schema provided in Supabase SQL Editor'
          };
        }
        
        // Check for RLS issues
        if (tableError.message?.includes('policy')) {
          return { 
            success: false, 
            error: 'RLS policy issue. Please check your RLS policies.',
            fix: 'Disable RLS temporarily or add proper policies'
          };
        }
        
        return { success: false, error: tableError.message, details: tableError };
      }
      
      return { success: true, message: 'Connection and table access working!' };
      
    } catch (err) {
      console.error('Table test exception:', err);
      return { success: false, error: 'Exception during table test', details: err };
    }
    
  } catch (err) {
    console.error('Connection test failed:', err);
    return { success: false, error: 'Cannot connect to Supabase', details: err };
  }
};
