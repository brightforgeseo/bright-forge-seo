# How to Fix Facebook Sharing Image

I've created the necessary files to fix your Facebook sharing image issue. Follow these steps:

1. Create a proper Facebook OG image with these specifications:
   - Dimensions: 1200×630 pixels (1.91:1 aspect ratio)
   - Format: PNG or JPG
   - File size: Under 8MB
   - Text coverage: Less than 20% of the image

2. Use an online tool or graphic design software to create this image:
   - Use the template I created at `/public/facebook-og-template.html`
   - Open this file in a browser, take a screenshot, and crop it to 1200×630px
   - Or use Canva/Photoshop to create an image with your logo centered with plenty of padding

3. Save the image as `facebook-og.png` in your `/public/images/` folder

4. I've already updated your SEO component to reference this image

5. After deploying, use Facebook's Sharing Debugger to clear the cache:
   - Go to: https://developers.facebook.com/tools/debug/
   - Enter your website URL and click "Debug"
   - Click "Scrape Again" to refresh Facebook's cache
