# GitHub Users

Busque um usuário do GitHub pelo username e veja o perfil com os repositórios públicos.

Stack: **Vite + React 19 + TypeScript**.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Abra `http://localhost:5173`.

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Preview do build |

## Variáveis de ambiente

Copie `.env.example` para `.env`:

| Variável | Uso |
|---|---|
| `VITE_SITE_URL` | URL canônica (SEO, robots, sitemap, Open Graph) |
| `VITE_GA_MEASUREMENT_ID` | ID do GA4. Vazio = analytics desligado |
| `VITE_GITHUB_TOKEN` | Token opcional para elevar o rate limit da API |

Depois de definir `VITE_SITE_URL`, atualize também `index.html`, `public/robots.txt` e `public/sitemap.xml` com a URL real do deploy.

## Analytics e LGPD

O Google Analytics só carrega **depois** do aceite no banner de consentimento. Sem `VITE_GA_MEASUREMENT_ID`, o banner não aparece.

## 404

- Em produção (Netlify / hosts com `_redirects`), rotas desconhecidas respondem **HTTP 404** via `public/404.html`.
- No Vercel, `public/404.html` é servido automaticamente para paths inexistentes (sem rewrite catch-all para a SPA).
- No `vite preview` local, o fallback é client-side; configure o host de produção conforme acima.

## Observações

- Sem token, a API pública do GitHub limita a ~60 requests/hora por IP.
- PageSpeed Insights: rode com a URL pública do deploy (desktop + mobile) antes de considerar o launch pronto.
- Responsividade em telefone físico: gate humano — valide em um aparelho real.
