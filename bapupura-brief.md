# Bapupura Village Festival Website — Project Brief

I'm building a website for Shri Nilkanth Mahadev Maha Mahotsav, a festival in Bapupura village (Ta-Mansa, Dis-Gandhinagar, Gujarat, India). Help me build this in my existing Next.js project (Next.js App Router + Tailwind CSS + Supabase already set up).

## Design Direction

**Theme:** Light, warm, devotional. NOT dark mode.

**Colors:**
- Background: #FDF6EC (warm cream)
- Surface/cards: #FFFFFF
- Primary accent (buttons, footer, headings): #7A1515 (maroon)
- Secondary gold: #B5780A
- Saffron highlight: #C85A0A
- Body text: #1A0F05
- Muted text: #5C4A32 / #9A8268
- Borders: rgba(181,120,10,0.18)

**Typography:**
- English headings: Cormorant Garamond (serif)
- Gujarati text: Noto Sans Gujarati
- Body/UI: Inter

**Visual style:** Editorial, clean, generous whitespace, sharp corners (no rounded), thin gold dividers between sections, OM (ॐ) symbol used as a visual motif. Should feel hand-crafted for a real temple festival — like somnath.org or ambajitemple.in — not like a generic template.

## Language

Full Gujarati / English toggle in the navbar. When Gujarati is selected, ALL text on the page is Gujarati (no English mixed in), and vice versa. Use Noto Sans Gujarati font for Gujarati text.

## Pages Needed

1. **Home** — Hero section with:
   - OM symbol
   - Organizer line: "Shri Shivshakti Ras Mandal & Shri Bapupura Yuva Ekta Manch"
   - Event name: "Shri Nilkanth Mahadev Maha Mahotsav"
   - Dates badge: "22 – 25 October 2026"
   - Location: "Shri Nilkanth Mahadev Mandir, Bapupura"
   - Address: "Bapupura, Ta-Mansa, Dis-Gandhinagar, Gujarat"
   - Live countdown timer to October 22, 2026
   - Two buttons: "View Albums" and "Live Darshan"
   - Mantra: "।। Om Namah Shivay ।।"
   - Below hero: event info grid (Dates, Evening Dhun every Monday, Location, Organizer)
   - Preview of 2 albums with "View All Albums" button

2. **Live Darshan** — Embed YouTube live camera:
   - Video: https://www.youtube.com/embed/GrZmqQBPHxE
   - "Live" badge with pulsing red dot
   - Caption: "Shri Nilkanth Mahadev Mandir — Live · Bapupura"
   - Timings grid: Weekly Puja (Every Monday), Evening Dhun, Maha Mahotsav (22-25 Oct 2026), Address

3. **Albums** — Grid of photo albums:
   - "Shri Nilkanth Mahadev Maha Mahotsav" — 22-25 Oct 2026 — status: Upcoming — 0 photos
   - "Uchhaamani Celebration" — May 30, 2026 — status: Recent — 24 photos
   - "Committee Meeting & Planning" — June 2026 — status: Recent — 12 photos
   - Each card clickable (links to a future album detail page)
   - Note at bottom: "Albums are created by the organizing committee."

4. **Upload** — Photo submission form:
   - Name (required)
   - Mobile number (optional)
   - Select album (dropdown of existing albums)
   - Caption (optional)
   - Drag-and-drop / tap photo upload zone (multiple files, JPG/PNG, up to 10MB each)
   - Submit button → saves to Supabase
   - Success message after submit
   - Note: "।। Every photo is reviewed before going live ।।"

5. **About** — Village info:
   - Description of Bapupura (Mansa Taluka, Gandhinagar District, Gujarat)
   - Organizing committee section:
     - Pramukh: Kanjibhai Chaudhary
     - Mantri: Madhubhai Chaudhary
     - Pravakta: Prof. Praveen F. Chaudhary
     - Sanyojak: Shri Bapupura Yuva Ekta Manch
   - Stage Service members list: Dr. Jayesh N. Chaudhary, Cho. Jagadishbhai Mangalabhai, Cho. Atulbhai Jivabhai, Cho. Hiteshbhai Lavjibhai (Dhoni), Cho. Dasarathbhai Gandabhai, Cho. Rajeshbhai Ambalalbhai, Prajapati Vipulbhai Arvindbhai

## Footer (all pages)
- "।। Har Har Mahadev ।।"
- "Shri Nilkanth Mahadev Maha Mahotsav 2026"
- "Bapupura, Ta-Mansa, Dis-Gandhinagar, Gujarat"
- Nav links to all pages
- "Shri Bapupura Yuva Ekta Manch · 2026"

## Supabase Setup (already done)
- `events` table: id, name, description, date
- `photos` table: id, event_id, image_url, uploaded_by, approved (boolean), created_at
- Storage bucket: `photos` (public)
- Connect the Upload form to insert into `photos` table (approved = false by default) and upload files to the `photos` storage bucket.

## Task

Please build out all 5 pages as proper Next.js App Router routes (app/page.tsx, app/darshan/page.tsx, app/albums/page.tsx, app/upload/page.tsx, app/about/page.tsx), with a shared Navbar and Footer component, language toggle using React state or context, and the design system described above. Make it fully responsive (mobile-first). Connect the upload form to Supabase as described.
