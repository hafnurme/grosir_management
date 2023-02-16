import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import WarehouseRequestTable from "./WarehouseRequestTable";

export default function WarehouseRequestStatus({ data, refreshData }) {
  const dataSented = data.filter((element) => {
    if (element["status"] === "sent") {
      return element;
    }
  });

  const dataAccepted = data.filter((element) => {
    if (element["status"] === "accepted") {
      return element;
    }
  });

  const dataTransferred = data.filter((element) => {
    if (element["status"] === "transferred") {
      return element;
    }
  });

  const tab = [
    {
      label: "Sent",
      value: "sent",
      dataStatus: dataSented,
    },
    {
      label: "Accepted",
      value: "accepted",
      dataStatus: dataAccepted,
    },
    {
      label: "Transferred",
      value: "transferred",
      dataStatus: dataTransferred,
    },
  ];

  return (
    <Tabs value="sent">
      <TabsHeader>
        {tab.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {tab.map(({ value, dataStatus }) => (
          <TabPanel key={value} value={value} className="p-0 py-4">
            <WarehouseRequestTable
              data={dataStatus}
              head={[
                "warehouse_id",
                "product_code",
                "request_date",
                "status",
                "quantity",
              ]}
              refreshData={refreshData}
            />
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}