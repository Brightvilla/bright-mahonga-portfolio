# Villa — Website Developer Portfolio

Personal portfolio site for **Bright Villareal Mahonga (Villa)** — Software
Engineer & full-stack website developer, Nairobi, Kenya.

## Folder structure

```
villa-portfolio/
├── html/
│   └── index.html        ← the page itself, open this in a browser
├── css/
│   └── style.css         ← all styling
├── js/
│   └── script.js         ← nav, scroll reveal, skill bar animation, inquiry form
├── assets/
│   ├── Bright_Mahonga_Resume.pdf   ← linked from the "Download my CV" button
│   └── images/
│       ├── nav_logo.png          ← gold logo + wordmark, used in nav & footer
│       ├── logo_icon.png         ← favicon
│       ├── hero.jpg               ← hero section portrait
│       ├── about.jpg              ← about section portrait
│       └── testimonial-1..4.jpg   ← testimonial avatars
└── README.md
```

An `assets/` folder was added alongside the three requested folders so the
images and CV file live as normal, editable files instead of being buried as
base64 inside the HTML — easier to swap out later.

## Running it

No build step needed. Just open `html/index.html` directly in a browser, or
serve the whole `villa-portfolio/` folder with any static host (Netlify,
Vercel, GitHub Pages, etc.) — point the host at `html/index.html` as the entry
file, or move its contents up to the project root if your host expects
`index.html` there.

## Sections

- **Home** — hero with photo, headline, CTA buttons, and a CV download
- **About** — bio, credentials, and specialisms
- **Skills** — frontend / backend & database / tools, grouped with progress bars
- **Testimonials** — four client quotes with photos
- **Contact** — inquiry form + direct contact details and social links

## Inquiry form → email delivery (Formspree)

The contact form is wired to send directly to **brightmahonga7@gmail.com**
using [Formspree](https://formspree.io). To activate real delivery:

1. Create a free account at formspree.io.
2. Create a new form pointed at `brightmahonga7@gmail.com`.
3. Copy the endpoint Formspree gives you — it looks like
   `https://formspree.io/f/abcdwxyz`.
4. Open `js/script.js`, find this line near the top of the inquiry-form
   section:
   ```js
   var FORM_ENDPOINT = 'https://formspree.io/f/your_form_id';
   ```
   and replace `your_form_id` with your real endpoint.
5. Formspree sends one confirmation email the first time a message comes
   through — click the link in it once, and every inquiry after that lands
   straight in the inbox.

**Until step 4 is done**, the form still works — it just falls back to
opening the visitor's email app with the message pre-filled instead of
sending silently. The same fallback also kicks in automatically if a
Formspree request ever fails (e.g. no internet), so an inquiry is never
lost either way.

## Social links used

- LinkedIn: `https://www.linkedin.com/in/bright-villareal-mahonga-1054352b2`
- WhatsApp: `https://wa.me/254716657084`
- TikTok: `https://www.tiktok.com/@brightvillarealmahonga`
- GitHub: `https://github.com/Brightvilla`

Double-check the TikTok handle and LinkedIn slug are exactly right — I've
formatted them the way they were provided, but you know your own handles
best.

## Credit

Made with Claude Code.
