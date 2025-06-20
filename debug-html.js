import { getBlogPostBySlug } from './src/lib/contentful.js';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

async function debugHTML() {
  try {
    const post = await getBlogPostBySlug('answer-engine-revolution');
    if (post && post.content) {
      const htmlContent = documentToHtmlString(post.content);
      console.log('=== HTML Structure Preview ===');
      console.log(htmlContent.substring(0, 1000));
      console.log('\n=== Looking for specific elements ===');
      
      // Check for headings
      const h2Count = (htmlContent.match(/<h2/g) || []).length;
      const h3Count = (htmlContent.match(/<h3/g) || []).length;
      const pCount = (htmlContent.match(/<p/g) || []).length;
      
      console.log(`Found ${h2Count} H2 headings`);
      console.log(`Found ${h3Count} H3 headings`);
      console.log(`Found ${pCount} paragraphs`);
      
      // Check for specific CSS classes that might be missing
      const hasContentBody = htmlContent.includes('content-body');
      console.log(`Has content-body class: ${hasContentBody}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

debugHTML();
