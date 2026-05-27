function phpScalarType(value: unknown): string {
  if (value === null || value === undefined) return 'NULL'
  if (typeof value === 'boolean') return `bool(${value ? 'true' : 'false'})`
  if (typeof value === 'number') {
    return Number.isInteger(value) ? `int(${value})` : `float(${value})`
  }
  if (typeof value === 'string') return `string(${value.length}) "${value}"`
  return String(value)
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

/** Educational var_dump-style formatter for TypeScript objects (PHP associative arrays). */
export function formatPhpStyleDump(value: unknown, depth = 0): string {
  const pad = '  '.repeat(depth)

  if (Array.isArray(value)) {
    const lines: string[] = []
    for (let index = 0; index < value.length; index++) {
      if (!(index in value)) {
        lines.push(`${pad}  [${index}]=> NULL`)
        continue
      }
      const item = value[index]
      if (isPlainObject(item) || Array.isArray(item)) {
        const nested = formatPhpStyleDump(item, depth + 1)
        lines.push(`${pad}  [${index}]=> ${nested.split('\n').join(`\n${pad}  `)}`)
      } else {
        lines.push(`${pad}  [${index}]=> ${phpScalarType(item)}`)
      }
    }
    return `array(${value.length}) {\n${lines.join('\n')}\n${pad}}`
  }

  if (isPlainObject(value)) {
    const entries = Object.entries(value)
    const lines = entries.map(([key, item]) => {
      if (isPlainObject(item) || Array.isArray(item)) {
        const nested = formatPhpStyleDump(item, depth + 1)
        return `${pad}  ["${key}"]=>\n${pad}  ${nested.split('\n').join(`\n${pad}  `)}`
      }
      return `${pad}  ["${key}"]=> ${phpScalarType(item)}`
    })
    return `array(${entries.length}) {\n${lines.join('\n')}\n${pad}}`
  }

  return phpScalarType(value)
}
