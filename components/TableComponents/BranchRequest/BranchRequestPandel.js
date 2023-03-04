import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import BranchRequestTable from "./BranchRequestTable";

export default function BranchRequestPanel({ data, refreshData, permission }) {
  const dataSented = data.filter((element) => {
    console.log(element);
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
    <Tabs value="accepted">
      <TabsHeader>
        {tab.map(({ label, value }) => {
          return (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          );
        })}
      </TabsHeader>
      <TabsBody>
        {tab.map(({ label, value, dataStatus }) => (
          <TabPanel key={value} value={value} className="p-0 py-4">
            <BranchRequestTable
              data={dataStatus}
              head={["product_code", "order_date", "status", "amount"]}
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
