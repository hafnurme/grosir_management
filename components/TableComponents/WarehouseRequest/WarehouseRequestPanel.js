import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import WarehouseRequestTable from "./WarehouseRequestTable";

export default function WarehouseRequestPanel({
  data,
  refreshData,
  permission,
}) {
  const dataSented = data.filter((element) => {
    if (element["status"] === "pending") {
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
        {tab.map(({ label, value }) => {
          if (permission && permission.includes("admin") && value === "sent") {
            return (
              <Tab key={value} value={value}>
                Pending
              </Tab>
            );
          } else {
            return (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            );
          }
        })}
      </TabsHeader>
      <TabsBody>
        {tab.map(({ label, value, dataStatus }) => (
          <TabPanel key={value} value={value} className="p-0 py-4">
            <WarehouseRequestTable
              data={dataStatus}
              head={[
                "product_code",
                "name",
                "request_date",
                "status",
                "quantity",
              ]}
              refreshData={refreshData}
              permission={permission}
              label={value}
            />
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
