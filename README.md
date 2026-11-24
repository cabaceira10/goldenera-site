# GoldenEra · site

Site da GoldenEra (https://goldenerapt.com), alojado no Cloudflare Pages.

## Estrutura
- `public/`: o site em si (HTML, CSS e JS sem build, mais os assets).
- `functions/api/track.js`: endpoint `/api/track` (Pages Function) que envia eventos para o worker de alertas.
- `wrangler.toml`: configuração do projeto `goldenera` no Cloudflare Pages.

## Ver em local
Basta servir a pasta `public/`, por exemplo:

```
npx wrangler pages dev public
```

## Publicar
Só quem tem acesso à conta Cloudflare:

```
npx wrangler pages deploy --project-name goldenera --branch main
```
