# Skin Analyzer

Aplikasi analisis kulit wajah berbasis browser. Menggunakan kamera perangkat untuk mendeteksi wajah, menganalisis kondisi kulit (tone, blemish, oiliness), dan memberikan rekomendasi perawatan — semuanya berjalan sepenuhnya di sisi klien tanpa server.

## Fitur

- Deteksi wajah real-time via kamera
- Analisis tone kulit, jerawat, dan kadar minyak dari data piksel
- Rekomendasi produk makeup berdasarkan hasil analisis
- Tidak ada data yang dikirim ke server

## Tech Stack

| Kategori | Package |
|---|---|
| UI Framework | React 19 |
| Bahasa | TypeScript 5 (strict mode) |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v3 |
| Face Detection | face-api.js v0.22 (TinyFaceDetector) |

### Dev Tools

| Package | Fungsi |
|---|---|
| ESLint + Prettier | Linting & formatting |
| `@typescript-eslint` | TypeScript-aware linting |
| `eslint-plugin-react-hooks` | Validasi aturan React hooks |
| `eslint-plugin-simple-import-sort` | Urutan import yang konsisten |
| `eslint-plugin-unicorn` | Best practice tambahan |
| `vite-plugin-svgr` | Import SVG sebagai React component |

## Cara Menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

## Build

```bash
npm run build
```

## Catatan

- Model face-api.js disimpan di `/public/models/` dan dimuat saat runtime
- Seluruh pemrosesan gambar menggunakan `HTMLCanvasElement` dan `getImageData` — tidak ada upload ke server
