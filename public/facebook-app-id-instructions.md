# Creating a Facebook App ID for Bright Forge SEO

To properly configure Facebook sharing and resolve the "Missing Properties" error, you need to create a Facebook App ID by following these steps:

1. **Go to Facebook Developers**
   - Visit [Facebook Developers](https://developers.facebook.com/)
   - Log in with your Facebook account

2. **Create a New App**
   - Click "My Apps" in the top menu
   - Click "Create App"
   - Select "Business" as the app type
   - Enter "Bright Forge SEO" as the app name
   - Complete the security check if prompted
   - Click "Create App"

3. **Get Your App ID**
   - Once created, you'll be taken to the app dashboard
   - Your App ID will be displayed at the top of the page (a long number)

4. **Update Your Website**
   - Replace the placeholder in your SEO component with your actual App ID:
   ```html
   <meta property="fb:app_id" content="YOUR_ACTUAL_APP_ID" />
   ```

5. **Verify with Facebook Sharing Debugger**
   - After updating and deploying your site, use the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) again
   - The "Missing Properties" error should be resolved

This App ID allows Facebook to associate your website with your Facebook app, enabling better integration with Facebook's social features and analytics.
