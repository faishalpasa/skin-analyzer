# Skin Analyzer — Rules & Thresholds

Semua nilai di bawah ini bisa disesuaikan langsung di file yang tertera.

---

## 1. Area Sampling Wajah

> `src/utils/skinAnalyzer.ts` — fungsi `analyzeSkin`

Area piksel yang diambil dari bounding box wajah hasil deteksi.

| Parameter | Nilai | Keterangan |
|---|---|---|
| `sampleX` offset | `x + width × 0.2` | Geser kiri 20% dari tepi kiri box |
| `sampleY` offset | `y + height × 0.15` | Geser bawah 15% dari tepi atas box |
| `sampleW` lebar | `width × 0.6` | Ambil 60% lebar box |
| `sampleH` tinggi | `height × 0.65` | Ambil 65% tinggi box |
| Min valid skin pixels | `20` | Di bawah ini → return `null` |

---

## 2. Deteksi Piksel Kulit (`isSkinPixel`)

> `src/utils/skinAnalyzer.ts` — fungsi `isSkinPixel`

Menentukan apakah sebuah piksel termasuk warna kulit.

| Kondisi | Nilai | Keterangan |
|---|---|---|
| Min R | `> 60` | Brightness minimum channel merah |
| Min G | `> 20` | Brightness minimum channel hijau |
| Min B | `> 10` | Brightness minimum channel biru |
| Dominansi merah | `r >= g && r > b` | Kulit harus lebih merah dari hijau dan biru |
| Early accept | `r > 180` | Piksel cerah langsung diterima tanpa cek saturation |
| Min saturation | `max - min > 8` | Selisih channel max dan min |
| Min R-G diff | `\|r - g\| > 5` | Selisih merah vs hijau |

---

## 3. Klasifikasi Warna Kulit (`SKIN_TONE_THRESHOLDS`)

> `src/constants/skinAnalyzer.ts` — `SKIN_TONE_THRESHOLDS`

Berdasarkan luminance: `L = 0.299R + 0.587G + 0.114B`

| Luminance | ID | Label |
|---|---|---|
| `> 190` | `very-fair` | Sangat Cerah |
| `> 160` | `fair` | Cerah |
| `> 130` | `medium` | Sawo Matang Muda |
| `> 100` | `tan` | Sawo Matang |
| `> 70` | `dark` | Gelap |
| `0+` | `very-dark` | Sangat Gelap |

---

## 4. Skor Bercak/Jerawat (`BLEMISH_THRESHOLDS`)

> `src/constants/skinAnalyzer.ts` — `BLEMISH_THRESHOLDS`

Pixel dihitung sebagai bercak jika jarak warnanya dari rata-rata > `35`:
`dist = √((r-avgR)² + (g-avgG)² + (b-avgB)²)`

Ratio = jumlah bercak ÷ total piksel kulit.

| Ratio | Score | Label | Level |
|---|---|---|---|
| `< 0.05` | `clean` | Bersih | 0 |
| `< 0.12` | `mild` | Sedikit Bercak | 1 |
| `< 0.22` | `moderate` | Bercak Sedang | 2 |
| `≥ 0.22` | `heavy` | Banyak Bercak | 3 |

> Threshold jarak bercak (`35`) ada di `src/utils/skinAnalyzer.ts` fungsi `calcBlemishScore`.

---

## 5. Skor Minyak (`OILINESS_THRESHOLDS`)

> `src/constants/skinAnalyzer.ts` — `OILINESS_THRESHOLDS`

Rumus:
```
brightness  = (R + G + B) / 3
redBias     = R - (G + B) / 2
oilyScore   = (brightness / 255) × 0.5 + (redBias / 128) × 0.5
```

| oilyScore | Score | Label |
|---|---|---|
| `< 0.30` | `dry` | Kering |
| `< 0.55` | `normal` | Normal |
| `< 0.75` | `combination` | Kombinasi |
| `≥ 0.75` | `oily` | Berminyak |

---

## 6. Rekomendasi Foundation (`FOUNDATION_MAP`)

> `src/constants/skinAnalyzer.ts` — `FOUNDATION_MAP`

| Skin Tone | Shade | Undertone |
|---|---|---|
| `very-fair` | Ivory / Porcelain | Cool pink atau neutral |
| `fair` | Beige muda / Natural | Neutral atau warm |
| `medium` | Sand / Warm Beige | Warm golden |
| `tan` | Caramel / Honey | Warm atau neutral |
| `dark` | Mocha / Espresso | Deep warm |
| `very-dark` | Deep / Ebony | Rich warm |

---

## 7. Rekomendasi Coverage (`COVERAGE_MAP`)

> `src/constants/skinAnalyzer.ts` — `COVERAGE_MAP`

| Score | Rekomendasi |
|---|---|
| `clean` | BB Cream atau tinted moisturizer |
| `mild` | Foundation medium coverage |
| `moderate` | Full coverage + concealer |
| `heavy` | Full coverage + color corrector hijau |

Tip berubah jika `blemish.level >= 2` (lihat `BLEMISH_HEAVY_TIP_THRESHOLD`).

---

## 8. Rekomendasi Primer & Setting (`SKIN_TYPE_MAP`)

> `src/constants/skinAnalyzer.ts` — `SKIN_TYPE_MAP`

| Oiliness | Primer | Setting |
|---|---|---|
| `dry` | Hydrating primer (hyaluronic acid) | Setting spray |
| `normal` | Silicone primer | Light setting powder |
| `combination` | Mattifying di T-zone, hydrating di pipi | Translucent powder di T-zone |
| `oily` | Oil-control / mattifying primer | Bedak tabur + setting spray tahan minyak |

---

## 9. Rekomendasi Blush & Highlight (`ACCENT_MAP`)

> `src/constants/skinAnalyzer.ts` — `ACCENT_MAP`

| Skin Tone | Blush | Highlight |
|---|---|---|
| `very-fair` | Baby pink / peach muda | Silver / pearl |
| `fair` | Peach / coral muda | Champagne |
| `medium` | Coral / dusty rose | Gold / rose gold |
| `tan` | Terracotta / brick rose | Bronze gold |
| `dark` | Berry / plum | Deep bronze / copper |
| `very-dark` | Deep wine / rich berry | Copper / rich gold |
