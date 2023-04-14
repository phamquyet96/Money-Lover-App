import React from 'react';
import WalletHeader from "../Header/WalletHeader";
import MyWalletDetail from "./MyWalletDetail";

const MyWallet = () => {
    return (
        <>
            <div className='h-screen bg-gray-300 justify-center'>
                    <WalletHeader/>
                    <MyWalletDetail/>
            </div>
        </>
    );
};

export default MyWallet;
