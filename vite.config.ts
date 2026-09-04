import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

function netlifyFunctionsPlugin(): Plugin {
  return {
    name: 'netlify-functions-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/.netlify/functions/')) {
          const fnName = req.url.replace('/.netlify/functions/', '').split('?')[0];
          try {
            const fnPath = path.resolve(__dirname, `netlify/functions/${fnName}.js`);
            const fnModule = await import(/* @vite-ignore */ `file://${fnPath}?t=${Date.now()}`);
            if (fnModule && fnModule.handler) {
              let body = '';
              req.on('data', (chunk: Buffer) => {
                body += chunk.toString();
              });
              req.on('end', async () => {
                const event = {
                  httpMethod: req.method || 'GET',
                  headers: req.headers,
                  body: body,
                  queryStringParameters: Object.fromEntries(
                    new URL(req.url || '', `http://${req.headers.host}`).searchParams
                  )
                };
                const result = await fnModule.handler(event, {});
                res.statusCode = result.statusCode || 200;
                if (result.headers) {
                  for (const [key, val] of Object.entries(result.headers)) {
                    res.setHeader(key, val as string);
                  }
                }
                res.end(result.body);
              });
              return;
            }
          } catch (e: any) {
            console.error(`[netlify-functions-dev] Error running function ${fnName}:`, e);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: e.message }));
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), netlifyFunctionsPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    preview: {
      allowedHosts: [
        'codenpixels.onrender.com',
        'www.codenpixels.in',
        'codenpixels.in',
      ],
    },
  };
});

