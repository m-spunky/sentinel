    2. Redact before sending to LLM
    Before sending email content to OpenRouter, strip/replace:
    - Email addresses → [EMAIL]
    - Phone numbers → [PHONE]
    - Credit card patterns → [CARD]
    - SSN patterns → [SSN]
    - Names from To: / From: headers → [NAME]


Images (jpg, jpeg, png, gif, bmp, webp, tiff, ico)
                                                                                                                    
  ┌─────────────────────┬────────────────────────────────────────────────────────────┐                              
  │        Check        │                      What it catches                       │                              
  ├─────────────────────┼────────────────────────────────────────────────────────────┤
  │ Polyglot detection  │ Image that starts with MZ (exe) or PK (zip) header         │
  ├─────────────────────┼────────────────────────────────────────────────────────────┤
  │ Appended payload    │ Bytes after JPEG EOI \xff\xd9, PNG IEND chunk, GIF trailer │
  ├─────────────────────┼────────────────────────────────────────────────────────────┤
  │ EXIF URL extraction │ Tracking pixels, redirect URLs hidden in JPEG metadata     │
  ├─────────────────────┼────────────────────────────────────────────────────────────┤
  │ PNG text chunks     │ tEXt/zTXt/iTXt chunks with scripts/URLs or suspicious size │
  ├─────────────────────┼────────────────────────────────────────────────────────────┤
  │ BMP size mismatch   │ Header declares X bytes but file is larger → hidden data   │
  ├─────────────────────┼────────────────────────────────────────────────────────────┤
  │ Magic verification  │ Confirms image header matches declared extension           │
  └─────────────────────┴────────────────────────────────────────────────────────────┘

  SVG (svg, svgz)

  ┌───────────────────┬────────────────────────────────────────────┐
  │       Check       │              What it catches               │
  ├───────────────────┼────────────────────────────────────────────┤
  │ <script> tag      │ Direct JavaScript execution                │
  ├───────────────────┼────────────────────────────────────────────┤
  │ javascript: URIs  │ Click-triggered scripts                    │
  ├───────────────────┼────────────────────────────────────────────┤
  │ Event handlers    │ onload, onclick, onerror, etc. — auto-exec │
  ├───────────────────┼────────────────────────────────────────────┤
  │ External href/src │ SSRF, remote content loading               │
  ├───────────────────┼────────────────────────────────────────────┤
  │ <use href>        │ External SVG document injection            │
  ├───────────────────┼────────────────────────────────────────────┤
  │ <foreignObject>   │ Embedded HTML forms / phishing             │
  ├───────────────────┼────────────────────────────────────────────┤
  │ <iframe>/<embed>  │ Nested page embedding                      │
  └───────────────────┴────────────────────────────────────────────┘

  Videos (mp4, mov, avi, mkv, wmv, flv, webm, 3gp)

  ┌────────────────────┬────────────────────────────────────────────────┐
  │       Check        │                What it catches                 │
  ├────────────────────┼────────────────────────────────────────────────┤
  │ Polyglot header    │ MZ/PK at start → exe or zip disguised as video │
  ├────────────────────┼────────────────────────────────────────────────┤
  │ MP4 atom walk      │ Invalid ftyp brand, URLs in udta metadata      │
  ├────────────────────┼────────────────────────────────────────────────┤
  │ AVI/FLV/WMV header │ Invalid container structure                    │
  ├────────────────────┼────────────────────────────────────────────────┤
  │ Appended ZIP       │ Archive hiding at end of video file            │
  └────────────────────┴────────────────────────────────────────────────┘

  PDFs (newly added on top of existing JS scan)

  ┌────────────────┬──────────────────────────────────────────────────────┐
  │     Check      │                   What it catches                    │
  ├────────────────┼──────────────────────────────────────────────────────┤
  │ URL extraction │ /URI annotations + plain URLs, flags suspicious TLDs │



   Audit Trail panel — appears below the AI Explanation card on every analysis, collapsed by default.

  Toggle header shows at a glance:
  - Input type, length, event ID, inference time
  - Whether PII was redacted (Gmail only)
  - How many attachments were scanned

  When expanded — 7 fully collapsible sections:

  ┌────────────────────────┬────────────────────────────────────────────────────────────────────────────────────────────┐   
  │        Section         │                                       What it shows                                        │   
  ├────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────┤   
  │ Layer 1 — NLP          │ Purpose, score, detected tactics with badges, top suspicious phrases, weight in final      │   
  │                        │ score                                                                                      │   
  ├────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────┤   
  │ Layer 2 — URL          │ Extracted URLs, risk features, SHAP value bar chart (which features drove the ML score)    │   
  │ Intelligence           │                                                                                            │   
  ├────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────┤   
  │ Layer 3 — Visual       │ Brand match + similarity %, screenshot if captured, what perceptual hashing found          │   
  │ Sandbox                │                                                                                            │   
  ├────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────┤   
  │ Layer 4 — Header Auth  │ SPF/DKIM/DMARC results with pass/fail icons and plain-English explanations, anomaly flags  │   
  ├────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────┤   
  │ Layer 5 — Threat Intel │ Campaign match, actor attribution + confidence %, related domains                          │   
  ├────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────┤   
  │ Attachment Deep Scan   │ Per-file: risk level, "Content Scanned" vs "Metadata Only" badge, every specific finding   │   
  │                        │ from the binary inspector                                                                  │   
  ├────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────┤   
  │ PII Redaction          │ What types were found (EMAIL/PHONE/SSN/CARD/NAME), confirmation that redacted copy went to │   
  │                        │  AI, analysis impact note                                                                  │   
  └────────────────────────┴────────────────────────────────────────────────────────────────────────────────────────────┘   

  Verdict Derivation section (always open):
  - Weighted formula table: each layer's score × weight = contribution, summed to final
  - Classification thresholds with the active verdict highlighted
  - Confidence explanation and inference time