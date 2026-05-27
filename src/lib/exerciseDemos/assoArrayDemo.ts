import { formatPhpStyleDump } from '@/lib/exerciseDemos/formatPhpStyleDump'

export type Wohnort = {
  strasse: string
  hausnr: string
  plz: string
  ort: string
}

export type Person = {
  vorname: string
  nachname: string
  wohnort: Wohnort
  geburtsdatum: string
}

export const ASSO_ARRAY_PHP_SOURCE = `$p = [
  "vorname" => "Max",
  "nachname" => "Mustermann",
  "wohnort" => [
    "strasse" => "Berliner Str.",
    "hausnr" => "13",
    "plz" => "10117",
    "ort" => "Berlin",
  ],
  "geburtsdatum" => "1980-10-25",
];

var_dump($p);
echo "Wohnort > Strasse: ".$p["wohnort"]["strasse"];

$p2 = [];
$p2["vorname"] = "Hanna";
$p2["nachname"] = "Hurtig";
$p2["geburtsdatum"] = "1985-11-11";
$p2["wohnort"]["strasse"] = "Am Kai";
// ...

$paar = ["mann" => $p, "frau" => $p2];
echo "Herr und Frau ".$paar["mann"]["nachname"]."/ ".$paar["frau"]["nachname"];`

export const ASSO_ARRAY_TS_SOURCE = `type Wohnort = {
  strasse: string
  hausnr: string
  plz: string
  ort: string
}

type Person = {
  vorname: string
  nachname: string
  wohnort: Wohnort
  geburtsdatum: string
}

const p: Person = {
  vorname: 'Max',
  nachname: 'Mustermann',
  wohnort: {
    strasse: 'Berliner Str.',
    hausnr: '13',
    plz: '10117',
    ort: 'Berlin',
  },
  geburtsdatum: '1980-10-25',
}

console.log(p)
console.log('Wohnort > Strasse:', p.wohnort.strasse)

const p2: Person = {
  vorname: 'Hanna',
  nachname: 'Hurtig',
  geburtsdatum: '1985-11-11',
  wohnort: {
    strasse: 'Am Kai',
    hausnr: '12A',
    plz: '12345',
    ort: 'Staaten',
  },
}

const paar = { mann: p, frau: p2 }
console.log(\`Herr und Frau \${paar.mann.nachname}/ \${paar.frau.nachname}\`)`

export function runAssoArrayDemo() {
  const p: Person = {
    vorname: 'Max',
    nachname: 'Mustermann',
    wohnort: {
      strasse: 'Berliner Str.',
      hausnr: '13',
      plz: '10117',
      ort: 'Berlin',
    },
    geburtsdatum: '1980-10-25',
  }

  const p2: Person = {
    vorname: 'Hanna',
    nachname: 'Hurtig',
    geburtsdatum: '1985-11-11',
    wohnort: {
      strasse: 'Am Kai',
      hausnr: '12A',
      plz: '12345',
      ort: 'Staaten',
    },
  }

  const paar = { mann: p, frau: p2 }

  return {
    sections: [
      {
        dump: formatPhpStyleDump(p),
        highlight: `Wohnort → Strasse: ${p.wohnort.strasse}`,
      },
      {
        dump: formatPhpStyleDump(p2),
        highlight: `Wohnort → Strasse: ${p2.wohnort.strasse}`,
      },
      {
        dump: formatPhpStyleDump(paar),
        highlight: `Herr und Frau ${paar.mann.nachname}/ ${paar.frau.nachname}`,
      },
    ],
  }
}
