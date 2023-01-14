import { Space } from "antd";
import { deleteData } from "../services/database";
export const dashboardTableColums = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Added Data",
    dataIndex: "addedDate",
    key: "addedDate",
  },
  {
    title: "MNF Date",
    dataIndex: "manufactureDate",
    key: "manufactureDate",
  },
  {
    title: "EXP Date",
    dataIndex: "expireDate",
    key: "expireDate",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space
        size="middle"
        onClick={() => {
          deleteData(record.docID);
        }}
      >
        <a>Delete </a>
      </Space>
    ),
  },
];
