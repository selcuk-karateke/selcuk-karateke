import Breadcrumb from '@/components/Breadcrumb'

export default function DataDeletion() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumb />
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Data Deletion Instructions</h1>

                    <div className="prose prose-lg max-w-none">
                        <div className="mb-8">
                            <p className="text-gray-600">
                                You have the right to request the deletion of your personal data.
                                This page explains how you can delete your data from our website.
                            </p>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. What Data is Stored?</h2>

                        <div className="mb-8">
                            <p className="text-gray-600 mb-4">
                                We store the following personal data:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 ml-4">
                                <li>Contact form data (name, email, message)</li>
                                <li>Blog comments (name, email, comment)</li>
                                <li>Server log files (IP address, browser information)</li>
                                <li>Session data (when logged in)</li>
                            </ul>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How Can You Delete Your Data?</h2>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">Option 1: Contact Form</h3>
                            <p className="text-gray-600 mb-4">
                                Send us an email to <strong>selcuk.karateke@live.de</strong> with the subject
                                &quot;Data Deletion&quot; and the following information:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 ml-4 mb-4">
                                <li>Your full name</li>
                                <li>The email address you used with us</li>
                                <li>Which data you want to delete</li>
                            </ul>
                            <p className="text-gray-600">
                                We will process your request within 30 days and send you a
                                confirmation of deletion.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">Option 2: By Phone</h3>
                            <p className="text-gray-600">
                                Call us at <strong>030 12074996</strong> and let us know that
                                you want to delete your data. We will process your request
                                and send you a written confirmation by email.
                            </p>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. What Happens After Deletion?</h2>

                        <div className="mb-8">
                            <ul className="list-disc list-inside text-gray-600 ml-4">
                                <li>All your personal data will be permanently deleted</li>
                                <li>You will receive a confirmation of deletion by email</li>
                                <li>Backup copies will be deleted within 30 days</li>
                                <li>Anonymized data may be retained for statistical purposes</li>
                            </ul>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Exceptions</h2>

                        <div className="mb-8">
                            <p className="text-gray-600 mb-4">
                                In the following cases, we cannot delete your data immediately:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 ml-4">
                                <li>If legal retention periods exist</li>
                                <li>If the data is required for the fulfillment of a contract</li>
                                <li>If legitimate interests in storage exist</li>
                            </ul>
                            <p className="text-gray-600 mt-4">
                                In such cases, we will inform you about the reasons and the
                                expected duration of storage.
                            </p>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Contact</h2>

                        <div className="mb-8">
                            <p className="text-gray-600">
                                If you have questions about data deletion, you can contact us at any time:
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg mt-4">
                                <p className="text-gray-700">
                                    <strong>Selçuk Karateke</strong><br />
                                    Möckernstraße 115<br />
                                    10963 Berlin<br />
                                    Germany<br />
                                    Email: selcuk.karateke@live.de<br />
                                    Phone: 030 12074996
                                </p>
                            </div>
                        </div>

                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-8">
                            <p className="text-blue-800">
                                <strong>Status of this guide:</strong> January 2024<br />
                                <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
