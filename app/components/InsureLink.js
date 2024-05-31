import React from 'react';
import Link from 'next/link'

const InsureLink = ({ data }) => {
    const isAssetEnabled = (data.total_supply > data.remaining_supply) && (data.active == true);

    return (
        <>
            {
                isAssetEnabled ? (
                    <Link
                        href="/insure/[id]"
                        as={`insure/${data.id}`}
                    >
                        <svg className="w-3.5 h-3.5 me-3 font-medium text-blue-600 dark:text-blue-500 hover:underline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                        </svg>
                    </Link>
                ) : (
                    <p>Inactive</p>
                )
            }
        </>
    );
};

export default InsureLink;
