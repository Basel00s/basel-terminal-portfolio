# Basel — Developer Portfolio

A Japanese-inspired, dark portfolio built with Next.js App Router, TypeScript, and Tailwind CSS. A separate NestJS API provides a validated contact endpoint.

## Project structure

```
.
├── app/                         # Next.js App Router
├── components/
│   ├── sections/                 # Navbar, Hero, Projects, Skills, etc.
│   ├── ui/                       # Sakura background
│   └── Portfolio.tsx
├── public/samurai.svg
├── backend/
│   └── src/
│       ├── contact/
│       │   ├── dto/
│       │   ├── contact.controller.ts
│       │   ├── contact.module.ts
│       │   └── contact.service.ts
│       ├── app.module.ts
│       └── main.ts
├── tailwind.config.ts
└── package.json
```

## Frontend

From the repository root:

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open http://localhost:3000.

## NestJS contact API

In a second terminal:

```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```

The API listens on http://localhost:4000. The contact form sends a POST request to `/contact`.

Example payload:

```json
{
  "name": "Ada",
  "email": "ada@example.com",
  "message": "Hello Basel, I would like to get in touch."
}
```

The DTO validates fields with class-validator. The global validation pipe rejects unknown fields. CORS is restricted to the configured `FRONTEND_ORIGIN` (comma-separated origins are supported).

## Important backend note

The contact service currently validates and logs submissions, then returns a success response. It does **not** send email or persist messages yet. Before production, connect a mail provider or database, add rate limiting and spam protection, and configure the exact deployed frontend origin.

## Personalize before publishing

- Update project cards in `components/sections/Projects.tsx` with individual repository URLs and real screenshots.
- Add verified work and education details in `components/sections/Experience.tsx`.
- Add a real PDF at `public/resume.pdf` and enable a download link in `components/sections/ResumePreview.tsx`.
- Add public social profiles or a contact email when you want them displayed.
- Update the bio and skills to reflect your current level.

The content intentionally describes a learning and project-building journey rather than inventing employment history, awards, or credentials.
