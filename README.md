
# Haikus for Codespaces

This is a quick node project template for demoing Codespaces. It is based on the [Azure node sample](https://github.com/Azure-Samples/nodejs-docs-hello-world). It's great!!!

Point your browser to [Quickstart for GitHub Codespaces](https://docs.github.com/en/codespaces/getting-started/quickstart) for a tour of using Codespaces with this repo.

## Login

The app is protected by a simple session-based login. Credentials are read
from environment variables — never commit real values to the repo.

If unset, `AUTH_USERNAME`/`AUTH_PASSWORD` default to `admin`/`admin` and a
warning is printed — only fine for local demos, never for a real deployment.

### Local development

Copy `.env.example` to `.env` and fill in real values (`.env` is gitignored):

```
cp .env.example .env
```

```
AUTH_USERNAME=youruser
AUTH_PASSWORD=yourpassword
SESSION_SECRET=some-long-random-string
```

The app loads `.env` automatically on startup (via `dotenv`).

### GitHub Codespaces

Set `AUTH_USERNAME`, `AUTH_PASSWORD`, and `SESSION_SECRET` as
[Codespaces secrets](https://docs.github.com/en/codespaces/managing-your-codespaces/managing-encrypted-secrets-for-your-repository-and-organization-for-github-codespaces)
on this repository. They'll be available as environment variables in every
new Codespace automatically — no `.env` file needed.
