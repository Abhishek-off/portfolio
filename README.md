# Abhishek Portfolio

A professional, glassmorphism + neon themed portfolio with **unique showcases for each skill**:

- **After Effects** → Full-screen **video slider/gallery** (add your MP4s)
- **HTML/CSS** → **Clickable grid of your websites**
- **DBMS** → **Screenshot carousel**
- **JavaScript** → Simple **interactive demos**

## How to Use

1. **Edit your details** in `index.html` (name, email, social links).
2. Open `script.js` and find the `showcases` object.
3. Add your **videos/images/links**:

```js
const showcases = {
  ae: {
    type: 'videoSlider',
    title: 'After Effects Renders',
    items: [
      "videos/your_ae_render1.mp4",
      "videos/your_ae_render2.mp4"
    ]
  },
  htmlcss: {
    type: 'links',
    title: 'Websites I Built (HTML/CSS)',
    items: [
      { title: 'My Portfolio', url: 'https://your-site.com', img: 'images/site1.png', description: 'First portfolio' }
    ]
  },
  dbms: {
    type: 'imageCarousel',
    title: 'DBMS Project Screens',
    items: [
      "images/dbms1.png",
      "images/dbms2.png"
    ]
  },
  javascript: {
    type: 'demos',
    title: 'JavaScript Mini Demos',
    demos: [ ... ]
  }
};
```

4. Put your **videos** in `/videos` and **images** in `/images`.
5. Commit + Push to GitHub.
6. Go to **Repository → Settings → Pages** → set **Branch = main** → **Save**.
7. Your site will be live at `https://<your-username>.github.io/<repo-name>`.

Enjoy! ✨
