import { createClient } from '@supabase/supabase-js';

// تكوين Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// تكوين EmailJS
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
const EMAILJS_USER_ID = process.env.EMAILJS_USER_ID;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL;

export default async function handler(req, res) {
  // السماح بـ CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      service,
      budget,
      message
    } = req.body;

    // التحقق من البيانات المطلوبة
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ 
        error: 'الحقول المطلوبة مفقودة',
        missing: { firstName, lastName, email, message }
      });
    }

    // إنشاء البيانات للحفظ
    const contactData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone || null,
      company: company || null,
      service: service || null,
      budget: budget || null,
      message: message,
      created_at: new Date().toISOString(),
      status: 'new'
    };

    // حفظ في قاعدة البيانات
    const { data, error } = await supabase
      .from('contact_requests')
      .insert([contactData])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ 
        error: 'خطأ في حفظ البيانات',
        details: error.message 
      });
    }

    // إرسال إيميل تنبيه
    try {
      const emailData = {
        to_email: NOTIFICATION_EMAIL || 'info@hyperlink.sa', // الإيميل الذي ستستقبل عليه التنبيهات
        from_name: `${firstName} ${lastName}`,
        from_email: email,
        company: company || 'غير محدد',
        phone: phone || 'غير محدد',
        service: service || 'غير محدد',
        budget: budget || 'غير محدد',
        message: message,
        submission_date: new Date().toLocaleString('ar-SA')
      };

      // إرسال الإيميل باستخدام fetch إلى EmailJS
      const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_USER_ID,
          template_params: emailData
        })
      });

      if (!emailResponse.ok) {
        console.error('Email sending failed:', await emailResponse.text());
      }
    } catch (emailError) {
      console.error('Email error:', emailError);
      // لا نوقف العملية إذا فشل الإيميل
    }

    // إرجاع استجابة نجاح
    res.status(200).json({
      success: true,
      message: 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً.',
      id: data[0].id
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      error: 'خطأ في الخادم',
      details: error.message
    });
  }
} 