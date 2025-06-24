-- إعداد قاعدة البيانات للموقع
-- جدول طلبات التواصل
CREATE TABLE contact_requests (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    company VARCHAR(200),
    service VARCHAR(100),
    budget VARCHAR(50),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- إنشاء فهرس للبحث السريع
CREATE INDEX idx_contact_requests_status ON contact_requests(status);
CREATE INDEX idx_contact_requests_created_at ON contact_requests(created_at);
CREATE INDEX idx_contact_requests_email ON contact_requests(email);

-- تفعيل Row Level Security
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- سياسة للسماح بالإدراج للجميع (للنموذج العام)
CREATE POLICY "Allow public insert" ON contact_requests
    FOR INSERT WITH CHECK (true);

-- سياسة للسماح بالقراءة للمديرين فقط (سنضيف المفتاح لاحقاً)
CREATE POLICY "Allow admin read" ON contact_requests
    FOR SELECT USING (true);

-- جدول المشتركين في النشرة البريدية (اختياري)
CREATE TABLE newsletter_subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- فهرس للمشتركين
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);

-- تفعيل RLS للنشرة
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- سياسة للنشرة
CREATE POLICY "Allow public newsletter insert" ON newsletter_subscribers
    FOR INSERT WITH CHECK (true);

-- تحديث تلقائي لوقت التعديل
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contact_requests_updated_at 
    BEFORE UPDATE ON contact_requests 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- إضافة بعض البيانات التجريبية (اختياري)
INSERT INTO contact_requests (first_name, last_name, email, phone, company, service, budget, message, status) VALUES
('أحمد', 'محمد', 'ahmed@example.com', '+966501234567', 'شركة التقنية', 'تطوير مواقع', '10000-25000', 'أحتاج موقع إلكتروني لشركتي', 'new'),
('فاطمة', 'علي', 'fatima@example.com', '+966509876543', 'مؤسسة النور', 'تطبيقات الجوال', '25000-50000', 'أريد تطبيق للهواتف الذكية', 'new'); 