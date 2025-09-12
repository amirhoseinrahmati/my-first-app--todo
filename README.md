# تمرین عملی DevOps – پروژه TODO با CI/CD

این پروژه‌ی ساده بهت کمک می‌کنه مفاهیم CI/CD، داکر و استقرار رو **عملاً** لمس کنی.

## پیش‌نیازها
- Node.js 18+
- Git
- (اختیاری) Docker
- حساب GitHub (برای CI)

## اجرای لوکال
```bash
npm ci
npm run dev
# سپس برو به: http://localhost:3000
```

## تست‌ها
```bash
npm test
```

## Docker (اختیاری)
```bash
docker build -t todo-ci-cd-demo .
docker run -p 3000:3000 todo-ci-cd-demo
# http://localhost:3000
```

یا با docker-compose:
```bash
docker-compose up --build
```

## فعال‌سازی CI در GitHub
1. یک ریپو در GitHub بساز و این کد را Push کن.
2. در تب **Actions**، Workflow به اسم `CI` به‌طور خودکار اجرا می‌شود و `npm test` را می‌زند.
3. اگر خواستی Docker Image به Docker Hub هم Push شود:
   - در Settings → Secrets and variables → Actions
   - دو Secret بساز: `DOCKERHUB_USERNAME` و `DOCKERHUB_TOKEN`
   - سپس هر Push باعث Build و Push ایمیج به Docker Hub می‌شود با تگ:
     `{DOCKERHUB_USERNAME}/todo-ci-cd-demo:latest`

## استقرار (Deployment) ساده
- ساده‌ترین مسیر برای شروع: **Render** یا **Railway**
- Render:
  - New → Web Service
  - اتصال به ریپو GitHub همین پروژه
  - Build Command: `npm ci`
  - Start Command: `node src/index.js`
  - Port: `3000`
- اگر Docker را ترجیح می‌دهی، کافیست گزینه Docker را انتخاب و همین `Dockerfile` استفاده شود.

## ساختار پروژه
```
/public          # فرانت ساده (HTML/JS)
/src             # سرور Express
/tests           # تست‌های API با supertest
.github/workflows/ci.yml  # CI در GitHub Actions
Dockerfile
docker-compose.yml
```

## نکته
- دیتابیس فعلاً in-memory است تا تمرکز روی CI/CD باشد.
- در جلسات بعد می‌توانیم Postgres اضافه کنیم، Migration بنویسیم و تست‌های یکپارچه عمیق‌تر کنیم.# my-first-app--todo
# my-first-app--todo
# my-first-app--todo
