# Memorial Page Images

Drop image files into the folders below. The HTML pages reference them by exact filename, so naming matters.

## Structure

```
images/
├── hero/                          Hero background images (1 per page) + video preview
│   ├── all.png                    sep-11-2001.html (All Sites)
│   ├── wtc.png                    world-trade-center.html
│   ├── flight-11.png              american-flight-11.html
│   ├── flight-175.png             united-flight-175.html
│   ├── pentagon.png               the-pentagon.html
│   ├── flight-77.png              american-flight-77.html
│   ├── flight-93.png              united-flight-93.html
│   └── memorial-video-still.jpg   The All page's video preview still (JPG)
└── portraits/                     Local portraits override picsum placeholders
    └── {slug}.jpg                 Named by victim slug; mapped via the
                                    PORTRAIT_OVERRIDES object inside each
                                    memorial page's JS block.
                                    e.g. todd-beamer.jpg, Michael-G-Arczynski.jpg
```

## Recommended dimensions

| Image type | Dimensions | Aspect | Notes |
|---|---|---|---|
| Hero background | ~2880×1234 | 16:7 | Full-bleed, sits behind dark gradient |
| Memorial video still | 1118×640 | 559:320 | Inside the hero video frame |
| Portraits | 436×560 | 136:175 | Float-right inside each memorial card |

Web-optimized JPG preferred. Files don't need to be retina — 2× the display size is plenty.

## Behavior when a file is missing

- **Hero backgrounds:** the dark gradient overlay still renders, so text remains readable. The image area just shows the page background.
- **Memorial video still:** falls back to a picsum placeholder.
- **Portraits:** the prototype currently points portraits at picsum.photos (placeholder service). Once portraits are added here, ask Claude to flip the source from picsum to local files.

## Important note on victim portraits

The memorial pages list real 9/11 victim names. Do **not** drop in real victim photos sourced from press archives or family websites without explicit permission — there are licensing and ethical concerns. Safer placeholder approaches: silhouette/initials avatars, abstract gradient cards, or keep the current picsum placeholders.
