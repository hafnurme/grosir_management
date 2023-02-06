import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { Button, Card } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductDetailForm from "@/components/FormComponents/ProductDetailForm";

const TambahProduk = () => {
  const [category, setCategory] = useState();
  const [supplier, setSupplier] = useState();

  const fetchData = async (url, method) => {
    const dataTemp = await axios.get(url).then((res) => {
      return res.data;
    });

    method(dataTemp);
  };

  useEffect(() => {
    fetchData("/api/category", setCategory);
    fetchData("/api/supplier", setSupplier);
  }, []);

  return (
    <>
      <div>
        <div className="w-full bg-white p-5">
          <ProductDetailForm category={category} supplier={supplier} />
        </div>
      </div>
    </>
  );
};

export default TambahProduk;
