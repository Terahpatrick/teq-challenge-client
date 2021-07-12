import { Edit } from "@material-ui/icons";

export const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 300 },
  { field: "phone_number", headerName: "Phone", width: 300 },
  { field: "email", headerName: "Email", width: 300 },
  { field: "role", headerName: "Role", width: 300 },
  {
    field: "2",
    headerName: "Actions",
    disableClickEventBubbling: true,
    flex: 1,
    renderCell: (params) => {
      return (
        <div>
          <Edit
            style={{
              color: "#006b38ff",
              cursor: "pointer",
            }}
          />
        </div>
      );
    },
  },
];
