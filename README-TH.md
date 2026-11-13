# FreeAITools — คู่มือติดตั้งภาษาไทย

## สิ่งที่มีในโปรเจกต์
- เว็บไซต์ภาษาอังกฤษแบบ responsive
- เครื่องมือ AI 4 แบบ: Writer, Caption, Business Name, Email
- Cloudflare Pages Function ที่เรียก Gemini API ฝั่งเซิร์ฟเวอร์
- หน้า About, Blog, Contact, Privacy และ Terms (หน้า legal เป็นเพียง template ต้องตรวจและแก้ก่อนใช้จริง)
- ช่องโฆษณาเป็น placeholder เท่านั้น ยังไม่มีโฆษณาจริง

## ขั้นตอน 1: สร้าง API Key
1. เข้า https://aistudio.google.com/
2. ลงชื่อเข้าใช้ Google และสร้าง Gemini API key
3. เก็บ key ไว้เป็นความลับ ห้ามใส่ในไฟล์ `app.js`, `index.html` หรือโพสต์ลง GitHub
4. โปรดตรวจสอบราคา โควต้า และเงื่อนไขการใช้ข้อมูลของ Gemini API ก่อนเปิดให้บุคคลทั่วไปใช้

## ขั้นตอน 2: สร้าง GitHub repository
1. สมัคร/เข้าสู่ระบบ https://github.com/
2. สร้าง repository ใหม่ชื่อ `freeaitools`
3. แตกไฟล์ ZIP นี้ แล้วอัปโหลดทุกไฟล์และโฟลเดอร์เข้า repository
4. กด Commit changes

## ขั้นตอน 3: Deploy ด้วย Cloudflare Pages
1. เข้า https://dash.cloudflare.com/ และสมัครบัญชี
2. เลือก Workers & Pages → Create → Pages → Connect to Git
3. เชื่อม GitHub และเลือก repository `freeaitools`
4. เลือก Framework preset: None
5. Build command: เว้นว่าง
6. Build output directory: `/` หรือโฟลเดอร์ root ตามหน้าจอที่ระบบแนะนำ
7. Deploy

Cloudflare Pages รองรับ static assets และ Pages Functions; ตรวจสอบโควต้าปัจจุบันก่อนเผยแพร่

## ขั้นตอน 4: ตั้งค่า Gemini key
1. เปิดโปรเจกต์ Pages ใน Cloudflare
2. ไปที่ Settings → Variables and Secrets (หรือ Functions → Environment variables ตามหน้าจอ)
3. เพิ่ม secret ชื่อ `GEMINI_API_KEY`
4. วาง API key จาก AI Studio เป็นค่า
5. บันทึก แล้ว Trigger deployment ใหม่

## ขั้นตอน 5: ทดสอบ
1. เปิด URL ที่ Cloudflare ให้มา
2. เลือก AI Writer
3. พิมพ์ prompt ภาษาอังกฤษอย่างน้อย 8 ตัวอักษร
4. กด Generate
5. ลองเครื่องมืออื่นด้วย
6. ถ้าเจอ error ให้ดู deployment logs และตรวจชื่อ secret

## ก่อนเปิดรับคนทั่วไป
- เปลี่ยน `YOUR CONTACT EMAIL HERE` ใน contact.html
- แก้ privacy.html และ terms.html ให้ตรงกับการทำงานจริง รวมถึงการใช้ AI provider, logs, cookies, analytics และโฆษณา
- เพิ่มบทความต้นฉบับที่มีประโยชน์จริง ไม่ใช่ข้อความซ้ำหรือสร้างจำนวนมากแบบอัตโนมัติ
- ใส่ rate limit / bot protection / quota ต่อผู้ใช้ และตั้ง budget alerts หากเปิด billing
- ตรวจการเปิดเผยการส่ง prompt ไปยังผู้ให้บริการ AI และห้ามให้ผู้ใช้ส่งข้อมูลอ่อนไหว
- ยังไม่ควรเปิด AdSense จนกว่าจะมีเนื้อหาที่มีคุณภาพและผ่านนโยบาย

## ข้อควรระวังเรื่องต้นทุน
Gemini API Free Tier มีโควต้าและข้อจำกัดตามรุ่นโมเดล ซึ่งอาจเปลี่ยนได้ การเปิดให้คนทั่วไปใช้งานอาจทำให้โควต้าหมดหรือเกิดค่าใช้จ่ายหากใช้แผนชำระเงิน อย่าเปิด billing โดยไม่ตั้งงบและจำกัดการใช้งานก่อน
