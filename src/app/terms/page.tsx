import Breadcrumb from '@/components/Breadcrumb'

export default function Terms() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumb />
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>

                    <div className="prose prose-lg max-w-none">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">§ 1 Scope of Application</h2>

                        <div className="mb-8">
                            <p className="text-gray-600">
                                These Terms and Conditions apply to all services and products provided by
                                Selçuk Karateke, Möckernstraße 115, 10963 Berlin (hereinafter referred to as
                                &quot;Provider&quot; or &quot;we&quot;).
                            </p>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">§ 2 Service Offerings</h2>

                        <div className="mb-8">
                            <p className="text-gray-600 mb-4">
                                The provider offers the following services:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 ml-4">
                                <li>Software development and programming</li>
                                <li>Web development and web design</li>
                                <li>Network administration and IT support</li>
                                <li>Information technology consulting</li>
                                <li>Training and further education</li>
                            </ul>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">§ 3 Contract Formation</h2>

                        <div className="mb-8">
                            <p className="text-gray-600">
                                Contracts are formed through written offers and their acceptance or through
                                order confirmation. Oral side agreements require written confirmation.
                            </p>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">§ 4 Service Provision</h2>

                        <div className="mb-8">
                            <p className="text-gray-600 mb-4">
                                <strong>4.1 Scope of Services</strong><br />
                                The scope of services results from the respective order confirmation or
                                the written offer.
                            </p>
                            <p className="text-gray-600 mb-4">
                                <strong>4.2 Cooperation Obligations</strong><br />
                                The client undertakes to provide all information and documents required
                                for service provision completely and in a timely manner.
                            </p>
                            <p className="text-gray-600">
                                <strong>4.3 Changes</strong><br />
                                Changes to the scope of services require written agreement.
                            </p>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">§ 5 Remuneration and Payment</h2>

                        <div className="mb-8">
                            <p className="text-gray-600 mb-4">
                                <strong>5.1 Remuneration</strong><br />
                                The remuneration is based on the respective agreement or offer.
                            </p>
                            <p className="text-gray-600 mb-4">
                                <strong>5.2 Payment Terms</strong><br />
                                Invoices are due within 14 days of invoicing without deduction,
                                unless otherwise agreed.
                            </p>
                            <p className="text-gray-600">
                                <strong>5.3 Default</strong><br />
                                In case of payment default, we reserve the right to suspend service
                                provision or terminate the contract.
                            </p>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">§ 6 Warranty</h2>

                        <div className="mb-8">
                            <p className="text-gray-600">
                                The statutory warranty provisions apply to the services provided.
                                Warranty claims only exist with proper use of the delivered services.
                            </p>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">§ 7 Liability</h2>

                        <div className="mb-8">
                            <p className="text-gray-600 mb-4">
                                <strong>7.1 Limitation of Liability</strong><br />
                                We are only liable for intent and gross negligence, unless mandatory
                                legal liability provisions oppose this.
                            </p>
                            <p className="text-gray-600">
                                <strong>7.2 Damages</strong><br />
                                Damages are limited to foreseeable, contract-typical damage.
                            </p>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">§ 8 Data Protection</h2>

                        <div className="mb-8">
                            <p className="text-gray-600">
                                The processing of personal data is carried out in accordance with applicable
                                data protection laws and our privacy policy.
                            </p>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">§ 9 Final Provisions</h2>

                        <div className="mb-8">
                            <p className="text-gray-600 mb-4">
                                <strong>9.1 Applicable Law</strong><br />
                                German law applies, excluding the UN Convention on Contracts for the International Sale of Goods.
                            </p>
                            <p className="text-gray-600 mb-4">
                                <strong>9.2 Jurisdiction</strong><br />
                                The place of jurisdiction is Berlin, insofar as the client is a merchant.
                            </p>
                            <p className="text-gray-600">
                                <strong>9.3 Severability Clause</strong><br />
                                Should individual provisions of these Terms and Conditions be invalid, the
                                validity of the remaining provisions remains unaffected.
                            </p>
                        </div>

                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-8">
                            <p className="text-blue-800">
                                <strong>Status of these Terms and Conditions:</strong> January 2024<br />
                                <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
