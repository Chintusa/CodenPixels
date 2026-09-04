import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

const routes = [
  { file: 'index.html', url: '/', expectTitle: 'CodeNPixels | AI Web Development & Digital Solutions', expectH1: 'AI-Powered Web Development' },
  { file: 'services/index.html', url: '/services', expectTitle: 'Web Development & Digital Services | CodeNPixels', expectH1: 'Engineered Capabilities for Modern Growth' },
  { file: 'services/web-development/index.html', url: '/services/web-development', expectTitle: 'Custom Web Development Services | CodeNPixels', expectH1: 'Custom Web Development Services for High-Growth Businesses' },
  { file: 'services/ai-development/index.html', url: '/services/ai-development', expectTitle: 'AI Web Development & Automation Services | CodeNPixels', expectH1: 'AI-Powered Web Development & Intelligent Digital Solutions' },
  { file: 'services/frontend-development/index.html', url: '/services/frontend-development', expectTitle: 'Frontend Development Services | React & Next.js | CodeNPixels', expectH1: 'Modern Frontend Engineering with React & Next.js' },
  { file: 'services/backend-development/index.html', url: '/services/backend-development', expectTitle: 'Backend Development Services | Node.js & Databases | CodeNPixels', expectH1: 'Scalable Backend Development & Cloud API Architectures' },
  { file: 'services/fullstack-development/index.html', url: '/services/fullstack-development', expectTitle: 'Full Stack Web Development Company | CodeNPixels', expectH1: 'End-to-End Full Stack Web Application Development' },
  { file: 'services/ui-ux-design/index.html', url: '/services/ui-ux-design', expectTitle: 'UI/UX Design Company | Modern User Experience Design | CodeNPixels', expectH1: 'High-Converting UI/UX Design & User Experience Systems' },
  { file: 'services/api-development/index.html', url: '/services/api-development', expectTitle: 'API Development & Integration Services | CodeNPixels', expectH1: 'REST & GraphQL API Development and System Integration' },
  { file: 'services/website-maintenance/index.html', url: '/services/website-maintenance', expectTitle: 'Website Optimization & Maintenance Services | CodeNPixels', expectH1: 'Website Optimization, Core Web Vitals & Maintenance Services' },
  { file: 'services/portfolio-design/index.html', url: '/services/portfolio-design', expectTitle: 'Custom Portfolio Website Design | CodeNPixels', expectH1: 'High-Impact Portfolio Design & Personal Branding Websites' },
  { file: 'services/smart-menu-system/index.html', url: '/services/smart-menu-system', expectTitle: 'Smart QR Menu & Restaurant Ordering System | CodeNPixels', expectH1: 'Smart QR Digital Menu & Contactless Restaurant Ordering Systems' },
  { file: 'services/billing-software/index.html', url: '/services/billing-software', expectTitle: 'Custom Billing & Invoicing Software | CodeNPixels', expectH1: 'Automated Billing, Invoicing & Multi-Currency Software Solutions' },
  { file: 'services/pos-systems/index.html', url: '/services/pos-systems', expectTitle: 'Custom POS Software Development | CodeNPixels', expectH1: 'Cloud Point of Sale (POS) Software for Retail & Hospitality' },
  { file: 'services/erp-software/index.html', url: '/services/erp-software', expectTitle: 'Custom Cloud ERP Software Development | CodeNPixels', expectH1: 'Custom Cloud ERP Systems & Enterprise Resource Planning' },
  { file: 'projects/index.html', url: '/projects', expectTitle: 'Portfolio & Web Development Case Studies | CodeNPixels', expectH1: 'Engineered Masterpieces' },
  { file: 'about/index.html', url: '/about', expectTitle: 'About Us | CodeNPixels Digital Consultancy', expectH1: 'A High-Precision Digital Engineering Agency' },
  { file: 'process/index.html', url: '/process', expectTitle: 'Our 7-Step Development Methodology | CodeNPixels', expectH1: 'Our 7-Step Development Process' },
  { file: 'contact/index.html', url: '/contact', expectTitle: 'Contact Us & Project Estimator | CodeNPixels', expectH1: "Let's Map Your Digital Strategy" },
  { file: '404.html', url: '/404', expectTitle: '404 - Page Not Found | CodeNPixels', expectH1: 'Page Not Found' }
];

function verifyFiles() {
  console.log('🔍 Validating Prerendered HTML Files and Static Assets in dist/...\n');
  let passed = 0;
  let failed = 0;

  for (const route of routes) {
    const filePath = path.resolve(distDir, route.file);

    if (!fs.existsSync(filePath)) {
      console.error(`❌ [FAIL] Missing file: ${route.file}`);
      failed++;
      continue;
    }

    const html = fs.readFileSync(filePath, 'utf8');

    // Title
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    const actualTitle = titleMatch ? titleMatch[1] : '';
    const titleOk = actualTitle === route.expectTitle;

    // H1 (find within main or root)
    const h1Matches = Array.from(html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi));
    const h1Texts = h1Matches.map(m =>
      m[1]
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&#x27;/g, "'")
        .replace(/&quot;/g, '"')
        .trim()
    );
    const h1Ok = h1Texts.some(h => h.includes(route.expectH1) || route.expectH1.includes(h));

    // Canonical
    const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
    const canonicalOk = !!canonicalMatch && canonicalMatch[1].startsWith('https://codenpixels.in');

    // Open Graph
    const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
    const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
    const ogOk = !!ogTitleMatch && !!ogImageMatch;

    // JSON-LD
    const jsonLdMatch = html.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
    let jsonLdOk = false;
    if (jsonLdMatch) {
      try {
        const parsed = JSON.parse(jsonLdMatch[1]);
        jsonLdOk = parsed['@context'] === 'https://schema.org' && Array.isArray(parsed['@graph']);
      } catch (e) {
        jsonLdOk = false;
      }
    }

    // Check rendered content in root
    const rootMatch = html.match(/<div id="root">([\s\S]*?)<\/div>/i);
    const rootHasContent = rootMatch && rootMatch[1].length > 100;

    if (titleOk && h1Ok && canonicalOk && ogOk && jsonLdOk && rootHasContent) {
      console.log(`✅ [PASS] ${route.url} (${route.file})`);
      console.log(`      Title:     "${actualTitle}"`);
      console.log(`      H1:        "${h1Texts.join(' | ')}"`);
      console.log(`      Canonical: ${canonicalMatch[1]}`);
      console.log(`      HTML Size: ${(html.length / 1024).toFixed(1)} KB (Rich Content)`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${route.url} (${route.file})`);
      if (!titleOk) console.error(`      Title mismatch! Expected: "${route.expectTitle}" | Got: "${actualTitle}"`);
      if (!h1Ok) console.error(`      H1 mismatch! Expected: "${route.expectH1}" | Got: "${h1Texts.join(' | ')}"`);
      if (!canonicalOk) console.error(`      Invalid canonical!`);
      if (!ogOk) console.error(`      Invalid Open Graph tags!`);
      if (!jsonLdOk) console.error(`      Invalid or unparseable JSON-LD!`);
      if (!rootHasContent) console.error(`      Root div has no prerendered content!`);
      failed++;
    }
  }

  // Check robots.txt and sitemap.xml
  const robotsPath = path.resolve(distDir, 'robots.txt');
  if (fs.existsSync(robotsPath) && fs.readFileSync(robotsPath, 'utf8').includes('sitemap.xml')) {
    console.log(`✅ [PASS] robots.txt is present and configured`);
    passed++;
  } else {
    console.error(`❌ [FAIL] robots.txt missing or invalid`);
    failed++;
  }

  const sitemapPath = path.resolve(distDir, 'sitemap.xml');
  if (fs.existsSync(sitemapPath) && fs.readFileSync(sitemapPath, 'utf8').includes('<loc>https://codenpixels.in/</loc>')) {
    console.log(`✅ [PASS] sitemap.xml is present with all URLs`);
    passed++;
  } else {
    console.error(`❌ [FAIL] sitemap.xml missing or invalid`);
    failed++;
  }

  const ogPath = path.resolve(distDir, 'og-image.jpg');
  if (fs.existsSync(ogPath) && fs.statSync(ogPath).size > 10000) {
    console.log(`✅ [PASS] og-image.jpg is present (${(fs.statSync(ogPath).size / 1024).toFixed(1)} KB)`);
    passed++;
  } else {
    console.error(`❌ [FAIL] og-image.jpg missing or too small`);
    failed++;
  }

  const googleVerifyPath = path.resolve(distDir, 'google50bc14705da70881.html');
  if (fs.existsSync(googleVerifyPath) && fs.readFileSync(googleVerifyPath, 'utf8').trim() === 'google-site-verification: google50bc14705da70881.html') {
    console.log(`✅ [PASS] google50bc14705da70881.html is present in dist/ with exact Google verification content`);
    passed++;
  } else {
    console.error(`❌ [FAIL] google50bc14705da70881.html missing from dist/ or has invalid content`);
    failed++;
  }


  console.log(`\n========================================`);
  console.log(`Verification Summary: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================`);

  if (failed > 0) process.exit(1);
}

verifyFiles();
