import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import BatchTable from "./BatchTable";

export default function BatchTablePanel({ data, refreshData }) {
  const batchFresh = data.filter((element) => {
    if (element["status"] === "Fresh") {
      return element;
    }
  });
  const batchWarning = data.filter((element) => {
    if (element["status"] === "Warning") {
      return element;
    }
  });

  const batchExpired = data.filter((element) => {
    if (element["status"] === "Expired") {
      return element;
    }
  });
  const panel = [
    {
      label: "Fresh",
      value: "fresh",
      batchStatus: batchFresh,
    },
    {
      label: "Warning",
      value: "warning",
      batchStatus: batchWarning,
    },
    {
      label: "Expired",
      value: "expired",
      batchStatus: batchExpired,
    },
  ];

  return (
    <Tabs value="fresh">
      <TabsHeader>
        {panel.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {panel.map(({ value, batchStatus }) => (
          <TabPanel key={value} value={value} className="p-0 py-4">
            <BatchTable
              data={batchStatus}
              head={[
                "product_code",
                "stock",
                "exp_date",
                "entry_date",
                "status",
              ]}
              refreshData={refreshData}
            />
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
