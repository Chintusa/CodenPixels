import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'vite';
import { SERVICES, PROJECTS, FAQS, COMPANY_INFO } from '../src/data.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const ssrOutDir = path.resolve(rootDir, 'dist-ssr');

// Define all routes to prerender
const routes = [
  {
    path: '/',
    title: 'CodeNPixels | AI Web Development & Digital Solutions',
    description: 'CodeNPixels is a premier digital engineering agency specializing in custom React and Next.js website development, scalable backends, UI/UX design, and AI automation.',
    type: 'website'
  },
  {
    path: '/services',
    title: 'Web Development & Digital Services | CodeNPixels',
    description: 'Explore our specialized services: custom web development, AI automation, React frontend engineering, backend architectures, UI/UX design systems, and maintenance.',
    type: 'website'
  },
  {
    path: '/projects',
    title: 'Portfolio & Web Development Case Studies | CodeNPixels',
    description: 'Explore our portfolio of responsive websites, AI applications, e-commerce showcases, and modern frontend platforms built by CodeNPixels.',
    type: 'website'
  },
  {
    path: '/about',
    title: 'About Us | CodeNPixels Digital Consultancy',
    description: 'Learn about CodeNPixels: our engineering philosophy, agile development methodology, and high-precision modern technology stack.',
    type: 'website'
  },
  {
    path: '/process',
    title: 'Our 7-Step Development Methodology | CodeNPixels',
    description: 'Discover our streamlined 7-step software engineering lifecycle: Discovery, Architecture Planning, UI/UX Design, Engineering, Testing, Deployment, and Support.',
    type: 'website'
  },
  {
    path: '/contact',
    title: 'Contact Us & Project Estimator | CodeNPixels',
    description: 'Estimate your project cost with our interactive calculator, or contact CodeNPixels directly for custom website development and digital strategy consultation.',
    type: 'website'
  },
  {
    path: '/404.html',
    title: '404 - Page Not Found | CodeNPixels',
    description: 'The requested page could not be found. Return to CodeNPixels homepage to explore our web development services and portfolio.',
    type: 'website'
  },
  // Dynamic service detail routes
  ...SERVICES.map((srv) => ({
    path: `/services/${srv.slug}`,
    title: srv.metaTitle || `${srv.title} | CodeNPixels`,
    description: srv.metaDescription || srv.description,
    serviceData: srv,
    type: 'article'
  }))
];

function generateJsonLd(route) {
  const baseOrg = {
    '@type': 'Organization',
    '@id': `${COMPANY_INFO.url}/#organization`,
    name: COMPANY_INFO.name,
    legalName: COMPANY_INFO.legalName,
    url: COMPANY_INFO.url,
    logo: {
      '@type': 'ImageObject',
      url: `${COMPANY_INFO.url}/logo.png`,
      width: '512',
      height: '512'
    },
    email: COMPANY_INFO.email,
    telephone: COMPANY_INFO.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: COMPANY_INFO.location.city,
      addressRegion: COMPANY_INFO.location.region,
      addressCountry: COMPANY_INFO.location.countryCode
    },
    sameAs: [
      COMPANY_INFO.social.github,
      COMPANY_INFO.social.linkedin,
      COMPANY_INFO.social.twitter
    ]
  };

  const baseWebSite = {
    '@type': 'WebSite',
    '@id': `${COMPANY_INFO.url}/#website`,
    url: COMPANY_INFO.url,
    name: COMPANY_INFO.name,
    description: COMPANY_INFO.description,
    publisher: {
      '@id': `${COMPANY_INFO.url}/#organization`
    }
  };

  const schemas = [baseOrg, baseWebSite];

  // Route specific structured data
  if (route.path === '/') {
    // FAQ Schema on home
    const faqSchema = {
      '@type': 'FAQPage',
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
    schemas.push(faqSchema);

    // ProfessionalService Schema
    const serviceSchema = {
      '@type': 'ProfessionalService',
      '@id': `${COMPANY_INFO.url}/#service`,
      name: COMPANY_INFO.name,
      url: COMPANY_INFO.url,
      image: `${COMPANY_INFO.url}/og-image.jpg`,
      description: COMPANY_INFO.description,
      address: {
        '@type': 'PostalAddress',
        addressLocality: COMPANY_INFO.location.city,
        addressRegion: COMPANY_INFO.location.region,
        addressCountry: COMPANY_INFO.location.countryCode
      },
      telephone: COMPANY_INFO.phone,
      priceRange: '₹₹',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Web Engineering & Digital Services',
        itemListElement: SERVICES.map((srv, idx) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: srv.title,
            description: srv.description,
            url: `${COMPANY_INFO.url}/services/${srv.slug}`
          },
          position: idx + 1
        }))
      }
    };
    schemas.push(serviceSchema);
  }

  // Service Detail pages schema
  if (route.serviceData) {
    const srv = route.serviceData;

    // BreadcrumbList
    const breadcrumbSchema = {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${COMPANY_INFO.url}/`
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: `${COMPANY_INFO.url}/services`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: srv.title,
          item: `${COMPANY_INFO.url}/services/${srv.slug}`
        }
      ]
    };
    schemas.push(breadcrumbSchema);

    // Dedicated Service Schema
    const singleServiceSchema = {
      '@type': 'Service',
      name: srv.title,
      serviceType: srv.title,
      description: srv.longDescription,
      provider: {
        '@id': `${COMPANY_INFO.url}/#organization`
      },
      areaServed: 'Worldwide',
      url: `${COMPANY_INFO.url}/services/${srv.slug}`
    };
    schemas.push(singleServiceSchema);

    // Service FAQs
    if (srv.faqs && srv.faqs.length > 0) {
      const srvFaqSchema = {
        '@type': 'FAQPage',
        mainEntity: srv.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      };
      schemas.push(srvFaqSchema);
    }
  } else if (route.path !== '/') {
    // Breadcrumb for other pages
    const pageName = route.path.replace('/', '').replace('.html', '');
    const formattedName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

    const breadcrumbSchema = {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${COMPANY_INFO.url}/`
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: formattedName,
          item: `${COMPANY_INFO.url}${route.path}`
        }
      ]
    };
    schemas.push(breadcrumbSchema);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': schemas
  };
}

async function runPrerender() {
  console.log('🚀 Starting CodeNPixels SSG Static Prerendering Pipeline...');

  // Step 1: Build SSR bundle
  console.log('📦 Building SSR entry point...');
  await build({
    build: {
      ssr: path.resolve(rootDir, 'src/entry-server.jsx'),
      outDir: ssrOutDir,
      rollupOptions: {
        output: {
          format: 'es'
        }
      }
    }
  });

  // Step 2: Import server render function
  const serverEntryPath = path.resolve(ssrOutDir, 'entry-server.js');
  const serverEntryUrl = pathToFileURL(serverEntryPath).href;
  const { render } = await import(serverEntryUrl);

  // Step 3: Read template HTML
  const templatePath = path.resolve(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found at ${templatePath}. Ensure "vite build" runs before prerender.`);
  }
  const templateHtml = fs.readFileSync(templatePath, 'utf8');

  // Step 4: Prerender each route
  console.log(`🌐 Prerendering ${routes.length} static HTML routes...`);

  for (const route of routes) {
    const appHtml = render(route.path);
    const canonicalUrl = `${COMPANY_INFO.url}${route.path === '/404.html' ? '/404' : route.path}`;
    const ogImageUrl = `${COMPANY_INFO.url}/og-image.jpg`;
    const jsonLd = generateJsonLd(route);

    // Replace Title
    let html = templateHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${route.title}</title>`);

    // Replace Meta Description
    html = html.replace(
      /<meta\s+name=["']description["'][\s\S]*?>/i,
      `<meta name="description" content="${route.description}" />`
    );

    // Replace Canonical
    html = html.replace(
      /<link\s+rel=["']canonical["'][\s\S]*?>/i,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );

    // Replace Open Graph Tags
    html = html.replace(
      /<meta\s+property=["']og:title["'][\s\S]*?>/i,
      `<meta property="og:title" content="${route.title}" />`
    );
    html = html.replace(
      /<meta\s+property=["']og:description["'][\s\S]*?>/i,
      `<meta property="og:description" content="${route.description}" />`
    );
    html = html.replace(
      /<meta\s+property=["']og:url["'][\s\S]*?>/i,
      `<meta property="og:url" content="${canonicalUrl}" />`
    );
    html = html.replace(
      /<meta\s+property=["']og:image["'][\s\S]*?>/i,
      `<meta property="og:image" content="${ogImageUrl}" />`
    );

    // Replace Twitter Tags
    html = html.replace(
      /<meta\s+name=["']twitter:title["'][\s\S]*?>/i,
      `<meta name="twitter:title" content="${route.title}" />`
    );
    html = html.replace(
      /<meta\s+name=["']twitter:description["'][\s\S]*?>/i,
      `<meta name="twitter:description" content="${route.description}" />`
    );
    html = html.replace(
      /<meta\s+name=["']twitter:image["'][\s\S]*?>/i,
      `<meta name="twitter:image" content="${ogImageUrl}" />`
    );

    // Replace JSON-LD structured data block
    html = html.replace(
      /<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/i,
      `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n    </script>`
    );

    // Inject rendered React markup into root
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

    // Write file to target destination
    let targetFilePath;
    if (route.path === '/') {
      targetFilePath = path.resolve(distDir, 'index.html');
    } else if (route.path === '/404.html') {
      targetFilePath = path.resolve(distDir, '404.html');
    } else {
      const routeSubDir = path.resolve(distDir, route.path.replace(/^\//, ''));
      if (!fs.existsSync(routeSubDir)) {
        fs.mkdirSync(routeSubDir, { recursive: true });
      }
      targetFilePath = path.resolve(routeSubDir, 'index.html');
    }

    fs.writeFileSync(targetFilePath, html, 'utf8');
    console.log(`  ✓ Generated: ${route.path} -> ${path.relative(rootDir, targetFilePath)}`);
  }

  // Step 5: Clean up temporary SSR bundle
  if (fs.existsSync(ssrOutDir)) {
    fs.rmSync(ssrOutDir, { recursive: true, force: true });
  }

  console.log('✅ SSG Prerendering Completed Successfully!');
}

runPrerender().catch((err) => {
  console.error('❌ Prerender failed:', err);
  process.exit(1);
});
