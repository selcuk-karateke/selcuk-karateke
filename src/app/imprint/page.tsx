import Breadcrumb from '@/components/Breadcrumb'

export default function Imprint() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumb />
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Imprint</h1>

                    <div className="prose prose-lg max-w-none">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information according to § 5 TMG</h2>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">Contact</h3>
                            <p className="text-gray-600 mb-2">
                                <strong>Selçuk Karateke</strong><br />
                                Möckernstraße 115<br />
                                10963 Berlin<br />
                                Germany
                            </p>

                            <p className="text-gray-600 mb-2">
                                <strong>Contact:</strong><br />
                                Telefon: 030 12074996<br />
                                Mobil: 0177 4616695<br />
                                Email: selcuk.karateke@live.de<br />
                                Website: www.sellskitchen.de
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">Professional Title</h3>
                            <p className="text-gray-600">
                                IT Specialist for Application Development<br />
                                Awarded in: Germany
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">VAT ID</h3>
                            <p className="text-gray-600">
                                Value Added Tax Identification Number according to § 27 a Value Added Tax Act:<br />
                                Small business regulation according to § 19 UStG
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">Responsible for Content according to § 55 Abs. 2 RStV</h3>
                            <p className="text-gray-600">
                                Selçuk Karateke<br />
                                Möckernstraße 115<br />
                                10963 Berlin
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">EU Dispute Resolution</h3>
                            <p className="text-gray-600">
                                The European Commission provides a platform for online dispute resolution (OS):
                                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                    https://ec.europa.eu/consumers/odr/
                                </a><br />
                                You can find our email address above in the imprint.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">Consumer Dispute Resolution/Universal Arbitration Board</h3>
                            <p className="text-gray-600">
                                We are not willing or obligated to participate in dispute resolution procedures
                                before a consumer arbitration board.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">Liability for Content</h3>
                            <p className="text-gray-600">
                                As a service provider, we are responsible for our own content on these pages
                                according to general laws in accordance with § 7 para. 1 TMG. According to §§ 8 to 10 TMG,
                                we are not obliged as a service provider to monitor transmitted or stored third-party
                                information or to investigate circumstances that indicate illegal activity.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">Liability for Links</h3>
                            <p className="text-gray-600">
                                Our offer contains links to external websites of third parties, on whose content we
                                have no influence. Therefore, we cannot assume any liability for these external contents.
                                The respective provider or operator of the pages is always responsible for the content
                                of the linked pages.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">Copyright</h3>
                            <p className="text-gray-600">
                                The content and works created by the site operators on these pages are subject to
                                German copyright law. The reproduction, editing, distribution and any kind of
                                exploitation outside the limits of copyright require the written consent of the
                                respective author or creator.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
