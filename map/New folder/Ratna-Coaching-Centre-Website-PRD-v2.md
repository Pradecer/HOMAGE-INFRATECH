# Product Requirements Document (PRD) — v2
## Ratna Coaching Centre Website
### Strategic, Production-Ready Specification

| | |
|---|---|
| **Prepared by** | Senior UX/UI Designer |
| **Client** | Ratna Coaching Centre (Director: Seema Swami) |
| **Version** | 2.0 — rewritten with UX strategy, IA rationale, and engineering-ready detail |
| **Date** | July 2026 |
| **Status** | Ready for build |

> **Note on this version:** The client's original feature list (Home, About, Courses, Subjects...) has been kept as the content scope, but this document reframes it around *why* each decision exists — the admissions funnel, parent trust psychology, and what "production-ready" actually requires (data model, states, accessibility, performance budgets). Treat the earlier flat feature-list PRD as a checklist; treat this one as the actual build spec.

---

## 1. Problem Framing

A local coaching centre's website is not a brochure — it's a **trust filter**. Parents in this market rarely choose a coaching centre from a website alone; they use it to *rule centres out*. If the site looks generic, has broken links, no visible results, or makes contact hard, a parent silently moves to the next tab. Conversely, most competing local coaching centres run outdated, template-heavy, or Facebook-page-only sites — this is Ratna's actual opportunity: **a genuinely fast, credible, mobile-first site is a competitive advantage, not a formality.**

Three problems this website must solve, in priority order:
1. **Reduce time-to-contact.** A parent who is convinced should be able to call/WhatsApp/apply in under 2 taps from anywhere on the site.
2. **Manufacture credible trust signals fast** — results, faculty, real photos, testimonials — because trust is the actual conversion blocker, not information.
3. **Let the owner (non-technical) keep the site alive** — stale "Admissions Open 2024" banners kill credibility faster than no website at all.

---

## 2. Goals & Success Metrics

### 2.1 Primary Business Goal
Increase qualified admission enquiries (calls, WhatsApp chats, form submissions) without increasing the owner's time spent managing the site.

### 2.2 Measurable Success Criteria

| Metric | How it's measured | Target (90 days post-launch) |
|---|---|---|
| Admission funnel conversion (visitor → enquiry) | GA4 event: `admission_form_submit` + `cta_click` (call/whatsapp) ÷ sessions | ≥ 3–5% |
| Mobile Core Web Vitals | PageSpeed Insights (mobile) | LCP < 2.5s, CLS < 0.1, INP < 200ms |
| Owner-editable content freshness | Manual check: notices/results updated without dev help | Owner updates content ≥ 1x/week unaided |
| Local search visibility | Google Search Console: impressions for branded + "coaching centre near [city]" queries | Month-over-month growth |
| Form abandonment rate | GA4 funnel: form start vs form submit | < 30% |

**This PRD explicitly rejects vanity metrics** (page views, session count) as primary — they don't correlate with admissions.

---

## 3. Users & Personas

Rather than treating "parent" as one persona, three distinct decision contexts drive different UX needs:

| Persona | Context | What breaks trust for them | What the site must do |
|---|---|---|---|
| **P1 — The Comparer** (mother/father, evaluating 3–4 centres) | Researching at night on phone, comparing tabs | Vague claims ("best results"), no real numbers, slow load | Show *specific* toppers/scores, fast load, clear fee/course info without needing a call |
| **P2 — The Referred Parent** | Came via word-of-mouth, just needs to confirm legitimacy + get directions/contact | Can't find address/timings fast, no map | Contact info + map above the fold on Contact page, one-tap call |
| **P3 — The Student Researcher** (Class 9–12, NEET aspirant) | Checking subjects, faculty, resources before asking parents to approve | No syllabus/subject depth, no downloadable resources | Detailed Subjects/Courses pages, sample study resources visible even if gated later |
| **P4 — The Owner (Seema Swami / staff)** | Updating results after exams, posting notices, checking who enquired | Needs a developer for every text change | Admin Panel with zero-code content editing |

**Design implication:** P1 and P3 need *depth* (real numbers, real subject breakdowns). P2 needs *speed to action*. These are in tension — solved by keeping Home page action-oriented and pushing depth to secondary pages (Courses, Results), not cramming everything into Home.

---

## 4. Information Architecture — with rationale

```
Home                         → Entry point, funnel starts here
├── About Us                 → Trust-building (story, mission, director credibility)
├── Courses                  → "What do you teach my child's grade level"
│   ├── Pre-Nursery / Nursery / LKG / UKG
│   ├── Classes 1–12
│   └── NEET Foundation (conditionally shown)
├── Subjects                 → "What specific subjects/faculty depth" (P3 need)
├── Facilities               → Answers "why not a bigger/cheaper centre"
├── Admissions               → Conversion page — the funnel destination
├── Results & Achievements   → Proof layer — the single highest-trust section
├── Gallery                  → Social proof / "is this a real place"
├── Testimonials             → Peer validation (P1's strongest trust signal)
├── Study Resources           → Retention + SEO play, secondary to admissions
├── Blog                     → SEO/organic acquisition, lowest priority page
└── Contact Us               → P2's destination — must be fast, map-first
```

**Why Courses and Subjects are separate (not merged, despite overlap):** Courses answers "which program/grade," Subjects answers "which academic depth/faculty." Merging them forces a parent hunting for "Class 10 fees" to wade through subject lists, and a student hunting for "who teaches Physics" to wade through grade tiers. Keeping them separate, cross-linked, respects two different search intents.

**Why Results sits above Gallery/Testimonials in nav priority:** For an academic institution, quantified outcomes (toppers, scores) out-trust photos and quotes. Gallery/Testimonials support the claim; Results *is* the claim.

---

## 5. Core User Flow — Admissions Funnel

This is the flow every page-level decision should be checked against:

```
Landing (Home / Blog / Google) 
   → sees Admissions Open + real trust signal within first screen
   → explores Courses or Results (depth-seeking)
   → convinced → hits Apply Now / Call / WhatsApp (from ANY page, not just Admissions)
   → [Form path] fills 5-field form → confirmation shown → owner notified
   → [Call/WhatsApp path] leaves site entirely into phone app — site's job is done
```

**Design rule derived from this:** Apply Now / Call / WhatsApp must be reachable from **every page** (sticky header + floating buttons), not just Home and Admissions. A parent convinced while reading the Blog shouldn't have to navigate back.

---

## 6. Page-by-Page Requirements (Production Detail)

Each page below includes: purpose, must-have components, empty/error states, and acceptance criteria — not just a content list.

### 6.1 Home
**Job to be done:** Convert an undecided visitor into a "let me look further" or immediate contact within 5 seconds.

| Component | Requirement |
|---|---|
| Hero | "Admissions Open [Session Year]" — **year must pull from Admin Panel setting**, never hardcoded, so it can't go stale |
| CTA row | Apply Now (anchors to Admissions form), Call Now (`tel:`), WhatsApp Now (`wa.me` with pre-filled message: *"Hi, I'd like to know more about admissions at Ratna Coaching Centre"*) |
| Trust strip | 3–4 stat counters (Years Running, Students Taught, Result %, Batches) — animate on scroll-into-view once, not looping |
| Course preview | Max 4 cards, links to full Courses page — not exhaustive |
| Notice widget | Latest 3 items from Admin Panel; if zero notices exist, hide the section entirely (no "No notices yet" placeholder visible to parents) |
| Testimonial snippet | Auto-rotate 3, sourced from Testimonials CMS entity |

**Acceptance criteria:** All 3 primary CTAs visible without scrolling at 375px width. Hero text renders correctly with a session year that updates from Admin Panel without a deploy.

### 6.2 About Us
- Our Story, Mission & Vision, Director's Message (photo + signed quote block for Seema Swami — treat this as the single highest-credibility asset on the page, give it visual weight), Why Choose Us (icon grid, 4–6 items max — beyond 6, it reads as padding, not conviction)

### 6.3 Courses
- Level-grouped cards (Pre-Nursery → NEET Foundation)
- Each card: title, 1-line description, "Enquire about this course" micro-CTA that **pre-fills the Admissions form's Class field** — small detail, removes friction
- NEET Foundation card only renders if `courses.neetFoundation.visible = true` in Admin Panel (client said "if available" — build this as a toggle, not a maybe)

### 6.4 Subjects
- Grid of 8–9 subjects; Computer subject same toggle pattern as NEET Foundation
- Optional (Phase 2): link each subject to relevant Study Resources filtered by that subject

### 6.5 Facilities
- 6 icon+text cards, no more — Small Batch Size, Individual Attention, Regular Tests, Doubt-Clearing, Homework Support, Parent-Teacher Meetings

### 6.6 Admissions (Conversion Page — highest QA priority)

**Form fields:** Student Name*, Parent Name*, Class* (dropdown, not free text — reduces bad data), School Name*, Mobile Number* (10-digit validation, numeric keypad on mobile)

**States that must be designed, not left to chance:**

| State | Requirement |
|---|---|
| Empty/default | Clear field labels, class dropdown pre-populated from Admin Panel course list |
| Validation error | Inline error under the specific field (e.g. "Enter a valid 10-digit number") — never a top-of-page generic error |
| Submitting | Button shows loading state, disabled to prevent double-submit |
| Success | On-screen confirmation + auto-offer: "Continue on WhatsApp for faster response?" button |
| Failure (network/server error) | Retry option + fallback: "Or WhatsApp/Call us directly" — **never let a form failure be a dead end** |

**Backend requirement:** Every submission → stored in DB, visible in Admin Panel submissions list, triggers an email (and optionally WhatsApp/SMS) notification to the owner within seconds.

**Spam protection:** Honeypot field minimum; reCAPTCHA v3 if spam becomes an issue post-launch (don't over-engineer at launch).

### 6.7 Results & Achievements
- Toppers: photo, name, class, score/percentage, **filterable by year** (data model must support multi-year entries from day one, or this becomes unmanageable by year 2)
- Awards, Success Stories (short case-study format: challenge → support given → outcome)

### 6.8 Gallery
- Categorized (Classroom / Events / Activities), lightbox viewer, lazy-loaded
- Video section embeds YouTube (BioMaster Seema channel) — **use YouTube's lite-embed / facade pattern** (thumbnail + play button that loads the iframe on click) so unplayed videos don't tank page load speed

### 6.9 Testimonials
- Parent + Student tabs, star rating, admin-manageable (add/edit/remove/reorder)
- Require a name + optional photo/initial per testimonial — anonymous quotes read as fake

### 6.10 Study Resources
- Categorized (Notes, Worksheets, Holiday Homework, Sample Papers, NCERT), filterable by Class + Subject
- **Decision needed from client (flagged in Open Questions):** public access vs gated behind a simple "enter mobile number to unlock" — the latter doubles as a lead-capture mechanism and is recommended over a Student Login system for Phase 1

### 6.11 Blog
- List + detail pages, categories, SEO metadata fields per post editable in Admin Panel (title tag, meta description, slug) — this page exists for organic search acquisition, so treat SEO fields as required, not optional

### 6.12 Contact Us
- Address, embedded interactive Google Map (not a static image), phone/WhatsApp/email as tappable links, contact form (Name, Phone/Email, Message)
- This page is P2's destination — map and phone number must be visible without scrolling on mobile

### 6.13 Social Media Integration
- Icons for YouTube (BioMaster Seema), WhatsApp, Instagram, Facebook, X — header or footer, opens in new tab, consistent icon style (not mismatched brand-default colors clashing with the Royal Blue/Gold theme — recolor icons to match palette or use monochrome outline style)

---

## 7. Admin Panel — Content Ownership Model

The client's core ask — "so I can update content myself" — is treated here as a first-class feature, not an afterthought bolted onto a database.

**Manageable entities (CRUD from Admin Panel, no code required):**

| Entity | Fields | Who edits |
|---|---|---|
| Notice/Announcement | Title, body, active date range, priority | Owner |
| Testimonial | Name, role (parent/student), photo, quote, rating, display order | Owner |
| Gallery Item | Image/video, category, caption | Owner |
| Result Entry | Student name, photo, class, score, year, category (topper/award) | Owner |
| Blog Post | Title, body, category, cover image, SEO fields, publish date | Owner |
| Study Resource | File/link, class, subject, category | Owner |
| Site Setting | Admission session year, course/subject visibility toggles, contact details | Owner |
| Form Submissions (Admission + Contact) | Read-only list, exportable to CSV, mark as "contacted" | Owner |

**Non-negotiable UX requirement:** every one of these must be editable through a form-based UI with no markdown/code required — the owner is non-technical. Rich text fields should use a simple WYSIWYG editor, not raw HTML input.

---

## 8. Design System

| Token | Value | Usage |
|---|---|---|
| Primary — Royal Blue | `#0A2472` | Headers, nav, primary buttons, links |
| Accent — Gold | `#D4AF37` | CTAs' hover/accent state, badges ("Admissions Open"), dividers |
| Base — White | `#FFFFFF` | Backgrounds, card surfaces |
| Neutral | `#F5F6FA` (bg), `#4A4A4A` (body text) | Section backgrounds, body copy |
| Heading font | Semi-bold sans-serif (e.g. Poppins/Sora) | H1–H4 |
| Body font | Inter or similar | Paragraphs, labels |

**Motion principles:** entrance fade/slide on scroll (once per element, not repeating), hover elevation on cards, animated counters on stats — all animations must respect `prefers-reduced-motion`. No animation should delay interactivity or block the Browser Subagent-testable "time to interactive" budget.

**Accessibility (WCAG AA baseline):** minimum 4.5:1 text contrast (verify Gold-on-White meets this for any text use — likely needs a darker gold shade for text, reserve bright gold for decorative/icon use only), all interactive elements keyboard-reachable, alt text mandatory on all content images, form errors announced to screen readers.

---

## 9. Non-Functional Requirements

| Category | Requirement |
|---|---|
| Performance | Mobile LCP < 2.5s, page weight budget < 1.5MB per page (excluding lazy-loaded media) |
| Security | HTTPS everywhere, form input sanitization, rate-limiting on form endpoints, admin auth with hashed passwords + session expiry |
| Data privacy | Mobile numbers/parent data collected via forms should have a simple privacy note near the form; avoid third-party trackers beyond GA4 without disclosure |
| SEO | Unique meta title/description per page, `sitemap.xml`, `robots.txt`, schema.org `EducationalOrganization` + `LocalBusiness` markup, Google Business Profile linkage |
| Analytics | GA4 with named custom events: `cta_click_call`, `cta_click_whatsapp`, `admission_form_submit`, `contact_form_submit`, `resource_download` — vanity page-view tracking alone is insufficient |
| Backups | Automated daily DB backup, retained 30 days minimum |
| Browser/device support | Last 2 versions of Chrome/Safari/Firefox/Edge, iOS + Android |

---

## 10. Risks & Assumptions

| Risk/Assumption | Mitigation |
|---|---|
| Client may not supply real photos/content on time | Build with clearly marked placeholders; do not launch with stock photos pretending to be the actual centre — this undermines the trust goal |
| "NEET Foundation" / "Computer" subject availability may change term to term | Built as Admin Panel toggles, not hardcoded page removal |
| Owner may not have time to learn a complex CMS | Admin Panel UX must be tested for a non-technical user before launch — if the owner can't post a Notice unaided in under 2 minutes, the CMS has failed its brief |
| Fee Payment / Student Login / Parent Login scope creep | Explicitly deferred to Phase 3 (see below) — do not let these expand Phase 1 timeline |
| Domain `ratnacoachingcentre.in` availability | Verify and register before launch; have a fallback (e.g. `.com` or a modifier) ready |

---

## 11. Prioritization — MoSCoW

| Must Have (Phase 1 — MVP) | Should Have (Phase 2) | Could Have (Phase 3) | Won't Have (this phase) |
|---|---|---|---|
| Home, About, Courses, Subjects, Facilities, Admissions form, Contact, Results, Gallery, Testimonials, Admin Panel (core entities), Floating WhatsApp/Call, SSL, GA4, basic SEO | Study Resources with gating, Blog, Notice automation, resource-based lead capture | Student Login, Parent Login, Online Fee Payment gateway | Multi-language site, native mobile app |

**Rationale:** Phase 1 is scoped to everything that touches the admissions funnel directly. Study Resources/Blog are SEO/retention plays — valuable, but shouldn't delay the core trust-and-convert site. Login systems and payments introduce real security/compliance surface area disproportionate to a coaching centre's likely Phase 1 needs.

---

## 12. Content & Assets Checklist (from client, blocking items)
- Logo (vector/high-res)
- Real photos: classrooms, faculty, Seema Swami, events (minimum viable set: 15–20 images)
- Written: Our Story, Mission & Vision, Director's Message copy
- Results data: names, photos (with consent), scores, by year
- Testimonials with real names + consent to publish
- Study resource files organized by class/subject
- Final social handles, address, phone/WhatsApp numbers, email

---

## 13. Definition of Done (build-verification checklist)

A page/feature is **not** complete until:
1. It renders correctly at 375px, 768px, and 1440px widths
2. Every link/button on it actually navigates or triggers the correct action (`tel:`, `wa.me`, form submit) — verified by clicking, not assumed
3. It has zero console errors
4. All content editable via Admin Panel actually reflects live on the page after saving
5. Forms show correct success/error/loading states as specified in Section 6.6
6. Images have alt text; interactive elements are keyboard-navigable

---

## 14. Open Questions for Client

1. Study Resources: public, or gated behind a lead-capture (mobile number) form?
2. Any requirement for Hindi-language content alongside English?
3. Who is the long-term owner of Admin Panel access — just Seema Swami, or staff too (needs role-based access if multiple)?
4. Existing Google Business Profile to link, or does one need setup?
5. Preferred payment gateway if/when Online Fee Payment moves into scope?
6. Confirm domain: `ratnacoachingcentre.in` — has availability been checked/registered yet?

---

## 15. Appendix — Data Model Sketch (for engineering handoff)

```
AdmissionSubmission: id, studentName, parentName, class, schoolName, mobile, createdAt, status(new/contacted)
ContactSubmission: id, name, contact, message, createdAt, status
Notice: id, title, body, startDate, endDate, priority
Testimonial: id, name, role(parent/student), photoUrl, quote, rating, order
GalleryItem: id, mediaUrl, type(image/video), category, caption
ResultEntry: id, studentName, photoUrl, class, score, year, category(topper/award)
BlogPost: id, title, body, coverImageUrl, category, metaTitle, metaDescription, slug, publishedAt
StudyResource: id, title, fileUrl, class, subject, category
SiteSetting: key, value   // e.g. admissionSessionYear, neetFoundationVisible, computerSubjectVisible
```

---

*End of Document — v2*
