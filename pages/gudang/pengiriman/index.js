import {
  Button,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import CardComponents from "../../../components/CardComponents";
import TableShow from "../../../components/TableComponents/TableShow";

const data = [
  {
    label: "Pending",
    value: "html",
    desc: `It really matters and then like it really doesn't matter.
    What matters is the people who are sparked by it. And the people 
    who are like offended by it, it doesn't matter.`,
  },
  {
    label: "Completed",
    value: "react",
    desc: `Because it's about motivating the doers. Because I'm here
    to follow my dreams and inspire other people to follow their dreams, too.`,
  },

  {
    label: "Outdated",
    value: "vue",
    desc: `We're not always in the position that we want to be at.
    We're constantly growing. We're constantly making mistakes. We're 
    constantly trying to express ourselves and actualize our dreams.`,
  },
];

const Pengiriman = () => {
  return (
    <>
      <div className="flex gap-5">
        <CardComponents />
        <CardComponents />
        <CardComponents />
      </div>
      <div className="mt-5 text-c"></div>

      <div className="my-5 p-5 bg-white rounded-md shadow-md">
        <Tabs value="html">
          <TabsHeader>
            {data.map(({ label, value }) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value} className="p-0 pt-5">
                <TableShow
                  head={["Request Id", "Produk Id", "Amount", "Order Date"]}
                />
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </>
  );
};

export default Pengiriman;
