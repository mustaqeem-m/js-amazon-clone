# 🛒 js-amazon-clone

A modular, front-end eCommerce simulation inspired by Amazon. Built using **vanilla JavaScript**, **HTML5**, and **CSS3** — no frameworks, no bundlers. Demonstrates core features like product listings, cart management, checkout flow, and order placement with local storage and modular architecture.

![GitHub top language](https://img.shields.io/github/languages/top/mustaqeem-m/js-amazon-clone)
![GitHub repo size](https://img.shields.io/github/repo-size/mustaqeem-m/js-amazon-clone)
![GitHub last commit](https://img.shields.io/github/last-commit/mustaqeem-m/js-amazon-clone)

---

## 🚀 Features

- 📦 Dynamic Product Listing (fetched from mock API)
- 🛍️ Add to Cart / Quantity Update / Delete
- 🚚 Delivery Options & Date Estimation (Day.js)
- 💳 Checkout & Payment Summary
- 📦 Order Placement with Order History
- 💾 State Persistence via localStorage
- 🧪 Jasmine Unit Testing for core modules

---

## 🧱 Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES Modules)
- **Testing:** Jasmine (browser-based)
- **Date Utility:** Day.js
- **API:** [supersimplebackend.dev](https://supersimplebackend.dev)

---

## 📂 Folder Structure

```
├── amazon.html
├── checkout.html
├── styles/
│   ├── shared/
│   └── pages/
├── scripts/
│   ├── checkout/
│   ├── utils/
│   └── data/
├── tests/
├── backend/
└── images/
```

---

## 🧪 How to Run Tests

Open `tests/tests.html` in your browser.  
Includes unit tests for:

- `currencyFormatter.js`
- `cart.js`
- `orderSummary.js`

---

## 📸 Screenshots

<details>
  <summary>🖼️ Click to expand</summary>

#### 🛒 Product Listing

![Product Grid Screenshot](images/screenshots/products.png)

#### 📦 Checkout Page

![Checkout Screenshot](images/screenshots/checkout.png)

#### 📄 Order Summary

![Orders Screenshot](images/screenshots/orders.png)

</details>

---

## 🛠️ Future Improvements

- Convert to **React SPA**
- Replace mock API with **Express backend + MongoDB**
- Add **authentication & user profiles**
- Use **Webpack/Vite** for bundling
- Deploy on **Netlify / Vercel**

---

## 👤 Author

**Mustaqeem**  
Frontend Developer | JavaScript Enthusiast | Lifelong Learner  
[GitHub](https://github.com/mustaqeem-m)

---

## 📃 License

MIT © Mustaqeem
