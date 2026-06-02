# Folder Structure

```
src/
├── App.tsx                # Root: manages page state (landing | camera | result)
├── main.tsx               # Entry point
├── index.css              # Tailwind directives only
├── types/
│   └── skin.d.ts          # SkinAnalysisResult, SkinTone, BlemishScore, OilinessScore, Recommendation, PageName
├── utils/
│   └── skinAnalyzer.ts    # Canvas pixel analysis — analyzeSkin()
└── pages/
    ├── landing/
    │   └── index.tsx      # Landing screen with CTA
    ├── camera/
    │   └── index.tsx      # Camera feed, face detection loop, capture + countdown
    └── result/
        └── index.tsx      # Analysis results + makeup recommendations
```

## Adding a new page

```
src/pages/<page-name>/
├── index.tsx       # Entry — renders layout + optional context provider
├── _context.tsx    # Required if the page has significant state or side effects
└── _components/    # Components scoped to this page only
```
