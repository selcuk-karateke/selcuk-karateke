import Breadcrumb from '@/components/Breadcrumb'

export default function Privacy() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumb />
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

                    <div className="prose prose-lg max-w-none">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Privacy at a Glance</h2>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">General Information</h3>
                            <p className="text-gray-600">
                                The following information provides a simple overview of what happens to your
                                personal data when you visit this website. Personal data is any data with which
                                you can be personally identified. Detailed information on the subject of data
                                protection can be found in our privacy policy listed below this text.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">Data Collection on this Website</h3>
                            <p className="text-gray-600 mb-4">
                                <strong>Who is responsible for data collection on this website?</strong><br />
                                Data processing on this website is carried out by the website operator.
                                You can find their contact details in the section &quot;Information on the responsible party&quot;
                                in this privacy policy.
                            </p>
                            <p className="text-gray-600">
                                <strong>How do we collect your data?</strong><br />
                                Your data is collected in part by you providing it to us. This can be, for example,
                                data that you enter in a contact form.
                            </p>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Hosting</h2>

                        <div className="mb-8">
                            <p className="text-gray-600">
                                We host the content of our website with the following provider:
                            </p>
                            <p className="text-gray-600 mt-4">
                                <strong>Vercel Inc.</strong><br />
                                340 S Lemon Ave #4133<br />
                                Walnut, CA 91789<br />
                                USA
                            </p>
                            <p className="text-gray-600 mt-4">
                                The collection and processing of your data takes place exclusively in Germany
                                and is subject to strict German data protection laws.
                            </p>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. General Information and Mandatory Information</h2>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">Data Protection</h3>
                            <p className="text-gray-600">
                                The operators of these pages take the protection of your personal data very seriously.
                                We treat your personal data confidentially and in accordance with the statutory
                                data protection regulations and this privacy policy.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">Information on the Responsible Party</h3>
                            <p className="text-gray-600">
                                The party responsible for processing data on this website is:
                            </p>
                            <p className="text-gray-600 mt-4">
                                <strong>Selçuk Karateke</strong><br />
                                Möckernstraße 115<br />
                                10963 Berlin<br />
                                Germany<br />
                                Email: selcuk.karateke@live.de<br />
                                Phone: 030 12074996
                            </p>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Collection on this Website</h2>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">Contact Form</h3>
                            <p className="text-gray-600">
                                If you send us inquiries via the contact form, your details from the inquiry form,
                                including the contact data you provided there, will be stored by us for the purpose
                                of processing the inquiry and in case of follow-up questions. We do not pass on this
                                data without your consent.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">Server Log Files</h3>
                            <p className="text-gray-600">
                                The provider of the pages automatically collects and stores information in so-called
                                server log files, which your browser automatically transmits to us. These are:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 mt-4 ml-4">
                                <li>Browser type and browser version</li>
                                <li>Operating system used</li>
                                <li>Referrer URL</li>
                                <li>Hostname of the accessing computer</li>
                                <li>Time of the server request</li>
                                <li>IP address</li>
                            </ul>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Plugins and Tools</h2>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">Google Fonts (Local Hosting)</h3>
                            <p className="text-gray-600">
                                This site uses so-called Google Fonts for the uniform display of fonts, which are
                                provided by Google. The Google Fonts are installed locally. A connection to Google
                                servers does not take place.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">Facebook/Meta Integration</h3>
                            <p className="text-gray-600 mb-4">
                                This website can be integrated with Facebook/Meta services. When using this
                                integration, the following data is processed:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 ml-4 mb-4">
                                <li>Facebook App ID and Secret for authentication</li>
                                <li>User data during Facebook login (name, email, profile picture)</li>
                                <li>Session data for login</li>
                            </ul>
                            <p className="text-gray-600 mb-4">
                                <strong>Purpose of processing:</strong> Provision of login functionality and
                                integration with Facebook services.
                            </p>
                            <p className="text-gray-600 mb-4">
                                <strong>Legal basis:</strong> Consent according to Art. 6 para. 1 lit. a GDPR.
                            </p>
                            <p className="text-gray-600">
                                <strong>Data deletion:</strong> You can have your data deleted at any time.
                                Further information can be found on our
                                <a href="/data-deletion" className="text-blue-600 hover:text-blue-800 underline">data deletion</a> page.
                            </p>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Rights</h2>

                        <div className="mb-8">
                            <p className="text-gray-600 mb-4">
                                You have the following rights regarding your personal data:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 ml-4">
                                <li>Right to information about the data we process</li>
                                <li>Right to rectification of incorrect data</li>
                                <li>Right to deletion of your data</li>
                                <li>Right to restriction of processing</li>
                                <li>Right to data portability</li>
                                <li>Right to object to processing</li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-8">
                            <p className="text-blue-800">
                                <strong>Status of this privacy policy:</strong> January 2024<br />
                                <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
