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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
  };

  useEffect(() => {
    fetchData("/api/category", setCategory);
    fetchData("/api/supplier", setSupplier);
  }, []);

  return (
    <>
      <div>
        <div className="w-full bg-white p-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <ProductDetailForm category={category} supplier={supplier} />
            </div>
            <div className="flex justify-end mt-5">
              <Button
                type="submit"
                className="flex w-40 items-center justify-center"
                color="orange"
              >
                <div className="text-md">Add</div>
                <div className="h-5 w-5 inline-block ml-2">
                  <PlusCircleIcon />
                </div>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TambahProduk;
