@echo off
echo ===========================================
echo    🚀 أداة النشر التلقائي - هايبر لينك
echo ===========================================
echo.

echo 📌 الخطوة 1: إنشاء مستودع GitHub...
echo 👉 اذهب إلى: https://github.com/new
echo 👉 سجل دخول بـ: waleedhb1 / WAleed@122
echo 👉 اسم المستودع: hyperlink-website
echo 👉 اجعله Private ✅
echo 👉 اضغط Create repository
echo.
pause

echo 📤 الخطوة 2: رفع الملفات...
git push -u origin main
if %errorlevel% neq 0 (
    echo ❌ فشل في رفع الملفات. تأكد من إنشاء المستودع أولاً!
    pause
    exit /b 1
)

echo ✅ تم رفع الملفات بنجاح!
echo.

echo 🗄️ الخطوة 3: إعداد Supabase...
echo 👉 اذهب إلى: https://supabase.com
echo 👉 سجل دخول بـ GitHub (waleedhb1)
echo 👉 اضغط New Project
echo 👉 اسم المشروع: hyperlink-website
echo 👉 كلمة مرور قاعدة البيانات: HyperlinkDB@2025
echo 👉 المنطقة: Southeast Asia (Singapore)
echo.
pause

echo 🌐 الخطوة 4: نشر على Vercel...
echo 👉 اذهب إلى: https://vercel.com
echo 👉 سجل دخول بـ GitHub (waleedhb1)
echo 👉 اضغط Add New > Project
echo 👉 اختر hyperlink-website
echo 👉 اضغط Import ثم Deploy
echo.
pause

echo 🎉 مبروك! موقعك الآن جاهز!
echo 📧 لا تنس إعداد EmailJS لاستقبال الطلبات على: waleedalhabib@gmail.com
echo.
pause 