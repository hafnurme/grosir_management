import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import BranchRequestTable from "./BranchRequestTable";

export default function BranchRequestPanel({ data, refreshData, permission }) {
  const [dataSented, setDataSented] = useState();
  const [dataAccepted, setDataAccepted] = useState();
  const [dataTransferred, setDataTransferred] = useState();

  useEffect(() => {
    if (data) {
      const dataSentedT = data.filter((element) => {
        if (element["status"] === "pending") {
          return element;
        }
      });
      const dataAcceptedT = data.filter((element) => {
        if (element["status"] === "accepted") {
          return element;
        }
      });
      const dataTransferredT = data.filter((element) => {
        if (element["status"] === "transferred") {
          return element;
        }
      });
      setDataSented(dataSentedT);
      setDataAccepted(dataAcceptedT);
      setDataTransferred(dataTransferredT);
    }
  }, [data]);

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
