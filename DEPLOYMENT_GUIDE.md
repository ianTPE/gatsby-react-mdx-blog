# Deployment Instructions for Netlify

## Prerequisites
- GitHub repository with your Gatsby blog code
- Netlify account (free tier works)

## Steps to Deploy

### 1. Prepare Your Repository

Ensure your repository has:
- All code committed and pushed
- `package.json` with all dependencies
- `icon.png` in `src/images/` (or use the icon-generator.html)

### 2. Connect to Netlify

1. Log in to [Netlify](https://www.netlify.com)
2. Click "Add new site" > "Import an existing project"
3. Choose "Deploy with GitHub"
4. Authorize Netlify to access your GitHub account
5. Select your gatsby-react-mdx-blog repository

### 3. Configure Build Settings

Netlify should auto-detect Gatsby settings, but verify:

- **Build command**: `npm run build`
- **Publish directory**: `public`
- **Node version**: Add environment variable `NODE_VERSION` = `18`

### 4. Environment Variables (if needed)

Add any environment variables in Netlify dashboard:
- Go to Site settings > Environment variables
- Add variables like `GATSBY_API_KEY` if your site needs them

### 5. Deploy

1. Click "Deploy site"
2. Netlify will run the build process
3. First deploy may take 2-5 minutes

### 6. Custom Domain (Optional)

1. Go to Domain settings
2. Add custom domain
3. Follow DNS configuration instructions

## Common Issues and Solutions

### Build Fails with "icon.png not found"
- Solution: Ensure `src/images/icon.png` exists (use icon-generator.html to create one)

### GraphQL Query Errors
- Solution: Clear cache locally with `npm run clean` and ensure all content files have proper frontmatter

### Memory Issues
- Solution: Add environment variable `NODE_OPTIONS` = `--max-old-space-size=4096`

### Chart Components Not Loading
- This is already fixed in the code with dynamic imports and SSR protection

## Continuous Deployment

After initial setup:
- Every push to your main branch triggers automatic deployment
- Preview deployments created for pull requests
- Check deploy logs in Netlify dashboard for any issues

## Performance Optimizations

Netlify automatically provides:
- CDN distribution
- Automatic HTTPS
- Asset optimization
- Brotli compression

## Monitoring

Use Netlify Analytics (paid) or integrate Google Analytics for traffic monitoring.
