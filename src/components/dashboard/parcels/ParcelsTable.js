import { useHistory } from "react-router-dom";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import { columns } from "./utils";
import { useFetchData } from "hooks/fetchData";

import Paper from "@material-ui/core/Paper";

export default function UsersTable() {
  const history = useHistory();

  const { data, loading } = useFetchData("parcels");
  const rows = data || [];

  const userNavigate = (data) => {
    history.push({
      pathname: "/dashboard/parcels/add",
      state: data,
    });
  };

  return (
    <Paper style={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        components={{
          Toolbar: GridToolbar,
        }}
        onRowClick={(rows) => {
          userNavigate(rows.row);
        }}
        loading={loading}
        autoHeight={true}
        disableDensitySelector
        disableColumnSelector
      />
    </Paper>
  );
}
