const express = require('express');
const app = express();

app.use(express.json());
const users = []; // قاعدة بيانات مؤقتة في الذاكرة

app.post('/register', (req, res) => {
  const { email, password } = req.body;

  // التحقق من البيانات
  if (!email || !password) {
    return res.status(400).json({ message: 'يرجى إدخال البريد الإلكتروني وكلمة السر' });
  }

  // التأكد إن المستخدم مش مسجّل قبل كده
  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(409).json({ message: 'المستخدم موجود بالفعل' });
  }

  // حفظ المستخدم
  users.push({ email, password });
  res.status(201).json({ message: 'تم إنشاء الحساب بنجاح' });
});

// نقطة نهاية تسجيل الدخول الجديدة
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'يرجى إدخال البريد الإلكتروني وكلمة السر' });
  }

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'البريد الإلكتروني أو كلمة السر غير صحيحة' });
  }

  res.status(200).json({ message: 'تم تسجيل الدخول بنجاح' });
});

app.get('/', (req, res) => {
  res.send('مرحباً بك في FreelaHub!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
