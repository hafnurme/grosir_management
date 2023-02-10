import axios from "axios";
import { useEffect, useState } from "react";
import CategoryTable from "@/components/TableComponents/CategoryTable";

const Kategori = () => {
  const [category, setCategory] = useState();

  const fetchKategori = async () => {
    const categorytemp = await axios.get("/api/category").then((res) => {
      return res.data;
    });
    setCategory(categorytemp);
  };

  useEffect(() => {
    fetchKategori();
  }, []);

  return (
    <>
      <div>
        <CategoryTable
          head={["category_name", "category_type"]}
          title="Kategori Table"
          search={true}
          data={category}
          refreshData={fetchKategori}
        />
      </div>
    </>
  );
};

export default Kategori;
