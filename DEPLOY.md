# 🚀 نشر سريع - 5 دقائق فقط!

## ⚡ النشر السريع

### 1. رفع إلى GitHub (دقيقة واحدة)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/hyperlink-website.git
git push -u origin main
```

### 2. نشر على Vercel (دقيقتان)
1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل دخول بـ GitHub
3. اضغط "New Project"
4. اختر مستودع `hyperlink-website`
5. اضغط "Deploy"

### 3. إعداد Supabase (دقيقتان)
1. اذهب إلى [supabase.com](https://supabase.com)
2. سجل دخول بـ GitHub
3. اضغط "New Project"
4. اختر اسم: `hyperlink-website`
5. في SQL Editor، شغل:
```sql
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
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4. ربط المتغيرات في Vercel (دقيقة واحدة)
في Vercel → Settings → Environment Variables، أضف:
- `SUPABASE_URL`: من Supabase Settings → API
- `SUPABASE_ANON_KEY`: من Supabase Settings → API

### 5. اختياري: إعداد الإيميل
في [emailjs.com](https://emailjs.com):
1. سجل حساب
2. أضف Gmail service
3. أنشئ template
4. أضف المتغيرات في Vercel

## 🎉 تم!
موقعك الآن جاهز على رابط مثل: `https://hyperlink-website.vercel.app`

## 📱 اختبار النموذج
1. اذهب إلى صفحة "تواصل معنا"
2. املأ النموذج واضغط "إرسال"
3. تحقق من البيانات في Supabase Table Editor

---
💡 **نصيحة:** احفظ رابط Supabase Dashboard لمراجعة الطلبات! 