// The bundler of the app that uses the library replaces process.env.NODE_ENV
// (Vite, webpack, Next.js), so development-only warnings are dropped in
// production builds. Declared here to avoid depending on @types/node.
declare const process: { env: { NODE_ENV?: string } };
