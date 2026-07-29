# Sanity Content Studio

Schemas and the standalone Studio live in this folder. Edit content via the standalone Studio only (`bun run dev:studio`).

## Run Studio

| Mode       | Command              | URL                   |
| ---------- | -------------------- | --------------------- |
| Standalone | `bun run dev:studio` | http://localhost:3333 |

## Schema deploy

Publish the Studio schema to Sanity’s schema API (project `pph0cdly`, dataset `production`):

```bash
bunx sanity@latest schemas deploy
```

Run from this `sanity/` directory. Local Studio authoring and Content Lake document writes work without a deploy; schema deploy is for MCP/`get_schema` and schema-aware tooling.

## Next steps

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the Sanity community](https://www.sanity.io/community/join?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)
