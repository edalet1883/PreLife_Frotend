#!/usr/bin/env node
/**
 * check:i18n gate - verifies message parity across locales:
 * 1. Same set of namespaces and keys in every locale file.
 * 2. Same set of ICU {placeholders} for every key in every locale.
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const messagesDir = join(here, "..", "messages");
const locales = ["az", "en", "ru"];

const flatten = (obj, prefix = "") => {
  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object") {
      Object.assign(out, flatten(value, path));
    } else {
      out[path] = value;
    }
  }
  return out;
};

const icuParams = (text) => {
  const params = new Set();
  const re = /\{(\w+)\}/g;
  let match;
  while ((match = re.exec(String(text))) !== null) {
    params.add(match[1]);
  }
  return params;
};

const messages = {};
for (const locale of locales) {
  messages[locale] = flatten(
    JSON.parse(readFileSync(join(messagesDir, `${locale}.json`), "utf8")),
  );
}

let failed = false;
const fail = (msg) => {
  failed = true;
  console.error(`  X ${msg}`);
};

const base = messages.en;
for (const locale of locales.slice(1)) {
  const other = messages[locale];
  const baseKeys = new Set(Object.keys(base));
  const otherKeys = new Set(Object.keys(other));

  for (const key of baseKeys) {
    if (!otherKeys.has(key)) fail(`[${locale}] missing key: ${key}`);
  }
  for (const key of otherKeys) {
    if (!baseKeys.has(key)) fail(`[${locale}] extra key: ${key}`);
  }
  for (const key of baseKeys) {
    if (!otherKeys.has(key)) continue;
    const a = icuParams(base[key]);
    const b = icuParams(other[key]);
    const aStr = [...a].sort().join(",");
    const bStr = [...b].sort().join(",");
    if (aStr !== bStr) {
      fail(
        `[${locale}] ICU mismatch for ${key}: en={${aStr}} ${locale}={${bStr}}`,
      );
    }
  }
}

if (failed) {
  console.error("\ncheck:i18n FAILED\n");
  process.exit(1);
} else {
  console.log(
    `  OK ${Object.keys(base).length} keys x ${locales.length} locales, parity + ICU params match`,
  );
}
