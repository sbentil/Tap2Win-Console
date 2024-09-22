"use client";

import React, { useState } from "react";

import { Button } from "@/components/core";
import NoRecordsFound from "@/components/empty";
import Table from "../../tables/admin/tokens";
import useTokens from "@/hooks/useTokens";

const UseOrganizerTokens = ({ event }: { event: string }) => {
    // State for handling pagination
    const [page, setPage] = useState(1);
    const limit = 10;

    // Fetch events using the useEvents hook
    const { data, isLoading, error, refetch } = useTokens({ page, limit, event });

    const tokens = data?.data || [];
    const totalCount = data?.meta.totalCount || 0;

    const paginationHandler = (action: "first" | "last" | "next" | "prev") => {
        const totalPages = Math.ceil(totalCount / limit);

        switch (action) {
            case "first":
                setPage(1);
                break;
            case "last":
                setPage(totalPages);
                break;
            case "next":
                if (page < totalPages) {
                    setPage(page + 1);
                }
                break;
            case "prev":
                if (page > 1) {
                    setPage(page - 1);
                }
                break;
        }
    };

    if (isLoading) {
        return <div>Loading tokens...</div>;
    }

    if (error) {
        return <div>Error loading tokens: {error.message}
            <pre>{JSON.stringify(error, null, 2)}</pre>
            {/* retry text */}
            <Button onClick={() => refetch()} className="">Retry</Button>
        </div>;
    }

    return (
        <div className="min-h-[92vh] p-4 w-full">
            {tokens.length === 0 ? (
                <div className="flex h-screen flex-col items-center justify-center p-4">
                    <NoRecordsFound entity="Tokens" />
                </div>
            ) : (
                <Table
                    data={tokens}
                    metadata={{
                        page,
                        totalCount,
                        isFetching: isLoading,
                    }}
                    onFirst={() => paginationHandler("first")}
                    onPrev={() => paginationHandler("prev")}
                    onNext={() => paginationHandler("next")}
                    onLast={() => paginationHandler("last")}
                />
            )}
            {

            }
        </div>
    );
};

export default UseOrganizerTokens;
