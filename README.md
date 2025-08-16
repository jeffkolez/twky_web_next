This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Deploy Script:

```bash
set -euo pipefail

SITE_DIR="/home/forge/test.theywillkillyou.com"
REPO_SSH="git@github.com:jeffkolez/twky_web_next.git"
BRANCH="main"

mkdir -p "$SITE_DIR"
cd "$SITE_DIR"

# Clone once
if [ ! -d .git ]; then
    git clone "$REPO_SSH" .
fi

git fetch --all --prune
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

# Ensure Node is present (install once if missing)
if ! command -v node >/dev/null 2>&1; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install deps, build, then start/reload Next server
if [ -f package-lock.json ]; then
    npm ci
else
    npm install
fi

npm run build

# Start or reload PM2 app
if pm2 describe twky-web >/dev/null 2>&1; then
    pm2 startOrReload ecosystem.config.cjs
else
    pm2 start ecosystem.config.cjs
fi
pm2 save
```

Nginx Config

```nginxconf
# FORGE CONFIG (DO NOT REMOVE!)
include forge-conf/test.theywillkillyou.com/before/*;

server {
    http2 on;
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name test.theywillkillyou.com;
    server_tokens off;

    # Root is unused with proxy, but Forge likes it present
    root /home/forge/test.theywillkillyou.com;

    # FORGE SSL (DO NOT REMOVE!)
    ssl_certificate /etc/nginx/ssl/test.theywillkillyou.com/2798953/server.crt;
    ssl_certificate_key /etc/nginx/ssl/test.theywillkillyou.com/2798953/server.key;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_dhparam /etc/nginx/dhparams.pem;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    # FORGE CONFIG (DO NOT REMOVE!)
    include forge-conf/test.theywillkillyou.com/server/*;

    # Cache Next.js build assets aggressively
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        expires 30d;
        access_log off;
    }

    # Everything else to Next
    location / {
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket/SSE friendly (harmless if unused)
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # If you stream responses, this helps avoid buffering delays
        # proxy_buffering off;

        proxy_pass http://127.0.0.1:3000;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    access_log off;
    error_log /var/log/nginx/test.theywillkillyou.com-error.log error;

}

# Optional: HTTP -> HTTPS redirect
server {
    listen 80;
    listen [::]:80;
    server_name test.theywillkillyou.com;
    return 301 https://$host$request_uri;
}

# FORGE CONFIG (DO NOT REMOVE!)
include forge-conf/test.theywillkillyou.com/after/*;
```

Build Sitemap: `npx ts-node generate-sitemap.ts`