
# Haikus for Codespaces

This is a quick node project template for demoing Codespaces. It is based on the [Azure node sample](https://github.com/Azure-Samples/nodejs-docs-hello-world). It's great!!!

Point your browser to [Quickstart for GitHub Codespaces](https://docs.github.com/en/codespaces/getting-started/quickstart) for a tour of using Codespaces with this repo.

## Login

The app is protected by a simple session-based login. Set credentials via
environment variables before starting the server:

```
AUTH_USERNAME=youruser
AUTH_PASSWORD=yourpassword
SESSION_SECRET=some-long-random-string
```

If unset, `AUTH_USERNAME`/`AUTH_PASSWORD` default to `admin`/`admin` and a
warning is printed — only fine for local demos, never for a real deployment.
