import { createClient } from '@supabase/supabase-js';

// تكوين Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  // السماح بـ CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // جلب جميع الطلبات
    const { data, error } = await supabase
      .from('contact_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ 
        error: 'خطأ في قاعدة البيانات',
        details: error.message 
      });
    }

    // إحصائيات سريعة
    const stats = {
      total: data.length,
      new: data.filter(req => req.status === 'new').length,
      today: data.filter(req => {
        const today = new Date().toDateString();
        const reqDate = new Date(req.created_at).toDateString();
        return today === reqDate;
      }).length
    };

    // إرجاع البيانات
    res.status(200).json({
      success: true,
      stats: stats,
      requests: data
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      error: 'خطأ في الخادم',
      details: error.message
    });
  }
} 