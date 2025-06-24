# 🚀 Hyperlink Website - دليل النشر الكامل

## 📋 نظرة عامة

موقع شركة هايبر لينك للحلول التقنية الإبداعية مع:
- ✅ استضافة مجانية مدى الحياة على **Vercel**
- ✅ قاعدة بيانات مجانية مدى الحياة على **Supabase**
- ✅ إرسال إيميلات مجاني على **EmailJS**
- ✅ نموذج تواصل متكامل مع حفظ البيانات
- ✅ تصميم متجاوب وحديث

---

## 🔧 خطوات النشر

### 1️⃣ إعداد Vercel (الاستضافة)

1. **إنشاء حساب Vercel:**
   - اذهب إلى [vercel.com](https://vercel.com)
   - سجل دخول بـ GitHub أو Google
   - اختر الخطة المجانية (Hobby)

2. **رفع المشروع:**
   ```bash
   # تثبيت Vercel CLI
   npm install -g vercel
   
   # تسجيل الدخول
   vercel login
   
   # نشر المشروع
   vercel --prod
   ```

3. **أو رفع عبر GitHub:**
   - ارفع الملفات إلى مستودع GitHub
   - في Vercel: New Project → Import من GitHub
   - اختر المستودع واضغط Deploy

### 2️⃣ إعداد Supabase (قاعدة البيانات)

1. **إنشاء حساب Supabase:**
   - اذهب إلى [supabase.com](https://supabase.com)
   - سجل دخول بـ GitHub
   - اختر الخطة المجانية

2. **إنشاء مشروع جديد:**
   - اضغط "New Project"
   - اختر اسم المشروع: `hyperlink-website`
   - اختر كلمة مرور قوية لقاعدة البيانات
   - اختر المنطقة الأقرب لك

3. **إنشاء جدول البيانات:**
   اذهب إلى SQL Editor وشغل هذا الكود:
   ```sql
   -- إنشاء جدول طلبات التواصل
   CREATE TABLE contact_requests (
     id BIGSERIAL PRIMARY KEY,
     first_name TEXT NOT NULL,
     last_name TEXT NOT NULL,
     email TEXT NOT NULL,
     phone TEXT,
     company TEXT,
     service TEXT,
     budget TEXT,
     message TEXT NOT NULL,
     status TEXT DEFAULT 'new',
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- إنشاء فهرس للبحث السريع
   CREATE INDEX idx_contact_requests_email ON contact_requests(email);
   CREATE INDEX idx_contact_requests_created_at ON contact_requests(created_at);
   CREATE INDEX idx_contact_requests_status ON contact_requests(status);

   -- إعداد RLS (Row Level Security)
   ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

   -- السماح بالقراءة والكتابة للمفاتيح المصرح بها
   CREATE POLICY "Enable read access for service role" ON contact_requests
     FOR SELECT USING (true);

   CREATE POLICY "Enable insert access for service role" ON contact_requests
     FOR INSERT WITH CHECK (true);
   ```

4. **الحصول على مفاتيح API:**
   - اذهب إلى Settings → API
   - احفظ `Project URL` و `anon public key`

### 3️⃣ إعداد EmailJS (إرسال الإيميلات)

1. **إنشاء حساب EmailJS:**
   - اذهب إلى [emailjs.com](https://www.emailjs.com)
   - سجل حساب جديد (مجاني حتى 200 إيميل/شهر)

2. **إعداد خدمة الإيميل:**
   - اذهب إلى Email Services
   - اضغط "Add New Service"
   - اختر Gmail أو أي مزود إيميل
   - اتبع التعليمات لربط حسابك

3. **إنشاء قالب الإيميل:**
   - اذهب إلى Email Templates
   - اضغط "Create New Template"
   - استخدم هذا القالب:

   ```html
   Subject: طلب جديد من موقع هايبر لينك - {{from_name}}

   مرحباً،

   تم استلام طلب جديد من موقع هايبر لينك:

   📝 **تفاصيل العميل:**
   - الاسم: {{from_name}}
   - الإيميل: {{from_email}}
   - الهاتف: {{phone}}
   - الشركة: {{company}}

   🔧 **تفاصيل المشروع:**
   - الخدمة المطلوبة: {{service}}
   - الميزانية: {{budget}}
   - الرسالة: {{message}}

   📅 **تاريخ الإرسال:** {{submission_date}}

   يرجى التواصل مع العميل في أقرب وقت ممكن.

   ---
   هايبر لينك - الحلول التقنية الإبداعية
   ```

4. **الحصول على المفاتيح:**
   - User ID: من Account → General
   - Service ID: من Email Services
   - Template ID: من Email Templates

### 4️⃣ إعداد متغيرات البيئة في Vercel

1. اذهب إلى مشروعك في Vercel
2. Settings → Environment Variables
3. أضف هذه المتغيرات:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
EMAILJS_SERVICE_ID=your-service-id
EMAILJS_TEMPLATE_ID=your-template-id
EMAILJS_USER_ID=your-user-id
```

### 5️⃣ إعادة النشر

بعد إضافة المتغيرات:
1. اذهب إلى Deployments في Vercel
2. اضغط على آخر deployment
3. اضغط "Redeploy"

---

## 📊 إدارة البيانات

### عرض الطلبات في Supabase:
1. اذهب إلى Table Editor
2. اختر جدول `contact_requests`
3. ستجد جميع الطلبات مع تفاصيلها

### تصدير البيانات:
```sql
-- تصدير جميع الطلبات
SELECT * FROM contact_requests ORDER BY created_at DESC;

-- تصدير الطلبات الجديدة فقط
SELECT * FROM contact_requests WHERE status = 'new';

-- إحصائيات الطلبات
SELECT 
  service,
  COUNT(*) as total_requests,
  COUNT(CASE WHEN status = 'new' THEN 1 END) as new_requests
FROM contact_requests 
GROUP BY service;
```

---

## 🔧 الصيانة والتحديث

### تحديث الموقع:
1. عدل الملفات محلياً
2. ارفعها إلى GitHub أو استخدم `vercel --prod`
3. سيتم النشر تلقائياً

### مراقبة الأداء:
- Vercel Analytics: مجاني مع الخطة المجانية
- Supabase Dashboard: مراقبة قاعدة البيانات
- EmailJS Dashboard: مراقبة الإيميلات المرسلة

---

## 📞 الدعم

إذا واجهت أي مشاكل:
1. تحقق من Console في المتصفح
2. راجع Logs في Vercel
3. تأكد من صحة متغيرات البيئة
4. تحقق من حدود الاستخدام في Supabase و EmailJS

---

## 🎉 مبروك!

موقعك الآن جاهز ومنشور مع:
- ✅ رابط مجاني مدى الحياة
- ✅ قاعدة بيانات للطلبات
- ✅ إشعارات إيميل تلقائية
- ✅ أداء عالي وسرعة ممتازة
- ✅ SSL مجاني
- ✅ CDN عالمي 