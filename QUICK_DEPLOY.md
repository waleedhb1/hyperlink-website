# 🚀 دليل النشر السريع - 5 دقائق فقط!

## ⚡ خطوات سريعة للنشر

### 1. إنشاء مستودع GitHub (دقيقة واحدة)
1. اذهب إلى [github.com](https://github.com) وسجل دخول بـ (waleedhb1 / WAleed@122)
2. اضغط الزر الأخضر "New repository" 
3. ضع اسم المستودع: `hyperlink-website`
4. اتركه Public
5. **لا تضع** ✅ على "Add a README file"
6. اضغط "Create repository"

### 2. رفع المشروع لـ GitHub (دقيقة واحدة)
انسخ والصق هذه الأوامر في PowerShell واحداً تلو الآخر:

```powershell
git remote set-url origin https://github.com/waleedhb1/hyperlink-website.git
git branch -M main
git push -u origin main
```

### 3. إعداد Supabase (دقيقتان)
1. اذهب إلى [supabase.com](https://supabase.com)
2. سجل دخول بـ GitHub (waleedhb1)
3. اضغط "New Project"
4. اسم المشروع: `hyperlink-website`
5. كلمة مرور قوية لقاعدة البيانات (احفظها!)
6. اختر منطقة: `Southeast Asia (Singapore)`
7. انتظر إنشاء المشروع (دقيقة واحدة)
8. اذهب إلى **SQL Editor** في القائمة اليسار
9. انسخ والصق محتوى ملف `setup-database.sql` وشغله
10. اذهب إلى **Settings > API** واحفظ:
    - Project URL
    - anon public key

### 4. إعداد EmailJS (دقيقة واحدة)
1. اذهب إلى [emailjs.com](https://dashboard.emailjs.com)
2. سجل دخول بـ Google باستخدام waleedalhabib@gmail.com
3. اضغط **Email Services > Add New Service**
4. اختر Gmail واتبع التعليمات
5. اضغط **Email Templates > Create New Template**
6. استخدم Template ID: `template_hyperlink`
7. ضع هذا المحتوى:
```
Subject: طلب جديد من هايبر لينك - {{from_name}}

مرحباً،

طلب جديد من الموقع:
الاسم: {{from_name}}
الإيميل: {{from_email}}
الشركة: {{company}}
الهاتف: {{phone}}
الخدمة: {{service}}
الميزانية: {{budget}}
الرسالة: {{message}}
التاريخ: {{submission_date}}

فريق هايبر لينك
```
8. احفظ وتذكر:
   - Service ID
   - Template ID  
   - User ID (من Account settings)

### 5. النشر على Vercel (دقيقة واحدة)
1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل دخول بـ GitHub (waleedhb1)
3. اضغط **New Project**
4. اختر مستودع `hyperlink-website`
5. اضغط **Import**
6. اضغط **Deploy** (لا تغير شيء الآن)
7. انتظر انتهاء النشر
8. ستحصل على رابط مثل: `https://hyperlink-website-xxx.vercel.app`

### 6. إضافة متغيرات البيئة (دقيقة واحدة)
في لوحة Vercel:
1. اذهب إلى **Settings > Environment Variables**
2. أضف هذه المتغيرات واحداً تلو الآخر:

| Variable Name | Value | 
|---------------|--------|
| `SUPABASE_URL` | الرابط من Supabase |
| `SUPABASE_ANON_KEY` | المفتاح من Supabase |
| `EMAILJS_SERVICE_ID` | من EmailJS |
| `EMAILJS_TEMPLATE_ID` | من EmailJS |
| `EMAILJS_USER_ID` | من EmailJS |

3. اضغط **Save** لكل متغير
4. اذهب إلى **Deployments**
5. اضغط على آخر deployment
6. اضغط **Redeploy**

---

## 🎉 انتهيت! 

الموقع الآن مفعل بالكامل على:
- **الموقع**: `https://your-site.vercel.app`
- **لوحة التحكم**: `https://your-site.vercel.app/admin.html`

### اختبار سريع:
1. افتح الموقع
2. اذهب لصفحة التواصل
3. املأ النموذج وأرسل
4. تأكد من وصول الإيميل لـ waleedalhabib@gmail.com
5. افتح لوحة التحكم وتأكد من ظهور الطلب

---

## 🆘 مشاكل محتملة وحلولها

**❌ المشكلة**: لا يعمل النموذج
**✅ الحل**: تأكد من إضافة جميع متغيرات البيئة في Vercel

**❌ المشكلة**: لا تصل الإيميلات  
**✅ الحل**: تأكد من ربط Gmail في EmailJS وإعداد Template صحيح

**❌ المشكلة**: خطأ في قاعدة البيانات
**✅ الحل**: تأكد من تشغيل ملف `setup-database.sql` في Supabase

---

**💡 نصيحة**: احفظ جميع الروابط والمفاتيح في مكان آمن! 