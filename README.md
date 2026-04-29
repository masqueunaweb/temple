# TEMPLE

27 días. Constancia silenciosa.

TEMPLE es una plataforma de desafíos de 27 días organizada en 5 dimensiones vitales. Minimalismo absoluto, UX premium, zero fricción.

## Stack

- **Framework:** Next.js 14+ con App Router
- **Estilos:** Tailwind CSS (UI custom desde cero)
- **Auth + DB:** Supabase (magic link auth, PostgreSQL, RLS)
- **Deploy:** Vercel
- **PWA:** next-pwa (offline para firma diaria)

## Setup inicial

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Ve al SQL Editor y ejecuta el script `supabase/schema.sql`
3. Copia las credenciales desde Settings > API

### 3. Variables de entorno

Crea `.env.local` con:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_supabase_service_role_key
```

### 4. Ejecutar desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Deploy en Vercel

1. Conecta tu repo de GitHub a Vercel
2. Configura las variables de entorno en Vercel
3. Deploy automático en cada push a main

## Estructura del proyecto

```
temple/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing
│   ├── (auth)/            # Rutas de auth
│   │   └── login/
│   └── (app)/             # Rutas autenticadas
│       ├── dashboard/
│       ├── bloque/
│       └── registro/
├── components/            # Componentes React
│   ├── ui/               # Componentes base
│   ├── blocks/           # Componentes de bloques
│   └── layout/           # Layout components
├── lib/                  # Utilidades
│   ├── supabase/         # Clientes de Supabase
│   ├── types.ts          # Types globales
│   └── utils.ts          # Helpers
└── hooks/                # Custom hooks
```

## Principios de desarrollo

- Mobile-first absoluto (390px base)
- Performance es UX (LCP < 1.5s)
- TypeScript estricto (sin `any`)
- Archivos máximo 300 líneas
- Cero dependencias innecesarias

## Identidad visual

- **Paleta:** Blanco y negro dominante
- **Tipografía:** Inter (única fuente)
- **Estética:** Sin sombras, sin gradientes, spacing generoso

## Licencia

Copyright © 2026 Alex Sanchez (MQUW)
