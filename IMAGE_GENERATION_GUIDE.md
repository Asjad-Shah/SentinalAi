# Image Generation Guide for Sentinel AI Landing Page

This document contains all image requirements, generation prompts, dimensions, and specifications for the Sentinel AI fraud detection platform website.

---

## Table of Contents
1. [Hero Section Images](#hero-section-images)
2. [Product Visualization Images](#product-visualization-images)
3. [AI Agents Section Images](#ai-agents-section-images)
4. [Case Study & Statistics Images](#case-study--statistics-images)
5. [Data Platform Visualization Images](#data-platform-visualization-images)
6. [General Guidelines](#general-guidelines)

---

## Hero Section Images

### 1. Hero Dashboard Screenshot (Dark Navy Variant)
**File Path:** `/public/images/hero-dashboard.png`  
**Dimensions:** 1200x800px (16:10.67 aspect ratio)  
**Format:** PNG  
**Background:** Dark navy (#0B1021) with soft vignette  
**Style:** Minimal SaaS window, macOS controls, high contrast, low text

**Generation Prompt (single image):**
```
Create a dark navy SaaS browser window with macOS control dots (red #FF5F56, yellow #FFBD2E, green #27C93F) and title "Fraud Detection > Application Review" in gray (#7E8DAA).

Inside, show one simple card:
- Deep navy card (#0B1021) with subtle electric-blue border (#36B3E3 @ 20%)
- Large white title: "Application #LA-2024-1248"
- Small red status dot + "High Risk"
- One clean metric row: "Fraud Score: 0.85" (red text)

Keep layout clean: no long lists; generous spacing; soft shadows; rounded corners. Inter font; headings white; body gray-300.
```

**Color Palette:**
- Primary Blue: #36B3E3
- Purple Accent: #2D29D7
- Background Light: #F5F5FF
- Text Dark: #0B0C0E
- Text Medium: #2E3238
- Text Light: #7E8DAA

---

### 1b. Hero Application Review (Dark Navy Theme)
**File Path:** `/public/images/hero-application-review.png`  
**Dimensions:** 1200x800px (16:10.67 aspect ratio)  
**Format:** PNG  
**Background:** Dark navy (#0B1021) with soft vignette  
**Style:** Dark SaaS dashboard window, macOS-style controls, high-contrast text

**Generation Prompt:**
```
Create a dark navy SaaS dashboard window for fraud detection.

Window:
- macOS-style control dots at top-left: red (#FF5F56), yellow (#FFBD2E), green (#27C93F)
- Title bar text: "Fraud Detection > Application Review" in gray (#7E8DAA)
- Rounded outer container (rounded-2xl), subtle glow behind window (electric blue #36B3E3 / 5% opacity)

Inside the window, display a single focused card:
- Card background: deep navy (#0B1021) with subtle blue border (#36B3E3 at 20% opacity)
- Title: "Application #LA-2024-1248" in bold white
- Red status dot with "High Risk" label (#FF4D4F)
- Row items:
  - Applicant: John Smith (white text, label in gray-400)
  - Fraud Score: 0.85 (High Risk) in bright red
  - Loan Amount: $15,000.00 in white
- Divider line in blue (#36B3E3 at 10% opacity)
- Top Risk Factors list (white/80 text):
  • Unusually long application pauses (deltaH)
  • High email digit ratio (synthetic identity)
  • Digital Ghost persona detected
- Optional button at top-right: "Fraud Co-Pilot" (blue background #36B3E3, subtle glow)

Typography:
- Inter font, white headings, gray-300 body

Overall feel:
- High-tech, premium dark theme; soft shadows; rounded corners.
```

**Color Palette (Dark)**
- Navy: #0B1021
- Secondary: #1B2A4E
- Electric Blue: #36B3E3
- Gray-300: #D1D5DB
- Gray-400: #9CA3AF
- Red: #FF4D4F

---
## Product Visualization Images

### 2. Application Screening Visualization (Dark Navy)
**File Path:** `/public/images/product-application-screening.png`  
**Dimensions:** 800x600px (4:3 aspect ratio)  
**Format:** PNG  
**Background:** Dark navy gradient (#0B1021 → #1B2A4E)  
**Style:** Minimal risk indicators; easy to scan; few labels

**Generation Prompt (single image):**
```
Create a dark navy application screening visualization.
- Three simple indicator chips centered: "Early Reversal", "UCC Failure", "High-Risk Persona"
- Each chip: deep navy pill with electric-blue border (#36B3E3 @ 20%), subtle glow, concise label
- One small legend line: "Screening Signals"

No paragraphs; no dense data. High contrast; Inter font; rounded; airy spacing; subtle grid background.
```

### 3. Risk Scoring Visualization (Dark Navy)
**File Path:** `/public/images/product-risk-scoring.png`  
**Dimensions:** 800x600px  
**Format:** PNG  
**Background:** Dark navy gradient  
**Style:** Two large metrics, minimal labels

**Generation Prompt (single image):**
```
Create a minimal risk scoring panel on dark navy:
- Left metric: "Fraud Risk Score" with large number "0.85" (red)
- Right metric: "Ensemble Confidence" with large number "92%" (electric blue)
- Each metric in a simple deep-navy card with thin electric-blue border; subtle shadow; rounded

No subtext; no extra badges. Balanced spacing; Inter font.
```

### 4. Anomaly Detection Visualization (Dark Navy)
**File Path:** `/public/images/product-anomaly-detection.png`  
**Dimensions:** 800x600px  
**Format:** PNG  
**Background:** Dark navy with subtle grid  
**Style:** Sparse scatter with highlighted anomalies

**Generation Prompt (single image):**
```
Create a simple scatter on dark navy:
- Many small blue points (normal)
- Few bright red points (anomalies) clustered
- One concise caption at top-left: "Anomaly Map"

No axes; minimal chrome; clean spacing; soft glow around anomalies.
```

### 5. Applicant Personas Visualization (Dark Navy)
**File Path:** `/public/images/product-applicant-personas.png`  
**Dimensions:** 800x600px  
**Format:** PNG  
**Background:** Dark navy  
**Style:** Three simple persona cards; minimal text

**Generation Prompt (single image):**
```
Create three persona cards on dark navy:
- Digital Ghost (red accent)
- High-Friction Anomaly (orange accent)
- Safe Bet (green accent)

Each card: title only + one small icon; no long descriptions; thin electric-blue border; rounded; subtle shadow.
```

### 6. Explainable AI Visualization (Dark Navy)
**File Path:** `/public/images/product-explainable-ai.png`  
**Dimensions:** 800x600px  
**Format:** PNG  
**Background:** Dark navy  
**Style:** Report preview + top factors; concise

**Generation Prompt (single image):**
```
Create a minimal explainable AI panel:
- Left: small PDF icon tile with label "Report"
- Right: simple list of three risk factors as short chips
- Electric-blue accents; thin borders; rounded; generous whitespace

No long text; no bars; keep it readable at a glance.
```

### 7. Pre-Approval Detection Visualization (Dark Navy)
**File Path:** `/public/images/product-pre-approval.png`  
**Dimensions:** 800x600px  
**Format:** PNG  
**Background:** Dark navy  
**Style:** Three concise metric chips

**Generation Prompt (single image):**
```
Create three minimal metric chips on dark navy:
- "Fraud Detected" (red number)
- "Cost Savings" (green amount)
- "Assessment Time" (< 2s, electric-blue)

Use pill chips with thin electric-blue borders; center aligned; no subtext.
```

### 8. Pre-Funding Verification Visualization (Dark Navy)
**File Path:** `/public/images/product-pre-funding.png`  
**Dimensions:** 800x600px  
**Format:** PNG  
**Background:** Dark navy  
**Style:** Status badge + two small counters

**Generation Prompt (single image):**
```
Create a minimal verification panel:
- Large status badge: "Verified" (green) or "Flagged" (red)
- Two small counters beneath: "Reviewed" and "Prevented"

Deep navy cards; thin electric-blue borders; rounded; minimal text.
```

### 9. Ensemble Models Visualization (Dark Navy)
**File Path:** `/public/images/product-ensemble-models.png`  
**Dimensions:** 800x600px  
**Format:** PNG  
**Background:** Dark navy  
**Style:** Three tiles, simple arrows to center

**Generation Prompt (single image):**
```
Create three model tiles:
- Left: "XGBoost Detective" (blue accent)
- Right: "Isolation Forest Watchdog" (purple accent)
- Center: "Ensemble Task Force" with combined arrow inputs

Tiles with minimal labels; no scores; thin electric-blue borders; small arrows pointing to center.
```

### 10. Real-time API Visualization (Dark Navy)
**File Path:** `/public/images/product-real-time-api.png`  
**Dimensions:** 800x600px  
**Format:** PNG  
**Background:** Dark navy  
**Style:** Minimal architecture diagram; few labels

**Generation Prompt (single image):**
```
Create a simple API flow:
Client → API Gateway → Lambda/SageMaker → Response

Use four minimal nodes with icons; thin electric-blue connection lines; one caption "Real-time < 500ms".
No extra metrics; clean spacing.
```

### 11. Feedback Loop Visualization (Dark Navy)
**File Path:** `/public/images/product-feedback-loop.png`  
**Dimensions:** 800x600px  
**Format:** PNG  
**Background:** Dark navy  
**Style:** Simple loop diagram

**Generation Prompt (single image):**
```
Create a four-step loop ring:
Data → Labels → Training → Deployment → (back to Data)

Use a circular arrow on dark navy; step labels only; electric-blue accents; minimal icons; no metrics.
```

### 12. Compliance Reporting Visualization (Dark Navy)
**File Path:** `/public/images/product-compliance-reporting.png`  
**Dimensions:** 800x600px  
**Format:** PNG  
**Background:** Dark navy  
**Style:** Document tile + simple badges

**Generation Prompt (single image):**
```
Create a minimal compliance panel:
- Large document tile labeled "Compliance Report"
- Three small badges: "Audit Trail", "Regulatory Ready", "PDF"

Electric-blue accents; thin borders; rounded; no metrics; clean spacing.
```

### 13. MLOps Pipeline Visualization (Dark Navy)
**File Path:** `/public/images/product-mlops-pipeline.png`  
**Dimensions:** 800x600px  
**Format:** PNG  
**Background:** Dark navy  
**Style:** Simple linear pipeline with five nodes

**Generation Prompt (single image):**
```
Create a minimal pipeline flow:
Data → Drift → Training → Validation → Deployment

Five rounded nodes connected with thin electric-blue lines; short labels only; no metrics; clean spacing.
```

---

## AI Agents Section Images

### 14. AI Agent SOP Diagram (Dark Navy)
**File Path:** `/public/images/ai-agent-sop-diagram.png`  
**Dimensions:** 600x400px (3:2 aspect ratio)  
**Format:** PNG  
**Background:** Dark navy  
**Style:** Minimal flowchart; five steps; thin lines

**Generation Prompt (single image):**
```
Create a simple SOP flow:
Application → Features → Inference → Risk Score → Report

Five rounded boxes; thin electric-blue arrows; short labels only; no extra descriptions; airy layout.
```

### 15. Agent Interface Mockup (Dark Navy)
**File Path:** `/public/images/ai-agent-interface.png`  
**Dimensions:** 1000x700px  
**Format:** PNG  
**Background:** Dark navy window  
**Style:** Minimal UI mockup; three panels

**Generation Prompt (single image):**
```
Create a dark navy agent interface window:
- Header: "Fraud Detection Co-Pilot"
- Three simple panels: "Mission", "Risk Score", "Explanation"

Keep panels sparse; short labels; electric-blue accents; rounded; soft shadow.
```

---

## Case Study & Statistics Images

### 16. Case Study Dashboard (Dark Navy)
**File Path:** `/public/images/case-study-dashboard.png`  
**Dimensions:** 800x600px  
**Format:** PNG  
**Background:** Dark navy window  
**Style:** Title + three small capability badges

**Generation Prompt (single image):**
```
Create a minimal case study window:
- Title only (one line)
- Three capability badges beneath: "Ensemble Models", "Real-time API", "Explainable AI"

No charts; clean spacing; electric-blue accents; rounded corners.
```

### 17. Statistics Visualization
**File Path:** `/public/images/stats-visualization.png`  
**Dimensions:** 1200x400px (3:1 aspect ratio)  
**Format:** PNG  
**Background:** Dark navy  
**Style:** Three large numbers only

**Generation Prompt (single image):**
```
Create a minimal stats strip:
- "50%" Fraud Detection
- "650+" Features
- "3" Personas

Large white numbers; small gray labels; electric-blue dividers; no charts.
```

---

## Data Platform Visualization Images

### 18. ML Layer Architecture Diagram (Dark Navy)
**File Path:** `/public/images/ml-layer-architecture.png`  
**Dimensions:** 1000x800px  
**Format:** PNG  
**Background:** Dark navy  
**Style:** Four stacked layer cards with numbers

**Generation Prompt (single image):**
```
Create four stacked cards labeled:
01 Feature Engineering, 02 Ensemble Models, 03 Real-time API, 04 MLOps

Minimal text (title + number); arrows connecting downward; thin electric-blue borders; rounded; soft shadow.
```

### 19. Feature Engineering Visualization (Dark Navy)
**File Path:** `/public/images/feature-engineering.png`  
**Dimensions:** 800x600px  
**Format:** PNG  
**Background:** Dark navy  
**Style:** Simple before → after flow

**Generation Prompt (single image):**
```
Create a minimal transformation diagram:
Left chip: "100 raw points" → Right chip: "650+ features"

One thin electric-blue arrow; rounded chips; no extra labels; clean spacing.
```

---

## General Guidelines (Dark Navy Theme)

### Color Palette
- **Navy:** #0B1021
- **Secondary Navy:** #1B2A4E
- **Electric Blue:** #36B3E3
- **Gray-300:** #D1D5DB
- **Gray-400:** #9CA3AF
- **Accent Red:** #FF4D4F

### Typography
- **Font Family:** Inter (clean, modern sans-serif)
- **Headings:** Bold, tight tracking
- **Body Text:** Regular weight, relaxed leading
- **Numbers:** Bold, large size for emphasis

### Style Guidelines
1. **Minimal Content:** Prefer titles and chips over paragraphs
2. **Dark Navy Base:** Use deep navy backgrounds with subtle vignette or grid
3. **Electric Blue Accents:** Borders, dividers, and small highlights
4. **Rounded Corners + Soft Shadows:** Premium, calm aesthetic
5. **Generous Spacing:** Airy layouts for easy scanning
6. **High Contrast:** White headings; gray-300 body text
7. **Simple Icons:** Use minimal, line icons sparingly
8. **No Dense Charts:** Favor simple diagrams and numbers
9. **One Image Per Prompt:** Generate each asset separately
10. **Responsive Consideration:** Keep elements readable at small sizes

### File Naming Convention
- Use lowercase with hyphens: `product-name-visualization.png`
- Be descriptive: `hero-dashboard.png`, `ai-agent-sop-diagram.png`
- Group by section: `product-*`, `ai-agent-*`, `case-study-*`

### Image Optimization
- **Format:** PNG for graphics with transparency, JPG for photos
- **Compression:** Optimize for web (use tools like TinyPNG)
- **Responsive:** Consider providing @2x versions for retina displays
- **File Size:** Aim for < 500KB per image when possible

### Usage Instructions
1. Generate images using the prompts above with Gemini (banana pro) or similar AI image generator
2. Save images to `/public/images/` directory
3. Update image paths in `app/page.tsx` to reference the generated images
4. Test images on different screen sizes and devices
5. Optimize images for web performance

---

## Summary Checklist

- [ ] Hero Dashboard Screenshot (1 image)
- [ ] Product Visualizations (12 images)
- [ ] AI Agent Images (2 images)
- [ ] Case Study Images (2 images)
- [ ] Data Platform Visualizations (2 images)
- [ ] **Total: 19 images**

---

**Last Updated:** 2025-01-27  
**Version:** 1.0

