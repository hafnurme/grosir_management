import axios from "axios";
import { useEffect, useState } from "react";
import CategoryTable from "@/components/TableComponents/CategoryTable";
import { IconButton, Input, Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import CategoryAddModal from "@/components/Modal/Kategori/CategoryAddModal";

const Kategori = () => {
  const [category, setCategory] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [size, setSize] = useState();

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
        <div>
          <div className="flex justify-between items-center px-2 pb-4  overflow-hidden">
            <div className="hidden sm:block">
              <div className="text-2xl font-semibold">
                <Typography variant="h3">Kategori</Typography>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:justify-end">
              <div className="flex items-center gap-2 w-full sm:w-52">
                <Input
                  label="Search"
                  color="orange"
                  variant="outlined"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <IconButton className="w-20" color="orange">
                <MagnifyingGlassIcon className="h-6" />
              </IconButton>
              <CategoryAddModal refreshData={fetchKategori} />
            </div>
          </div>
        </div>
        <div className="overflow-x-scroll lg:overflow-auto mx-2 sm:mx-0">
          <CategoryTable
            head={["category_name", "category_type"]}
            title="Kategori Table"
            search={searchQuery}
            data={category}
            refreshData={fetchKategori}
          />
        </div>
      </div>
    </>
  );
};

export default Kategori;
