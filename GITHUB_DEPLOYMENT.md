# GitHub + Cloudflare Pages Deployment Instructions

## 🎯 DEPLOYMENT PLAN

### Option 1: Manual GitHub Upload (RECOMMENDED)

#### **Step 1: Clean GitHub Repository**
1. Go to: https://github.com/AI-StartDigital/Gusar-2025
2. **Delete ALL existing files** in the repository
3. This ensures clean deployment without conflicts

#### **Step 2: Upload New Code**
Upload these files from your local backup:

**Essential Files:**
```
├── src/
│   ├── index.tsx          # Main application 
│   └── renderer.tsx       # Hono renderer
├── public/
│   └── static/           # Static assets
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── vite.config.ts        # Vite configuration  
├── wrangler.jsonc        # Cloudflare config
├── ecosystem.config.cjs  # PM2 config
├── README.md            # Documentation
├── DEPLOYMENT.md        # Deployment guide
└── .gitignore           # Git ignore rules
```

**DO NOT Upload:**
- `node_modules/` (will be installed automatically)
- `dist/` (will be built automatically)
- `.env` files (secrets)

#### **Step 3: Cloudflare Pages Connection**
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages
2. **Create a Project** → Connect to Git
3. **Select Repository**: `AI-StartDigital/Gusar-2025`
4. **Build Settings**:
   - **Framework**: Hono
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Root Directory**: `/` (root)
   - **Node Version**: 18 or later

5. **Deploy**

#### **Step 4: Expected Results**
- **Production URL**: `https://gusar-2025.pages.dev`
- **Auto-deployment**: Every git push triggers rebuild
- **SSL**: Automatic HTTPS
- **Global CDN**: Cloudflare edge network

---

### Option 2: Git Push (If Authentication Works)

```bash
# Navigate to project
cd /path/to/webapp

# Add all files
git add .
git commit -m "Production-ready TKD Gusar website"

# Set remote (replace existing)
git remote set-url origin https://github.com/AI-StartDigital/Gusar-2025.git

# Push to main branch
git push -u origin main --force
```

---

### Option 3: ZIP Upload Method

If git push fails:

1. **Download project backup**: 
   https://page.gensparksite.com/project_backups/tooluse_xxLc8oCKQgqf99Ai2No8Lg.tar.gz

2. **Extract locally**

3. **Upload to GitHub manually**:
   - Delete existing files in repo
   - Drag & drop all files except `node_modules/` and `dist/`
   - Commit changes

4. **Connect Cloudflare Pages** to the repository

---

## 🎯 RECOMMENDED APPROACH

**BEST**: Option 1 (Manual Upload) + Cloudflare Pages Git Integration

**Why?**
- ✅ Clean deployment without conflicts
- ✅ Automatic future deployments 
- ✅ Version control integration
- ✅ Build logs and error handling
- ✅ Branch previews for testing

**Expected Timeline:**
- GitHub upload: 5 minutes
- Cloudflare setup: 3 minutes  
- First deployment: 2 minutes
- **Total**: ~10 minutes to go live!

---

## 🚀 Post-Deployment Checklist

After successful deployment:

1. **Test Production URL**
2. **Verify Mobile Responsiveness**  
3. **Check SEO Meta Tags** (View Source)
4. **Test Contact Form**
5. **Verify Social Links**
6. **Add Custom Domain** (optional)

**Contact Info Verification:**
- Email: jvrdoljak41@gmail.com
- Phone: 095 567 55 20  
- Address: Četvrt Ribnjak, 21310, Omiš
- Facebook: https://www.facebook.com/taekwondo.klub.monter/
- Instagram: https://www.instagram.com/taekwondomonter/

---

**🏆 Your website will be live with enterprise-level performance and SEO!**