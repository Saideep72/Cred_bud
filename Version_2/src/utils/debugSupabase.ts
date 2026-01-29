import { supabase } from '@/lib/supabase';

export const debugSupabase = async () => {
  console.log('=== Supabase Debug Session ===');
  
  // 1. Test basic connection
  console.log('1. Testing basic connection...');
  try {
    const { data, error } = await supabase.from('loan_applications').select('count').limit(1);
    if (error) {
      console.error('❌ Basic connection failed:', error);
      return { success: false, error: error.message, step: 'basic_connection' };
    }
    console.log('✅ Basic connection successful');
  } catch (err) {
    console.error('❌ Basic connection exception:', err);
    return { success: false, error: 'Connection exception', step: 'basic_connection' };
  }
  
  // 2. Test table structure
  console.log('2. Testing table structure...');
  try {
    const { data, error } = await supabase.from('loan_applications').select('*').limit(1);
    if (error) {
      console.error('❌ Table structure test failed:', error);
      return { success: false, error: error.message, step: 'table_structure' };
    }
    console.log('✅ Table structure test passed');
  } catch (err) {
    console.error('❌ Table structure exception:', err);
    return { success: false, error: 'Table structure exception', step: 'table_structure' };
  }
  
  // 3. Test insert with minimal data
  console.log('3. Testing minimal insert...');
  try {
    const testData = {
      first_name: 'Test',
      last_name: 'User',
      email: `test${Date.now()}@example.com`,
      loan_amount: 1000,
      loan_term: 12
    };
    
    const { data, error } = await supabase
      .from('loan_applications')
      .insert([testData])
      .select()
      .single();
      
    if (error) {
      console.error('❌ Minimal insert failed:', error);
      return { success: false, error: error.message, step: 'minimal_insert', details: testData };
    }
    console.log('✅ Minimal insert successful:', data);
    return { success: true, data };
  } catch (err) {
    console.error('❌ Minimal insert exception:', err);
    return { success: false, error: 'Insert exception', step: 'minimal_insert' };
  }
};

export const checkTableExists = async () => {
  try {
    const { data, error } = await supabase.rpc('table_exists', { table_name: 'loan_applications' });
    if (error) {
      console.error('Error checking table existence:', error);
      return false;
    }
    return data;
  } catch (err) {
    console.error('Exception checking table:', err);
    return false;
  }
};
