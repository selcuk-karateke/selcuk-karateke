import { formatPhpStyleDump } from '@/lib/exerciseDemos/formatPhpStyleDump'

export const ELEMENTEANZAHL_PHP_SOURCE = `$a = [];
$b = ["abc", "xyz"];
$b[] = "123";
$b[7] = "äöü";

var_dump($a, $b, count($b));

foreach ($b as $k => $v) {
  echo "ARR AS VAR ($k) => VAR ($v)\\n";
}

for ($i = 0; $i < count($b); $i++) {
  echo "VAR ($i) entspricht ARR $b[$i]\\n";
}`

export const ELEMENTEANZAHL_TS_SOURCE = `const a: string[] = []
const b: (string | undefined)[] = ['abc', 'xyz']
b.push('123')
b[7] = 'äöü'

console.log(a, b, Object.keys(b).length)

for (const [k, v] of Object.entries(b)) {
  console.log(\`ARR AS VAR (\${k}) => VAR (\${v})\`)
}

for (let i = 0; i < b.length; i++) {
  console.log(\`VAR (\${i}) entspricht ARR \${b[i] ?? ''}\`)
}`

/** PHP count(): only defined elements, not length including holes. */
function phpCount(arr: readonly unknown[]): number {
  return arr.reduce<number>((count, value) => (value !== undefined ? count + 1 : count), 0)
}

export function runElementeanzahlDemo() {
  const a: string[] = []
  const b: (string | undefined)[] = ['abc', 'xyz']
  b.push('123')
  b[7] = 'äöü'

  const foreachLines: string[] = []
  b.forEach((v, k) => {
    if (v !== undefined) foreachLines.push(`ARR AS VAR (${k}) => VAR (${v})`)
  })

  const forLines: string[] = []
  for (let i = 0; i < b.length; i++) {
    forLines.push(`VAR (${i}) entspricht ARR ${b[i] ?? ''}`)
  }

  const output = [
    formatPhpStyleDump(a),
    formatPhpStyleDump(b),
    `int(${phpCount(b)})`,
    '',
    'FOREACH:',
    ...foreachLines,
    '',
    'FOR: ignoriert Lücken im ARR [7]',
    ...forLines,
  ].join('\n')

  return {
    serverCount: typeof navigator !== 'undefined' ? 'viele (Browser)' : '…',
    output,
    count: phpCount(b),
    length: b.length,
  }
}
