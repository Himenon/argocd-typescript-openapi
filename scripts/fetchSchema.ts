import * as fs from "fs";
import * as path from "path";
import fetch from "node-fetch";
import { execa } from "execa";
import { rimraf } from "rimraf";
import { versions, outputDir } from "./config";

export const getArgoCdSwaggerSchema = async (version: string): Promise<any> => {
  const url = `https://github.com/argoproj/argo-cd/raw/${version}/assets/swagger.json`;
  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    throw error as any;
  }
};

const convert = async (inputFilename: string, outputFilename: string): Promise<void> => {
  await execa(`pnpm exec swagger2openapi ${inputFilename} -o ${outputFilename}`, {
    stdio: ["pipe", "pipe", "inherit"],
    shell: true,
  });
};

const main = async () => {
  const tempDir = `.tmp-${outputDir}`;
  fs.mkdirSync(tempDir, { recursive: true });
  rimraf.sync(outputDir);
  fs.mkdirSync(outputDir, { recursive: true });
  const tasks = versions.map(async version => {
    const result = await getArgoCdSwaggerSchema(version);
    const swaggerFilename = path.join(tempDir, `swagger-${version}.json`);
    const openapiFilename = path.join(outputDir, `openapi-${version}.json`);
    fs.writeFileSync(swaggerFilename, JSON.stringify(result, null, 2), { encoding: "utf-8" });
    await convert(swaggerFilename, openapiFilename);
  });
  await Promise.all(tasks);
  rimraf.sync(tempDir);
};

main().catch(error => {
  console.error(error);
  process.exit(1);
});
