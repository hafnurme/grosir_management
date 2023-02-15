import axios from "axios";
import { useEffect, useState } from "react";
import CategoryTable from "@/components/TableComponents/CategoryTable";
import AddModal from "@/components/Modal/AddModal";
import { IconButton, Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const Kategori = () => {
  const [category, setCategory] = useState();
  const [searchQuery, setSearchQuery] = useState();

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
          <div className="flex justify-between items-center px-2 py-4">
            <div className="text-c">
              <div className="mx-2 text-2xl font-semibold">
                <h3>Kategori</h3>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <Input
                  label="Search"
                  color="orange"
                  variant="outlined"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <IconButton className="w-20" color="orange">
                  <MagnifyingGlassIcon className="h-6" />
                </IconButton>
              </div>
              <AddModal
                refreshData={fetchKategori}
                addUrl="/api/category"
                itemHead={["category_name", "category_type"]}
                fieldType={["text", "text"]}
                label="Tambah Kategori"
                col="1"
                size="md"
              />
            </div>
          </div>
        </div>
        <div>
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
