'use client'

import type { ExerciseCatalogItem } from '@/data/exerciseCatalog'
import {
  AssoArrayExercise,
  BooksFormExercise,
  BooksTableExercise,
  ElementeanzahlExercise,
  FarbcodeExercise,
  FileUploadExercise,
  GalleryExercise,
  GetPostExercise,
  JsonUebungenExercise,
  MenueExercise,
  MultiplikationFunctionExercise,
  MultiplikationTableExercise,
  NettoBruttoExercise,
  NewsAdminExercise,
  NutzerprofilExercise,
  ObstgemueseExercise,
  PlaceholderExercise,
  PomodoroExercise,
  PdotestExercise,
  RegistrationFormExercise,
  OopExercise,
  EraseExercise,
  TestentityExercise,
  MultiFileUploadExercise,
  Exer18ProfileExercise,
  ServerInfoExercise,
} from '@/components/exercises/builtins'

export default function ExerciseRunner({ meta }: { meta: ExerciseCatalogItem }) {
  const { slug } = meta

  switch (slug) {
    case 'index':
      return <PomodoroExercise />
    case 'netto-brutto':
      return <NettoBruttoExercise />
    case 'menue':
      return <MenueExercise />
    case 'multiplikationsfunktion':
      return <MultiplikationFunctionExercise />
    case 'multiplikation-umleitung':
      return <MultiplikationTableExercise defaultBis={12} />
    case 'multiplikation':
    case 'multiplikationstabelle-ow':
      return <MultiplikationTableExercise />
    case 'asso-array':
      return <AssoArrayExercise />
    case 'elementeanzahl':
      return <ElementeanzahlExercise />
    case 'oop':
      return <OopExercise />
    case 'erase':
      return <EraseExercise />
    case 'testentity':
      return <TestentityExercise />
    case 'farbcode':
      return <FarbcodeExercise step={51} title={meta.title} />
    case 'fileupload':
      return <FileUploadExercise />
    case 'getpostrequest':
      return <GetPostExercise title={meta.title} />
    case 'nutzerprofil':
      return <NutzerprofilExercise />
    case 'obstgemuese':
      return <ObstgemueseExercise title={meta.title} />
    case 'obstgemuese-abfr':
      return <ObstgemueseExercise abfr title={meta.title} />
    case 'phpinfo':
      return <ServerInfoExercise variant="phpinfo" title={meta.title} />
    case 'server':
      return <ServerInfoExercise variant="server" title={meta.title} />
    case 'buecheranzeige':
      return <BooksTableExercise />
    case 'buechererfassung':
      return <BooksFormExercise />
    case 'pdotest':
      return <PdotestExercise />
    case 'galerie':
      return <GalleryExercise mode="view" />
    case 'galerie-upload':
      return <GalleryExercise mode="upload" />
    case 'galerie-sql':
      return <GalleryExercise mode="setup" />
    case 'galerie-reset':
      return <GalleryExercise mode="reset" />
    case 'news-test':
      return <NewsAdminExercise page="test" />
    case 'news-newdb':
      return <NewsAdminExercise page="newdb" />
    case 'news-sql':
      return <NewsAdminExercise page="sql" />
    case 'news-kategorien':
      return <NewsAdminExercise page="kategorien" />
    case 'news-ereignisse':
      return <NewsAdminExercise page="ereignisse" />
    case 'news-bilder':
      return <NewsAdminExercise page="bilder" />
    case 'json-uebungen':
      return <JsonUebungenExercise />
    case 'exer-11':
      return <RegistrationFormExercise />
    case 'exer-12':
      return <FarbcodeExercise step={32} title={meta.title} />
    case 'exer-13':
      return <ServerInfoExercise variant="exer-13" title={meta.title} />
    case 'exer-14':
      return <ServerInfoExercise variant="phpinfo" title={meta.title} />
    case 'exer-15':
      return <ObstgemueseExercise title={meta.title} />
    case 'exer-16':
      return <MultiFileUploadExercise />
    case 'exer-17':
      return <GetPostExercise title={meta.title} />
    case 'exer-18':
      return <Exer18ProfileExercise />
    default:
      return null
  }
}
