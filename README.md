# Technical Repair System (Texnika ta'miri va Ehtiyot qismlar hisobi)

## Talaba ma'lumotlari
- **Talaba:** QODIRJONOV XOJIAKBAR
- **Variant:** №15
- **Mavzu:** "Texnika ta'miri"
- **Biznes-logika:** "Ehtiyot qismlar hisobi"
- **AI funksiyasi:** "Nosozlik tahlili"
- **Fan:** Dasturiy ta'minot tizimlarini loyihalash

## Texnologiyalar
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Architecture:** Layered Architecture (MVC)
- **API Documentation:** Swagger UI

## O'rnatish va ishga tushirish (Setup)

1. PostgreSQL o'rnatilganligiga ishonch hosil qiling va `technical_repair_db` bazasini yarating:
   ```bash
   createdb technical_repair_db
   ```
   Yoki pgAdmin orqali kirib, yangi Database yarating.

2. `.env` faylini sozlang (agar mavjud bo'lmasa `.env.example` dan nusxa oling). Ma'lumotlarni o'zingizning PostgreSQL foydalanuvchingizga moslashtiring.

3. Kerakli paketlarni o'rnatish:
   ```bash
   npm install
   ```

4. Boshlang'ich ma'lumotlarni (seed) kiritish:
   ```bash
   npm run seed
   ```

5. Serverni ishga tushirish:
   ```bash
   npm run dev
   ```

## Swagger API Dokumentatsiyasi
Server ishga tushgandan so'ng, quyidagi manzil orqali Swagger UI ga kirishingiz mumkin:
`http://localhost:5000/api-docs`

Barcha testlarni aynan shu interfeys orqali amalga oshirish mumkin.
# amaliy-ish
