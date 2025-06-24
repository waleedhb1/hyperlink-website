# 🚀 دليل النشر الشامل - موقع هايبر لينك

## ⚡ الخطوات البسيطة (15 دقيقة فقط!)

### 1. 📱 إنشاء مستودع خاص على GitHub

1. **اذهب إلى** https://github.com
2. **سجل دخول** بـ:
   - Username: `waleedhb1`
   - Password: `WAleed@122`
3. **اضغط** زر "New repository" (الأخضر)
4. **ضع التفاصيل:**
   - Repository name: `hyperlink-website-private`
   - Description: `موقع هايبر لينك - مستودع خاص`
   - ✅ اختر **Private**
   - ❌ لا تضع علامة على "Add a README file"
5. **اضغط** "Create repository"

### 2. 📤 رفع الملفات للمستودع

**انسخ والصق في PowerShell (واحد تلو الآخر):**

```powershell
git remote add origin https://waleedhb1:WAleed@122@github.com/waleedhb1/hyperlink-website-private.git
git push -u origin main
```

### 3. 🗄️ إعداد Supabase (قاعدة البيانات)

1. **اذهب إلى** https://supabase.com
2. **اضغط** "Start your project"
3. **سجل دخول** بـ GitHub (waleedhb1)
4. **اضغط** "New Project"
5. **املأ التفاصيل:**
   - Project name: `hyperlink-website`
   - Database Password: `HyperlinkDB@2025` (احفظ هذه!)
   - Region: `Southeast Asia (Singapore)`
6. **انتظر** إنشاء المشروع (2-3 دقائق)

**إعداد الجداول:**
1. **اذهب إلى** SQL Editor
2. **انسخ والصق** محتوى ملف `setup-database.sql`
3. **اضغط** "Run"

**احصل على المفاتيح:**
1. **اذهب إلى** Settings > API
2. **انسخ:**
   - Project URL
   - anon public key

### 4. 📧 إعداد EmailJS

1. **اذهب إلى** https://emailjs.com
2. **سجل** حساب جديد
3. **اذهب إلى** Email Services
4. **اضغط** "Add New Service"
5. **اختر** Gmail
6. **املأ:**
   - Service ID: `gmail_service`
   - Email: `waleedalhabib@gmail.com`
   - إعدادات SMTP حسب التعليمات
7. **احفظ** Service ID
8. **اذهب إلى** Email Templates
9. **أنشئ** template جديد
10. **احفظ** Template ID

### 5. 🌐 نشر على Vercel

1. **اذهب إلى** https://vercel.com
2. **سجل دخول** بـ GitHub (waleedhb1)
3. **اضغط** "Add New" > "Project"
4. **اختر** `hyperlink-website-private` من قائمة GitHub
5. **اضغط** "Import"
6. **اضغط** "Deploy"
7. **انتظر** اكتمال النشر (2-3 دقائق)

### 6. ⚙️ إعداد متغيرات البيئة

**في لوحة تحكم Vercel:**
1. **اذهب إلى** Settings > Environment Variables
2. **أضف:**
   - `NEXT_PUBLIC_SUPABASE_URL` = [Project URL من Supabase]
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = [anon public key من Supabase]
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID` = [Service ID من EmailJS]
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` = [Template ID من EmailJS]
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` = [Public Key من EmailJS]

### 7. 🔄 إعادة النشر

1. **في Vercel** اضغط "Redeploy"
2. **انتظر** اكتمال النشر

---

## 🎯 النتيجة النهائية:

✅ **موقع آمن** بمستودع خاص
✅ **قاعدة بيانات** متقدمة مع Supabase
✅ **نظام إيميلات** احترافي
✅ **نشر سحابي** بـ CDN عالمي
✅ **SSL مجاني** و HTTPS
✅ **لوحة تحكم** لإدارة الطلبات

**الرابط النهائي:** ستحصل عليه من Vercel بصيغة:
`https://hyperlink-website-private-xyz.vercel.app`

---

## 🔧 ملفات التحديث المطلوبة:

سأحتاج لتحديث ملفات JavaScript لربطها بالخدمات:

### تحديث `api/submit-contact.js`:
```javascript
// إضافة اتصال Supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// باقي الكود...
```

### تحديث `script.js`:
```javascript
// إضافة EmailJS
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
// باقي الكود...
```

---

## 📞 الدعم:

إذا واجهت أي مشكلة:
1. **تحقق** من متغيرات البيئة
2. **تأكد** من صحة المفاتيح
3. **راجع** Console في المتصفح للأخطاء

**البريد الإلكتروني للطلبات:** waleedalhabib@gmail.com ✅ 