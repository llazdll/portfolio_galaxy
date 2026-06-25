/**
 * Minimal YAML frontmatter parser — no dependencies.
 *
 * Supports:
 *   - Key-value pairs: `key: value`
 *   - Multi-line values: key on one line, value on next (until next key/array)
 *   - Arrays: items starting with `- ` under a key
 *   - Type coercion: "true"/"false" → boolean, numeric strings → number
 *
 * Returns null if the input doesn't start with valid frontmatter delimiters.
 */

export interface FrontmatterResult {
  data: Record<string, unknown>;
  content: string;
}

export function parseFrontmatter(raw: string): FrontmatterResult | null {
  const trimmed = raw.trim();

  if (!trimmed.startsWith("---")) {
    return null;
  }

  const endIndex = trimmed.indexOf("---", 3);
  if (endIndex === -1) {
    return null;
  }

  const yamlContent = trimmed.slice(3, endIndex);
  const bodyContent = trimmed.slice(endIndex + 3);

  const data: Record<string, unknown> = {};
  const lines = yamlContent.split("\n");

  let currentKey: string | null = null;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine === "") {
      continue;
    }

    // Array item
    const arrayMatch = trimmedLine.match(/^-\s+(.+)$/);
    if (arrayMatch && currentKey) {
      const value = coerceValue(arrayMatch[1]);
      const existing = data[currentKey];
      if (Array.isArray(existing)) {
        existing.push(value);
      } else {
        data[currentKey] = [value];
      }
      continue;
    }

    // Key-value pair
    const keyValueMatch = trimmedLine.match(
      /^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/
    );
    if (keyValueMatch) {
      currentKey = keyValueMatch[1];
      const rawValue = keyValueMatch[2].trim();

      if (rawValue === "") {
        // Value might continue on next lines — store as string accumulator
        if (!(currentKey in data)) {
          data[currentKey] = "";
        }
      } else {
        data[currentKey] = coerceValue(rawValue);
      }
      continue;
    }

    // Continuation line for current key (multi-line value)
    if (currentKey) {
      const existing = data[currentKey];
      if (Array.isArray(existing)) {
        // Already an array — ignore stray continuation lines
        continue;
      }
      const prefix = existing === "" ? "" : existing + "\n";
      data[currentKey] = prefix + trimmedLine;
    }
  }

  // Coerce final string values that look like numbers/booleans
  for (const key of Object.keys(data)) {
    const value = data[key];
    if (typeof value === "string" && value !== "") {
      data[key] = coerceValue(value);
    }
  }

  return { data, content: bodyContent };
}

function coerceValue(raw: string): unknown {
  if (raw === "true") return true;
  if (raw === "false") return false;

  // Only coerce pure integers (no decimals, no leading zeros)
  if (/^-?\d+$/.test(raw)) {
    const num = parseInt(raw, 10);
    if (String(num) === raw) {
      return num;
    }
  }

  return raw;
}
