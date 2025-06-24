# دليل نشر موقع هايبر لينك

## خطوات النشر الكاملة

### 1. إعداد Supabase (قاعدة البيانات)

1. **إنشاء حساب Supabase:**
   - اذهب إلى https://supabase.com
   - سجل دخول باستخدام GitHub (waleedhb1 / WAleed@122)

2. **إنشاء مشروع جديد:**
   - اضغط "New Project"
   - اختر اسم المشروع: "hyperlink-website"
   - اختر كلمة مرور قوية لقاعدة البيانات
   - اختر المنطقة الأقرب (مثل eu-west-1)

3. **إعداد قاعدة البيانات:**
   - اذهب إلى SQL Editor
   - انسخ والصق محتوى ملف `setup-database.sql`
   - شغل الاستعلام لإنشاء الجداول

4. **الحصول على مفاتيح API:**
   - اذهب إلى Settings > API
   - انسخ:
     - Project URL
     - anon/public key

### 2. إعداد EmailJS

1. **إنشاء حساب EmailJS:**
   - اذهب إلى https://www.emailjs.com
   - سجل حساب جديد أو ادخل بـ GitHub

2. **إعداد الخدمة:**
   - اذهب إلى Email Services
   - اضغط "Add New Service"
   - اختر Gmail أو أي مزود آخر
   - ربط مع waleedalhabib@gmail.com

3. **إنشاء Template:**
   - اذهب إلى Email Templates
   - اضغط "Create New Template"
   - استخدم هذا المحتوى:

```html
Subject: طلب جديد من موقع هايبر لينك

مرحباً،

تم استلام طلب جديد من موقع هايبر لينك:

الاسم: {{from_name}}
البريد الإلكتروني: {{from_email}}
الشركة: {{company}}
الهاتف: {{phone}}
الخدمة المطلوبة: {{service}}
الميزانية: {{budget}}

الرسالة:
{{message}}

تاريخ الإرسال: {{submission_date}}

---
فريق هايبر لينك
```

4. **الحصول على المفاتيح:**
   - User ID من Account settings
   - Service ID من Email Services
   - Template ID من Email Templates

### 3. نشر على Vercel

1. **ربط GitHub بـ Vercel:**
   - اذهب إلى https://vercel.com
   - سجل دخول بـ GitHub (waleedhb1 / WAleed@122)
   - اسمح لـ Vercel بالوصول للمستودعات

2. **إنشاء مشروع جديد:**
   - اضغط "New Project"
   - اختر مستودع المشروع
   - اضغط "Import"

3. **إعداد متغيرات البيئة:**
   في Vercel Dashboard > Settings > Environment Variables، أضف:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   EMAILJS_SERVICE_ID=your_service_id
   EMAILJS_TEMPLATE_ID=your_template_id
   EMAILJS_USER_ID=your_user_id
   ```

4. **النشر:**
   - اضغط "Deploy"
   - انتظر انتهاء النشر
   - احصل على رابط الموقع

### 4. ربط دومين مخصص (اختياري)

1. **شراء دومين:**
   - يمكن شراء من Namecheap, GoDaddy, أو أي مزود آخر
   - مثال: hyperlink.sa أو hyperlink-solutions.com

2. **ربط الدومين بـ Vercel:**
   - في Vercel Dashboard > Settings > Domains
   - اضغط "Add Domain"
   - أدخل اسم الدومين
   - اتبع تعليمات DNS

### 5. اختبار الموقع

بعد النشر، تأكد من:
- [ ] فتح الموقع بشكل صحيح
- [ ] إرسال نموذج التواصل يعمل
- [ ] وصول الإيميلات لـ waleedalhabib@gmail.com
- [ ] عمل جميع الصفحات
- [ ] سرعة تحميل الموقع

### 6. لوحة تحكم المدير

للوصول للطلبات:
- اذهب إلى yoursite.com/admin (سننشئها لاحقاً)
- أو استخدم Supabase Dashboard مباشرة

### 7. صيانة وتحديث

- النسخ الاحتياطية: تلقائية مع Supabase
- التحديثات: push إلى GitHub سيحدث نشر تلقائي
- المراقبة: Vercel Analytics مدمج

## روابط مهمة:
- Supabase Dashboard: https://app.supabase.com
- Vercel Dashboard: https://vercel.com/dashboard
- EmailJS Dashboard: https://dashboard.emailjs.com

## الدعم الفني:
إذا واجهت أي مشاكل، تواصل مع:
- الدعم الفني لـ Vercel
- مجتمع Supabase
- أو راجع هذا الدليل

---

✅ **بعد إكمال جميع الخطوات، ستحصل على موقع مفعل بالكامل مع قاعدة بيانات وإرسال إيميلات!** 