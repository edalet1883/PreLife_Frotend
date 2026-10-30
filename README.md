# PreLife

Şəxsi inkişaf platforması — **Gym**, **Diet**, **Meditation**, **Library** modulları.
Next.js 16 (App Router, statik) + next-intl (AZ / EN / RU).

## İşə salma

```bash
npm install
npm run dev        # http://localhost:3000/az
```

## Yoxlama və build

```bash
npm run check:i18n   # tərcümə key-pariteti (3 dil × 6 namespace)
npm run lint
npm run build
```

## Struktur

- `app/[locale]/` — landing + 4 modul səhifəsi
- `components/` — SiteNav, ThemeToggle, RegisterForm
- `messages/` — az / en / ru tərcümələr
- `lib/` — modul məzmunu
