import { Edit } from "@material-ui/icons";

export const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "amount", headerName: "Amount", width: 150 },
  { field: "description", headerName: "Description", width: 300 },
  { field: "sender_name", headerName: "Sender Name", width: 200 },
  { field: "sender_phone", headerName: "Sender Phone", width: 200 },
  { field: "recepient_name", headerName: "Recepient Phone", width: 200 },
  { field: "recepient_phone", headerName: "Recepient Phone", width: 200 },
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
