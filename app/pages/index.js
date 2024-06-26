'use client';

import React, { useState, useEffect, useCallback } from 'react';

import apiService from '../services/ApiService';
import AssetsTable from '../components/AssetsTable';
import SecuredAssetsTable from '../components/SecuredAssetsTable';
import Footer from '../components/Footer';
import Image from "next/image";
import WalletConnector from '../components/WalletConnector';

const WALLET_STORAGE_KEY = "wallet";
const PROVIDER_STORAGE_KEY = "provider";

const HomePage = () => {
    const [provider, setProvider] = useState(null);
    const [wallet, setWallet] = useState(null);
    const [assets, setAssets] = useState([]);
    const [securedAssets, setSecuredAssets] = useState([]);

    // const storagedWallet = localStorage.getItem(WALLET_STORAGE_KEY);
    // const storagedProvider = localStorage.getItem(PROVIDER_STORAGE_KEY);
    // if (storagedWallet && storagedProvider) {
    //     setProvider(provider);
    //     setWallet(wallet);
    // }

    const fetchAssets = useCallback(async () => {
        if (wallet) {
            try {
                const response = await apiService.getAssets();
                // console.log(response);
                setAssets(response.data);
            } catch (err) {
                console.error("Failed to fetch assets", err);
            }
        }
    }, [wallet]);

    const fetchSecuredAssets = useCallback(async () => {
        if (wallet) {
            try {
                const response = await apiService.getAssetsByWallet(wallet);
                // console.log(response);
                setSecuredAssets(response.data);
            } catch (err) {
                console.error("Failed to fetch secured assets", err);
            }
        }
    }, [wallet]);

    useEffect(() => {
        fetchAssets();
        fetchSecuredAssets();
    }, [fetchAssets, fetchSecuredAssets]);

    const handleWalletConnect = (provider, wallet) => {
        setProvider(provider);
        setWallet(wallet);
        // localStorage.setItem(WALLET_STORAGE_KEY, wallet);
        // localStorage.setItem(PROVIDER_STORAGE_KEY, provider);
    };

    const handleWalletDisconnect = () => {
        setProvider(null);
        setWallet(null);
        setSecuredAssets([]);
        // localStorage.setItem(WALLET_STORAGE_KEY, null);
        // localStorage.setItem(PROVIDER_STORAGE_KEY, null);
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <WalletConnector onConnect={handleWalletConnect} onDisconnect={handleWalletDisconnect} />
                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
                    <a
                        className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            className="dark:invert"
                            width={100}
                            height={24}
                            priority
                        />
                    </a>
                </div>
            </div>
            <br />
            <br />
            <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
                {wallet && <AssetsTable data={assets} />}
            </div>
            <br />
            <br />
            <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
                {wallet && <SecuredAssetsTable data={securedAssets} />}
            </div>
            <br />
            <br />
            <Footer />
        </main>
    );
};

export default HomePage;
