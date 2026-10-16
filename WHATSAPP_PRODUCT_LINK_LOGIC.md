# WhatsApp Product Inquiry aur Product Link Logic

Yeh document is project ke current WhatsApp inquiry flow ko explain karta hai, aur kisi doosre AI ko isi pattern ko implement karne ke liye context deta hai.

## Short Summary

Product page par "Inquire About This Design" click karne par:

1. App selected design aur collection ki details se WhatsApp message banata hai.
2. Message ko `encodeURIComponent()` se URL-safe banata hai.
3. `/api/inquiries` ko background mein POST karke inquiry database mein save karne ki koshish karta hai.
4. `https://wa.me/<phone>?text=<encoded-message>` ko new tab mein kholta hai.
5. WhatsApp sirf pre-filled draft kholta hai. User ko WhatsApp mein Send dabana hota hai; uske baad hi business/admin ko message milta hai.

WhatsApp URL mein plain-text website link hona aur click karne par bilkul wahi design khulna alag cheezein hain. Is project mein collection detail inquiry ek collection-page URL bhejti hai, exact design-page URL nahi. Gallery inquiry `/gallery` ka current URL bhejti hai.

## Project Data aur Slug ka Matlab

### Collection slug

- Collection MongoDB model mein `slug` field rakhta hai. Field required, unique, lowercase aur trimmed hai.
- Public route `src/app/(public)/collections/[slug]/page.tsx` is dynamic URL ko handle karta hai, jaise `/collections/wedding-invitation`.
- Client component route se `slug` leta hai aur `/api/collections/${slug}` fetch karta hai.
- `src/app/api/collections/[slug]/route.ts` database mein `Collection.findOne({ slug, isActive: true })` karta hai, phir us collection ke active subcategories aur designs laata hai.
- Slug collection ko identify karta hai, individual card/design ko nahi. Model slug ko validate/store karta hai; woh design title se automatic product slug banane ka logic nahi hai.

Relevant files:

- `src/lib/models/Collection.ts`
- `src/lib/models/CardImage.ts`
- `src/lib/models/SubCategory.ts`
- `src/app/(public)/collections/[slug]/page.tsx`
- `src/app/(public)/collections/[slug]/CollectionDetailClient.tsx`
- `src/app/api/collections/[slug]/route.ts`

### Design/card data

`CardImage` mein `collectionId`, `s3Url`, `code`, `title`, `details` aur sort/active fields hote hain. Collection API images ko `code` ke saath client ko bhejta hai. Collection detail client cards ko `{ code, title, image, details, category }` mein map karta hai.

`code` stable design identifier ke liye title se behtar hai, basharte har collection ke andar woh unique ho. Agar uniqueness guaranteed nahi hai, database `_id` ko deep-link identifier banana chahiye.

## Current WhatsApp Flows

### Collection detail page

`src/app/(public)/collections/[slug]/CollectionDetailClient.tsx` ke `handleInquire(card, collectionTitle)` function mein:

- Message mein collection title, design title aur design code add hote hain.
- `Product Link` ki value `window.location.href` hai.
- Yeh URL current collection page ka hota hai. Agar URL mein `?subCategory=...` ho to woh query bhi aa sakti hai.
- Current page selected design modal ko URL se restore nahi karta. Isliye link click karne se collection khulta hai, zaroori nahi ke wahi design modal mein khule.
- `/api/inquiries` ko collection/design/code aur `source: "whatsapp"` bheja jata hai. WhatsApp message ka exact link/message DB request mein nahi bheja jata.
- Database request complete hone ka wait kiye baghair WhatsApp khola jata hai.

### Gallery page

`src/app/(public)/gallery/GalleryClient.tsx` ke `handleInquire(item)` function mein:

- Message mein gallery category, design title, details aur `window.location.href` add hote hain.
- Link `/gallery` ka current page URL hota hai, selected gallery design ka individual URL nahi.
- Gallery mapping mein API result se design `code` aur collection `slug` preserve nahi kiye jaate.
- DB request mein collection/category aur design title jaate hain; inquiry API code ko support karti hai, lekin gallery handler abhi code pass nahi karta.

### WhatsApp link format

Basic format:

```text
https://wa.me/<international-phone-number>?text=<url-encoded-message>
```

- Phone number international format mein digits-only hota hai; `+`, spaces aur dashes nahi.
- `encodeURIComponent(message)` newlines, punctuation aur non-ASCII characters ko query parameter ke liye encode karta hai.
- `wa.me` WhatsApp recipient aur pre-filled draft kholta hai. Yeh apne aap message send nahi karta.
- WhatsApp message mein `https://...` URL aayega to recipient us par click kar sakta hai. Preview/unfurl WhatsApp/client behavior par depend karta hai; preview aana exact product state khulne ki guarantee nahi hai.

## Inquiry Database Flow

Endpoint `src/app/api/inquiries/route.ts`:

1. JSON body se `name`, `phone`, `collection`, `design`, `code`, `message`, `source` padhta hai.
2. `name` aur `phone` required hain.
3. `interest` collection, design aur optional code se banata hai.
4. `message` diya ho to use save karta hai; warna design/collection se generic message banata hai.
5. `Inquiry` MongoDB document create karke `201` aur inquiry ID return karta hai.

`Inquiry` model mein `interest`, `message`, `source`, status, contact fields aur timestamps hain. Collection inquiry call placeholder `name`/`phone` (`Website Visitor`, `unknown`) bhejti hai, isliye yeh record click ki inquiry tracking karta hai, customer ka verified phone number nahi. Admin inquiry screen stored `message` dikhati hai; current quick-inquiry handler WhatsApp draft text ya uska product URL `message` field mein nahi bhejta. Admin ke WhatsApp action ke liye valid customer phone bhi zaroori hota hai.

Relevant files:

- `src/app/api/inquiries/route.ts`
- `src/lib/models/Inquiry.ts`
- `src/app/admin/(dashboard)/inquiries/page.tsx`

## Exact Same Design Khulwane ka Deep-Link Design

Agar user ya admin WhatsApp message ke product link par click karke wahi design kholna chahe, link mein collection slug ke saath stable design identifier hona chahiye. Udaharan:

```text
https://miracards.in/collections/wedding-invitation?design=WC-101
```

Recommended behavior:

1. Card data se `collection.slug` aur unique `card.code` (ya `card._id`) preserve karein.
2. Link ko hard-coded `window.location.href` se na banayein. Canonical site origin aur route slug se URL construct karein.
3. Collection page load hone ke baad query string ka `design` value padhein.
4. API se cards load hone par matching `code`/ID wala card dhoondh kar uska existing detail modal kholein.
5. Unknown/removed design code par collection page normal tarah dikhayein aur modal na kholein.
6. Optional: modal open/close par query string ko update/clear karein; browser back/forward behavior ko test karein.
7. WhatsApp text mein wahi absolute deep link bhejein. Link ko text ke andar newline ke saath rakhein.
8. Inquiry DB record mein bhi deep link (message field ya dedicated product URL field) store karein, agar admin panel se baad mein product kholna expected ho.
9. Gallery mein exact design deep link chahiye to gallery item mapping mein collection slug aur unique design code/ID preserve karna hoga. Sirf `window.location.href` kaafi nahi hai.

Collection slug route ke liye hai; `design` query parameter ya nested route individual design ko select karne ke liye hai. Dono ko mix na karein.

## Doosre AI ko Dene ke Liye Prompt

```text
Is Next.js App Router project mein product-specific WhatsApp inquiry deep link implement karo.

Requirements:
- Collection URL ka existing format `/collections/[slug]` hi rakho.
- Individual design ko stable `CardImage.code` se identify karo (agar code uniqueness enforce nahi hai to `_id` use karo).
- Product URL `/collections/[collectionSlug]?design=[designCode]` jaisa absolute, canonical URL ho.
- Collection details API se cards load hone ke baad URL ke `design` parameter ke matching card ka existing detail modal automatically open ho.
- Invalid/removed code par page crash na ho; collection page normally render ho.
- `Inquire About This Design` WhatsApp message mein collection, title, code aur exact product deep link bheje.
- WhatsApp URL ka format `https://wa.me/<digits-only-international-number>?text=${encodeURIComponent(message)}` ho. Message prefill kare, auto-send nahi.
- Inquiry ko `/api/inquiries` par background mein persist karo. Stored inquiry mein selected collection/design/code aur product deep link bhi rahe. Existing validation/model conventions follow karo; placeholder `unknown` customer phone ko real customer contact mat samjho.
- Gallery inquiry par bhi same exact-design linking support karni ho to gallery API mapping mein collection slug aur design code/ID preserve karke route/query design restore karo.
- Existing public APIs/design/UI ko unnecessary refactor mat karo. Existing Next.js version ke local docs aur repo instructions follow karo.
- Test/verify: normal collection route, valid design deep link, invalid design deep link, URL-encoded WhatsApp message, aur inquiry persistence/error case.
```

## Current Implementation vs Expected Outcome

| Action | Current result | Exact-design deep link ke baad |
| --- | --- | --- |
| Collection design se WhatsApp click | Collection URL + title/code message; DB click record | Collection URL + design identifier; same card/modal restore |
| Gallery design se WhatsApp click | `/gallery` URL + title/details message; DB click record | Gallery item se collection slug + design ID lekar canonical product URL |
| WhatsApp recipient | Pre-filled draft; recipient ko Send dabana hota hai | Wahi behavior; link click se target design open hota hai |
| Admin inquiry record | Details text/code save; current quick flow mein product URL nahi | Product URL ko inquiry record mein bhi persist kiya ja sakta hai |
