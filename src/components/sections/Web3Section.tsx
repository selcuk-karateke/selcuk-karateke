'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance } from 'wagmi'
import { useState } from 'react'

export default function Web3Section() {
    const { address, isConnected } = useAccount()
    const { data: balance } = useBalance({
        address: address,
    })
    const [walletAddress, setWalletAddress] = useState('')

    const handleVerifyWallet = async () => {
        if (!walletAddress) return

        try {
            const response = await fetch('/api/wallet/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ address: walletAddress }),
            })

            if (response.ok) {
                alert('Wallet erfolgreich verifiziert!')
            } else {
                alert('Fehler bei der Verifizierung')
            }
        } catch (error) {
            console.error('Error:', error)
            alert('Fehler bei der Verifizierung')
        }
    }

    return (
        <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Web3 & Blockchain
                    </h2>
                    <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                        Entdecken Sie meine Blockchain-Projekte und Web3-Integrationen
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Wallet Connection */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8">
                        <h3 className="text-2xl font-bold mb-6">Wallet-Verbindung</h3>
                        <div className="space-y-6">
                            <div className="flex justify-center">
                                <ConnectButton />
                            </div>

                            {isConnected && (
                                <div className="bg-white/5 rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">Wallet-Informationen</h4>
                                    <p className="text-sm text-blue-200 mb-2">
                                        <strong>Adresse:</strong> {address?.slice(0, 6)}...{address?.slice(-4)}
                                    </p>
                                    {balance && (
                                        <p className="text-sm text-blue-200">
                                            <strong>Balance:</strong> {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Wallet Verification */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8">
                        <h3 className="text-2xl font-bold mb-6">Wallet-Verifizierung</h3>
                        <div className="space-y-4">
                            <p className="text-blue-200">
                                Verifizieren Sie Ihre Wallet-Adresse für zusätzliche Funktionen:
                            </p>

                            <div>
                                <label htmlFor="wallet-address" className="block text-sm font-medium mb-2">
                                    Wallet-Adresse
                                </label>
                                <input
                                    type="text"
                                    id="wallet-address"
                                    value={walletAddress}
                                    onChange={(e) => setWalletAddress(e.target.value)}
                                    placeholder="0x..."
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <button
                                onClick={handleVerifyWallet}
                                disabled={!walletAddress}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                            >
                                Wallet verifizieren
                            </button>
                        </div>
                    </div>
                </div>

                {/* Blockchain Projects */}
                <div className="mt-16">
                    <h3 className="text-3xl font-bold text-center mb-12">Blockchain-Projekte</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                            <h4 className="text-xl font-bold mb-4">Smart Contract Development</h4>
                            <p className="text-blue-200 mb-4">
                                Entwicklung von Smart Contracts für Ethereum und andere EVM-kompatible Blockchains.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">Solidity</span>
                                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">Web3.js</span>
                                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">Ethers.js</span>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                            <h4 className="text-xl font-bold mb-4">DeFi Integration</h4>
                            <p className="text-blue-200 mb-4">
                                Integration von DeFi-Protokollen und Entwicklung von Yield-Farming-Lösungen.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">Uniswap</span>
                                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">Compound</span>
                                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">Aave</span>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                            <h4 className="text-xl font-bold mb-4">NFT Marketplace</h4>
                            <p className="text-blue-200 mb-4">
                                Entwicklung von NFT-Marktplätzen und NFT-Minting-Plattformen.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">OpenSea API</span>
                                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">IPFS</span>
                                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">Metamask</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Blockchain Stats */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-300 mb-2">5+</div>
                        <div className="text-blue-200">Smart Contracts</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-green-300 mb-2">3</div>
                        <div className="text-blue-200">DeFi Projekte</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-purple-300 mb-2">2</div>
                        <div className="text-blue-200">NFT Projekte</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-yellow-300 mb-2">100%</div>
                        <div className="text-blue-200">Audit Ready</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
