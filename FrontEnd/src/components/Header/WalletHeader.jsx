import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
const WalletHeader = () => {
    return (
        <>
            <div className='h-screen bg-gray-200 flex justify-center'>
                <div className="w-full h-[62px] text-center">
                    <div className="w-full h-full-">
                        <div className="w-full h-[62px] bg-white shadow">
                            <div className="mx-52 h-[62px] flex ">
                                <div className="w-fit flex content-center">
                                    <FontAwesomeIcon className='mt-6 mr-8 cursor-pointer' icon={faArrowLeft} size="lg" style={{color: "#595959",}} />
                                    <p className='w-fit h-fit text-xl mt-5 font-medium font-roboto'>My Wallets</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WalletHeader;
