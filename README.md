# @himenon/argocd-typescript-openapi

```bash
npm  i   @himenon/argocd-typescript-openapi
pnpm i   @himenon/argocd-typescript-openapi
yarn add @himenon/argocd-typescript-openapi
```

## Usage

```ts
import * as fs from "fs";
import * as yaml from "js-yaml"; // pnpm i -D js-yaml @types/js-yaml
import type { Schemas } from "@himenon/argocd-typescript-openapi/dist/v2.9.6";
```

## Build

```ts
pnpm run build
```

## Update Schemas

```bash
# Fetch and Build
pnpm run build:all

# Fetch schemas
pnpm run fetch:schemas

# Generate source code
pnpm run generate:code
```

## OpenAPI Source for ArgoCD

- <https://github.com/argoproj/argo-cd/blob/master/assets/swagger.json>

## OpenAPI TypeScript Code Generator

- [@himenon/openapi-typescript-code-generator](https://github.com/Himenon/openapi-typescript-code-generator)

You can also just use the type definition

## Use Another Version

Edit [config.ts](./scripts/config.ts)

## LICENCE

[@Himenon/argocd-typescript-openapi](https://github.com/Himenon/argocd-typescript-openapi)・MIT
