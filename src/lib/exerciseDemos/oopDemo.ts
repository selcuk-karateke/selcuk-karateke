export class Wohnort {
  constructor(
    private strasse = '',
    private hausnr = '',
    private plz = '',
    private ort = '',
  ) {}

  getStrasse() {
    return this.strasse
  }

  getHausnr() {
    return this.hausnr
  }

  getPLZ() {
    return this.plz
  }

  getOrt() {
    return this.ort
  }

  toString() {
    return `Wohnort: ${this.strasse} ${this.hausnr}, ${this.plz} ${this.ort}`
  }
}

export class Person {
  private wohnort: Wohnort | null = null

  constructor(
    private vorname = '',
    private nachname = '',
    private geburtsdatum = '',
  ) {}

  getVorname() {
    return this.vorname
  }

  /** Original PHP-Tippfehler getNachame() bleibt im Legacy — hier korrektes getNachname(). */
  getNachname() {
    return this.nachname
  }

  getGeburtsdatum() {
    return this.geburtsdatum
  }

  getWohnort() {
    return this.wohnort
  }

  setWohnort(wo: Wohnort) {
    this.wohnort = wo
  }

  toString() {
    const w = this.wohnort ? String(this.wohnort) : ''
    return `${this.vorname} ${this.nachname}, geboren am: ${this.geburtsdatum}, ${w}`
  }
}

export const OOP_PHP_SOURCE = `class Person {
  private $vorname, $nachname, $geburtsdatum;
  private $wohnort = null;

  public function __construct($vn, $nn, $gebdat) { ... }
  public function getVorname() { return $this->vorname; }
  public function setWohnort(Wohnort $wo) { $this->wohnort = $wo; }
}

$person = new Person($vorname, $nachname, $geburtsdatum);
$wohnort = new Wohnort($strasse, $hausnr, $plz, $ort);
$person->setWohnort($wohnort);`

export const OOP_TS_SOURCE = `class Wohnort {
  constructor(
    private strasse = '',
    private hausnr = '',
    private plz = '',
    private ort = '',
  ) {}

  getStrasse() { return this.strasse }
  toString() { return \`Wohnort: \${this.strasse} ...\` }
}

class Person {
  private wohnort: Wohnort | null = null

  constructor(
    private vorname = '',
    private nachname = '',
    private geburtsdatum = '',
  ) {}

  setWohnort(wo: Wohnort) { this.wohnort = wo }
  getVorname() { return this.vorname }
  getNachname() { return this.nachname }
}

const person = new Person(vorname, nachname, geburtsdatum)
person.setWohnort(new Wohnort(strasse, hausnr, plz, ort))`

export type OopFormData = {
  vorname: string
  nachname: string
  geburtsdatum: string
  strasse: string
  hausnr: string
  plz: string
  ort: string
}

export function buildPersonFromForm(data: OopFormData) {
  const person = new Person(data.vorname, data.nachname, data.geburtsdatum)
  person.setWohnort(new Wohnort(data.strasse, data.hausnr, data.plz, data.ort))
  return person
}

export function formatOopOutput(person: Person) {
  const w = person.getWohnort()
  return [
    `Vorname: ${person.getVorname()}`,
    `Nachname: ${person.getNachname()}`,
    `Geburtsdatum: ${person.getGeburtsdatum()}`,
    `Strasse: ${w?.getStrasse() ?? ''}`,
    `Hausnr: ${w?.getHausnr() ?? ''}`,
    `PLZ: ${w?.getPLZ() ?? ''}`,
    `Ort: ${w?.getOrt() ?? ''}`,
    '',
    person.toString(),
  ].join('\n')
}
