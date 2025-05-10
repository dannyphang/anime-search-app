import React from "react";
import { Pagination } from "@mui/material";

const MemoizedPagination = React.memo(function ({
  page,
  count,
  onChange,
}: {
  page: number;
  count: number;
  onChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
}) {
  return <Pagination count={count} shape="rounded" page={page} onChange={onChange} />;
});

export default MemoizedPagination;
