import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import http from "node:http";

let activeBackend = "http://127.0.0.1:8000";

function checkPort(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const req = http.get(
      { host: "127.0.0.1", port, path: "/up", timeout: 300 },
      (res) => {
        resolve(res.statusCode === 200 || res.statusCode === 302 || res.statusCode === 404);
      }
    );
    req.on("error", () => resolve(false));
    req.on("timeout", () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function probeActiveBackend() {
  if (await checkPort(8000)) {
    activeBackend = "http://127.0.0.1:8000";
    return;
  }
  if (await checkPort(8001)) {
    activeBackend = "http://127.0.0.1:8001";
    return;
  }
}

// Keep probing in the background
setInterval(probeActiveBackend, 2500);

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  await probeActiveBackend();

  const proxyConfig = {
    target: activeBackend,
    changeOrigin: false,
    autoRewrite: true,
    xfwd: true,
    router: () => activeBackend,
  };

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: 3000,
      host: true,
      proxy: {
        "^/admin(/.*)?$": proxyConfig,
        "^/api(/.*)?$": proxyConfig,
        "^/storage(/.*)?$": proxyConfig,
      },
    },
    build: {
      outDir: "dist",
      sourcemap: false,
    },
  };
});
