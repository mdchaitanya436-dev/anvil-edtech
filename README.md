# Anvil Edtech — Website

A fast, static marketing site for **Anvil Edtech Pvt Ltd** that showcases the company's products
(TS Police Hub, Vidyalaya, and more) and sends students to the right links.

No backend, no build step — just HTML, CSS and a little JavaScript. It deploys anywhere.

```
Anvil Edtech/
├── index.html                  # Landing page (company + all products)
├── products/
│   ├── ts-police-hub.html      # TS Police Hub product page
│   └── vidyalaya.html          # Vidyalaya product page (placeholders)
├── assets/
│   ├── css/style.css           # All styling (edit :root variables to re-theme)
│   └── js/main.js              # Mobile menu + footer year
└── README.md
```

---

## 1. What I still need from you  ✅

Search the files for `TODO` and `[PLACEHOLDER]` — each marks something to fill in.
Here's the checklist:

**Company (index.html)** — ✅ filled from the official details on tspolicehub.com
- Legal entity: **Anvil Edtech Private Limited** · CIN U85499TS2026PTC221008 · Udyam UDYAM-TS-20-0208982
- Address: Plot No. 83, Boduppal, Medchal–Malkajgiri, Hyderabad, Telangana 500092
- Email tspolicehub@gmail.com · Phone +91 95500 05068
- [ ] Optional: a dedicated company email (vs. the TS Police Hub inbox) if you have one
- [ ] Optional: social links (WhatsApp / Instagram / Telegram) if you want them in the footer

**TS Police Hub (products/ts-police-hub.html)** — ✅ features, pricing, exams & guide PDFs are real
- [ ] Exact deep-link URLs for the "Quick links" (mock test, PYQs, notes) — currently point to the homepage
- [ ] Confirm ₹499/365-day pricing is current

**Vidyalaya (products/vidyalaya.html)**
- [ ] One-line description + full description
- [ ] Real feature list and target audience
- [ ] The student/platform URL (currently `#`)

Send me these and I'll wire everything up.

---

## 2. Editing tips

- **Re-theme the whole site:** open `assets/css/style.css` and change the colours in `:root`
  (e.g. `--indigo`, `--accent`). Dark mode adjusts automatically.
- **Add a new product:** copy `products/vidyalaya.html` to a new file, update the content,
  then add a new `.card` in the "Products" section of `index.html`.
- **Logo:** currently a simple "A" mark. Send me a logo image and I'll drop it in.

---

## 3. Preview locally

Just double-click `index.html` — it opens in your browser. Or run a tiny local server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

---

## 4. Deploy (pick one — all have a free tier)

The site is plain static files, so any of these work. **Netlify drop** is the fastest.

### Option A — Netlify (easiest, free)
1. Go to https://app.netlify.com/drop
2. Drag the whole `Anvil Edtech` folder onto the page.
3. It goes live instantly at a `*.netlify.app` URL. Add your custom domain in
   **Site settings → Domain management** (see section 5).

### Option B — Vercel (free)
1. Push this folder to a GitHub repo.
2. Import it at https://vercel.com/new — no framework, it just serves the files.

### Option C — GitHub Pages (free)
1. Create a GitHub repo and push these files.
2. Repo **Settings → Pages → Source: main branch / root**.
3. Live at `https://<username>.github.io/<repo>/`.

### Option D — Cloudflare Pages (free, very fast in India)
1. Push to GitHub, connect at https://pages.cloudflare.com.
2. Build command: *none*. Output directory: `/`.

---

## 5. Buying & connecting your domain

### Recommended registrars
| Registrar | Why | Notes |
|-----------|-----|-------|
| **Cloudflare Registrar** | At-cost pricing (no markup), free DNS, great performance | Requires a free Cloudflare account; can't register `.in` directly at times — check availability |
| **Namecheap** | Cheap, clean UI, free WHOIS privacy | Good all-rounder for `.com` |
| **Google Domains → Squarespace** | Simple | Now migrated to Squarespace Domains |
| **BigRock / GoDaddy (India)** | Best for `.in` / `.co.in` | Watch for renewal price jumps |

**Domain suggestions:** `anviledtech.com`, `anviledtech.in`, `anvil.edu.in` (edu.in has eligibility rules),
`anvillearning.com`. A `.com` is the safest default; add `.in` if you want the local identity.

### Connecting the domain to your host (general steps)
Once you've bought the domain and deployed (section 4):

1. In your **host** (Netlify/Vercel/etc.), open the site's **Domain settings** and click **Add custom domain**. Enter `anviledtech.com`.
2. The host shows you DNS records to add. Usually:
   - An **A record** for the root `@` → the host's IP, **or**
   - A **CNAME** for `www` → your host's target (e.g. `your-site.netlify.app`).
3. Go to your **registrar's DNS panel** and add exactly those records.
   - Tip: pointing your domain's **nameservers** to the host (Netlify DNS / Cloudflare) is often
     simpler than managing individual records.
4. Wait for DNS to propagate (minutes to a few hours).
5. Enable **HTTPS** — Netlify/Vercel/Cloudflare issue a free SSL certificate automatically.

> ⚠️ I can't buy the domain or enter payment/account details for you — do that step yourself.
> Once it's purchased, tell me your host and I'll give you the **exact** records to paste.

---

## 6. Next ideas (optional)
- A proper logo + favicon
- A blog / current-affairs section for SEO
- A contact form (via Netlify Forms — no backend needed)
- Google Analytics or Plausible for traffic stats
