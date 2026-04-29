# Guía de Deploy - TEMPLE

## Paso 1: Crear repositorio en GitHub

1. Ve a [github.com/new](https://github.com/new)
2. Repository name: `temple`
3. Description: `27 días. Constancia silenciosa.`
4. Marca como **Public** o **Private** (tu preferencia)
5. **NO** agregues .gitignore, README o license (ya existen)
6. Clica "Create repository"

## Paso 2: Subir código a GitHub

Una vez creado el repo, ejecuta estos comandos en tu terminal:

```bash
cd /Users/alexsanchez/Downloads/temple
git branch -M main
git remote add origin https://github.com/masqueunaweb/temple.git
git push -u origin main
```

## Paso 3: Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com) y haz login con tu cuenta de GitHub
2. Clica "Add New..." → "Project"
3. Importa el repositorio `masqueunaweb/temple`
4. Configura el proyecto:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (dejar vacío)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Clica "Deploy"

## Paso 4: Configurar variables de entorno en Vercel

1. En Vercel, ve a tu proyecto → Settings → Environment Variables
2. Agrega estas variables:

```
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_de_supabase
```

3. Clica "Save"
4. Redeploy el proyecto (Deployments → Redeploy)

## Paso 5: Configurar proyecto Supabase

1. Ve a [supabase.com](https://supabase.com) y haz login
2. Clica "New Project"
3. Configura:
   - **Name**: `temple`
   - **Database Password**: (guarda esta contraseña)
   - **Region**: `EU West (Frankfurt)` o la más cercana
4. Clica "Create new project"
5. Espera ~2 minutos a que se cree

## Paso 6: Obtener credenciales de Supabase

1. En tu proyecto Supabase → Settings → API
2. Copia estos valores:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL` (ya configurado)
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY` (ya configurado)
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY` (necesario para Vercel)

3. Actualiza las variables en Vercel con estos valores

## Paso 7: Ejecutar schema SQL en Supabase

1. En tu proyecto Supabase → SQL Editor
2. Clica "New Query"
3. Copia el contenido de `supabase/schema.sql`
4. Pega el código en el editor
5. Clica "Run" (abajo a la derecha)
6. Verifica que no haya errores

## Paso 8: Generar iconos PWA

```bash
cd /Users/alexsanchez/Downloads/temple
npm install sharp
node scripts/generate-icons.js
git add public/icons/
git commit -m "feat: add PWA icons"
git push
```

## Paso 9: Verificar deploy en Vercel

1. En Vercel, ve a Deployments
2. Espera a que el deploy termine (verde ✓)
3. Clica en la URL del deploy
4. Verifica que la app cargue correctamente

## Paso 10: Probar la app

1. Abre la URL de Vercel en tu navegador
2. Deberías ver la landing de TEMPLE
3. Clica en "Entrar" para probar el login con magic link
4. Revisa tu email para el magic link

## Resumen de URLs

- **GitHub**: https://github.com/masqueunaweb/temple
- **Vercel**: (se genera al conectar)
- **Supabase**: https://supabase.com/dashboard/project/tu-project-id

## Troubleshooting

### El build falla en Vercel
- Verifica que las variables de entorno estén configuradas
- Revisa los logs de build en Vercel

### Magic link no funciona
- Verifica que las credenciales de Supabase sean correctas
- Revisa que el schema SQL se ejecutó sin errores

### PWA no instala iconos
- Ejecuta el script de generación de iconos
- Verifica que los archivos existan en `public/icons/`

## Checklist final

- [ ] Repo creado en GitHub
- [ ] Código subido a GitHub
- [ ] Proyecto conectado con Vercel
- [ ] Variables de entorno configuradas en Vercel
- [ ] Proyecto Supabase creado
- [ ] Credenciales copiadas y configuradas
- [ ] Schema SQL ejecutado
- [ ] Iconos PWA generados
- [ ] Deploy exitoso en Vercel
- [ ] App funcional probada
