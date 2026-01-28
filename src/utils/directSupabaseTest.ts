import { supabase } from '@/lib/supabase';

export const directSupabaseTest = async () => {
  console.log('🔥 Direct Supabase test...');
  
  try {
    const testData = {
      first_name: 'Direct',
      last_name: 'Test',
      email: `direct${Date.now()}@test.com`,
      loan_amount: 5000,
      loan_term: 12,
    };

    console.log('📤 Sending data:', testData);

    const { data, error, status, statusText } = await supabase
      .from('loan_applications')
      .insert([testData])
      .select();

    console.log('📥 Response:', { data, error, status, statusText });

    if (error) {
      console.error('❌ Full error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return { success: false, error: error.message, details: error };
    }

    return { success: true, data };
    
  } catch (err) {
    console.error('❌ Exception:', err);
    return { success: false, error: 'Exception occurred', details: err };
  }
};
