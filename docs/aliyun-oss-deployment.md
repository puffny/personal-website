# Aliyun OSS Deployment

This repository can deploy the Vite static build to Aliyun OSS from GitHub Actions.

## GitHub Secrets

Add these secrets in GitHub repository settings:

- `ALIYUN_ACCESS_KEY_ID`
- `ALIYUN_ACCESS_KEY_SECRET`
- `ALIYUN_OSS_REGION`, for example `cn-hangzhou`
- `ALIYUN_OSS_BUCKET`, bucket name only

Optional:

- `ALIYUN_OSS_ENDPOINT`, for example a custom OSS endpoint or CNAME endpoint
- `ALIYUN_OSS_PREFIX`, only if the site should deploy under a bucket folder

## OSS Setup

Use a dedicated bucket or prefix for this site. The workflow mirrors `dist/` to OSS with `--delete`, so destination-only files are removed.

Recommended OSS settings:

- Enable static website hosting.
- Set the homepage to `index.html`.
- Configure the error or fallback page to `index.html` so React routes can refresh directly.
- Put CDN in front of the bucket for China access.
- Bind HTTPS on the CDN domain.

## Run

After the secrets are set, open GitHub Actions, choose `Deploy to Aliyun OSS`, and run it manually.

The workflow intentionally uses manual dispatch only. After the first successful deployment, add a `push` trigger if you want every `main` update to deploy automatically.
