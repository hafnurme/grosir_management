import { useState, useEffect } from "react";
import axios from "axios";
import OrderTable from "@/components/TableComponents/orderTable";

export default function Order() {
  const [order, setOrder] = useState();

  useEffect(() => {
    const fetchProductReq = async () => {
      const producttemp = await axios
        .get("/api/request")
        .then((res) => res.data);

      setOrder(producttemp);
    };

    console.log(order);

    fetchProductReq();
  }, []);

  return (
    <>
      <div className="my-3">
        {order && (
          <OrderTable
            head={[
              "product_code",
              "amount",
              "order_date",
              "out_date",
              "status",
            ]}
            title="Order List"
            data={order.data}
          />
        )}
      </div>
    </>
  );
}
