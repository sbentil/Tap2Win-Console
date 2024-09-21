"use client";

import ActionButton from "@/components/table/action";
import { Button } from "@/components/core";
import { Columns } from "./columns";
import { CreateEventModal } from "@/components/modals";
import { IToken } from "@/interfaces/token";
import { TableComponent } from "@/components/table";
import ViewModal from "./view";
import { objToStr } from "@/helpers/object";
import toasts from "@/utils/toasts";
import { useState } from "react";

interface Props {
  data: IToken[];
  metadata: {
    page: number;
    totalCount: number;
    isFetching: boolean;
  };
  onNext: () => void;
  onPrev: () => void;
  onFirst: () => void;
  onLast: () => void;
}

const Table: React.FC<Props> = ({
  data,
}) => {
  const [viewItem, setViewItem] = useState<boolean>(false);
  const [selected, setSelected] = useState<IToken | null>(null);
  const [metadata, setMetadata] = useState({
    page: 1,
    totalCount: data.length,
    isFetching: false,
  });

  const onSelect = (item: any) => {
    setSelected(item);
    setViewItem(true);
  };


  const paginationHandler = (action: "first" | "last" | "next" | "prev") => {
    const totalPages = Math.ceil(metadata.totalCount / 10); // Assuming 10 items per page

    switch (action) {
      case "first":
        setMetadata({ ...metadata, page: 1 });
        break;
      case "last":
        setMetadata({ ...metadata, page: totalPages });
        break;
      case "next":
        if (metadata.page < totalPages) {
          setMetadata({ ...metadata, page: metadata.page + 1 });
        }
        break;
      case "prev":
        if (metadata.page > 1) {
          setMetadata({ ...metadata, page: metadata.page - 1 });
        }
        break;
    }
  };

  return (
    <>
      <TableComponent
        data={data}
        showFooter
        columns={Columns}
        onRowClick={onSelect}
        tableContainerClasses={"h-full w-full"}
        metadata={metadata}
        onFirst={() => paginationHandler("first")}
        onPrev={() => paginationHandler("prev")}
        onNext={() => paginationHandler("next")}
        onLast={() => paginationHandler("last")}
      />
      {viewItem && selected && (
        <ViewModal state={viewItem} onClose={setViewItem} data={selected} />
      )}

    </>
  );
};

export default Table;
