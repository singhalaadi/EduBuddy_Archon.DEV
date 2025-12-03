# 🚀 Deploying AI Learning Tutor to Vercel

## Prerequisites
- GitHub account
- Vercel account (free tier works)
- MongoDB Atlas account (free tier)

## Step-by-Step Deployment Guide

### 1️⃣ Prepare MongoDB Atlas (Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
5. Replace `<password>` with your actual password
6. Add `/learning-tutor` at the end: `mongodb+srv://username:password@cluster.mongodb.net/learning-tutor`

### 2️⃣ Get Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the API key (starts with `AIza...`)

### 3️⃣ Push Code to GitHub

Open terminal in your project folder and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: AI Learning Tutor"

# Create repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/learning-ai-tutor.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 4️⃣ Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. Go to [Vercel](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: Leave default
   - **Output Directory**: Leave default

6. **Add Environment Variables** (Click "Environment Variables"):
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/learning-tutor
   JWT_SECRET=your_super_secret_jwt_key_change_this
   GOOGLE_API_KEY=your_google_gemini_api_key
   NODE_ENV=production
   ```

7. Click "Deploy"
8. Wait 2-3 minutes for deployment

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts and add environment variables when asked
```

### 5️⃣ Configure Client API URL

After deployment, you'll get a URL like: `https://your-app.vercel.app`

Update the API client:

**File: `client/src/api/apiClient.js`**
```javascript
const apiClient = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
        ? 'https://your-app.vercel.app/api'
        : 'http://localhost:5000/api',
    // ... rest of config
});
```

Then redeploy:
```bash
git add .
git commit -m "Update API URL for production"
git push
```

Vercel will auto-deploy on push!

### 6️⃣ Verify Deployment

1. Visit your Vercel URL
2. Test signup/login
3. Try the adaptive assessment
4. Check if questions generate properly

## 🔧 Important Configuration

### MongoDB Atlas Network Access
1. Go to MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### CORS Configuration
The server is already configured for CORS, but verify in `server/server.js`:
```javascript
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? 'https://your-app.vercel.app'
        : 'http://localhost:5173'
}));
```

## 📊 Post-Deployment Checklist

- [ ] MongoDB connection works
- [ ] User signup/login works
- [ ] AI questions generate properly
- [ ] Learning plans create successfully
- [ ] All pages load correctly
- [ ] Hindi translations display properly
- [ ] Images and icons load

## 🐛 Troubleshooting

### "Cannot connect to database"
- Check MongoDB Atlas IP whitelist
- Verify connection string in environment variables
- Check MongoDB Atlas cluster is running

### "API calls failing"
- Verify API URL in client
- Check CORS configuration
- Ensure all environment variables are set

### "AI not generating questions"
- Verify Google API key is correct
- Check API key has Gemini API enabled
- Look at Vercel function logs

## 📝 Environment Variables Summary

```env
# Required for Vercel
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/learning-tutor
JWT_SECRET=your_secret_key_min_32_chars
GOOGLE_API_KEY=AIza...your_key
NODE_ENV=production
```

## 🎉 You're Live!

Your app is now accessible globally at: `https://your-app.vercel.app`

Share this URL with anyone to use your AI Learning Tutor!

## 📱 Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (5-30 minutes)

---

**Need Help?** Check Vercel logs or open an issue on GitHub!
