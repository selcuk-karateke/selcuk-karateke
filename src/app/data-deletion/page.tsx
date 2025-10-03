export default function DataDeletion() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Anleitung zur Datenlöschung</h1>

                    <div className="prose prose-lg max-w-none">
                        <div className="mb-8">
                            <p className="text-gray-600">
                                Sie haben das Recht, die Löschung Ihrer personenbezogenen Daten zu verlangen.
                                Diese Seite erklärt, wie Sie Ihre Daten von unserer Website löschen können.
                            </p>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Welche Daten werden gespeichert?</h2>

                        <div className="mb-8">
                            <p className="text-gray-600 mb-4">
                                Wir speichern folgende personenbezogene Daten:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 ml-4">
                                <li>Kontaktformular-Daten (Name, E-Mail, Nachricht)</li>
                                <li>Blog-Kommentare (Name, E-Mail, Kommentar)</li>
                                <li>Server-Log-Dateien (IP-Adresse, Browser-Informationen)</li>
                                <li>Session-Daten (bei Anmeldung)</li>
                            </ul>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Wie können Sie Ihre Daten löschen?</h2>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">Option 1: Kontaktformular</h3>
                            <p className="text-gray-600 mb-4">
                                Senden Sie uns eine E-Mail an <strong>selcuk.karateke@live.de</strong> mit dem Betreff
                                &quot;Datenlöschung&quot; und folgenden Informationen:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 ml-4 mb-4">
                                <li>Ihren vollständigen Namen</li>
                                <li>Die E-Mail-Adresse, die Sie bei uns verwendet haben</li>
                                <li>Welche Daten Sie löschen möchten</li>
                            </ul>
                            <p className="text-gray-600">
                                Wir werden Ihre Anfrage innerhalb von 30 Tagen bearbeiten und Ihnen eine
                                Bestätigung der Löschung zusenden.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">Option 2: Telefonisch</h3>
                            <p className="text-gray-600">
                                Rufen Sie uns unter <strong>030 12074996</strong> an und teilen Sie uns mit,
                                dass Sie Ihre Daten löschen möchten. Wir werden Ihre Anfrage bearbeiten
                                und Ihnen eine schriftliche Bestätigung per E-Mail zusenden.
                            </p>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Was passiert nach der Löschung?</h2>

                        <div className="mb-8">
                            <ul className="list-disc list-inside text-gray-600 ml-4">
                                <li>Alle Ihre personenbezogenen Daten werden dauerhaft gelöscht</li>
                                <li>Sie erhalten eine Bestätigung der Löschung per E-Mail</li>
                                <li>Backup-Kopien werden innerhalb von 30 Tagen gelöscht</li>
                                <li>Anonymisierte Daten können für statistische Zwecke erhalten bleiben</li>
                            </ul>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Ausnahmen</h2>

                        <div className="mb-8">
                            <p className="text-gray-600 mb-4">
                                In folgenden Fällen können wir Ihre Daten nicht sofort löschen:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 ml-4">
                                <li>Wenn gesetzliche Aufbewahrungsfristen bestehen</li>
                                <li>Wenn die Daten für die Erfüllung eines Vertrags erforderlich sind</li>
                                <li>Wenn berechtigte Interessen an der Speicherung bestehen</li>
                            </ul>
                            <p className="text-gray-600 mt-4">
                                In solchen Fällen informieren wir Sie über die Gründe und die
                                voraussichtliche Dauer der Speicherung.
                            </p>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Kontakt</h2>

                        <div className="mb-8">
                            <p className="text-gray-600">
                                Bei Fragen zur Datenlöschung können Sie uns jederzeit kontaktieren:
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg mt-4">
                                <p className="text-gray-700">
                                    <strong>Selçuk Karateke</strong><br />
                                    Möckernstraße 115<br />
                                    10963 Berlin<br />
                                    Deutschland<br />
                                    E-Mail: selcuk.karateke@live.de<br />
                                    Telefon: 030 12074996
                                </p>
                            </div>
                        </div>

                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-8">
                            <p className="text-blue-800">
                                <strong>Stand dieser Anleitung:</strong> Januar 2024<br />
                                <strong>Letzte Aktualisierung:</strong> {new Date().toLocaleDateString('de-DE')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
