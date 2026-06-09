const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const htmlFiles = [
  "index.html",
  "Pages/boards.html",
  "Pages/builds.html",
  "Pages/changelog.html",
  "Pages/colorways.html",
  "Pages/keycaps.html",
  "Pages/layouts.html",
  "Pages/profiles.html"
];

const staticAttributePattern = /\b(?:src|href)=["']([^"']+)["']/gi;
const scriptPattern = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
const skippedSchemes = /^(?:https?:|mailto:|tel:|#|javascript:|data:)/i;

function decodeAssetPath(value) {
  const clean = value.split("#")[0].split("?")[0];
  try {
    return decodeURIComponent(clean);
  } catch (error) {
    return clean;
  }
}

function assertFileExists(fromFile, reference) {
  if (!reference || skippedSchemes.test(reference)) return [];
  if (reference.includes("${")) return [];
  const clean = decodeAssetPath(reference);
  if (!clean) return [];
  const resolved = path.resolve(path.dirname(path.join(root, fromFile)), clean);
  if (!resolved.startsWith(root)) return [`${fromFile}: reference escapes project root: ${reference}`];
  return fs.existsSync(resolved) ? [] : [`${fromFile}: missing file reference: ${reference}`];
}

function validateHtml(file) {
  const fullPath = path.join(root, file);
  const html = fs.readFileSync(fullPath, "utf8");
  const errors = [];

  for (const match of html.matchAll(staticAttributePattern)) {
    errors.push(...assertFileExists(file, match[1]));
  }

  let scriptIndex = 0;
  for (const match of html.matchAll(scriptPattern)) {
    scriptIndex += 1;
    try {
      new vm.Script(match[1], { filename: `${file} inline script ${scriptIndex}` });
    } catch (error) {
      errors.push(`${file}: inline script ${scriptIndex} failed to parse: ${error.message}`);
    }
  }

  return errors;
}

const missingPages = htmlFiles.filter(file => !fs.existsSync(path.join(root, file)));
const errors = [
  ...missingPages.map(file => `Missing required page: ${file}`),
  ...htmlFiles.filter(file => !missingPages.includes(file)).flatMap(validateHtml)
];

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} HTML pages.`);
