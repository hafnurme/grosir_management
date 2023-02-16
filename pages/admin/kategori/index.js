import axios from "axios";
import { useEffect, useState } from "react";
import CategoryTable from "@/components/TableComponents/CategoryTable";
import { IconButton, Input } from "@material-tailwind/react";
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
    window.innerWidth >= 960 ? setSize("md") : setSize("sm");
    window.addEventListener("resize", () =>
      window.innerWidth >= 960 ? setSize("md") : setSize("sm")
    );
  }, []);

  return (
    <>
      <div>
        <div>
          <div className="flex justify-between items-center px-2 py-4  overflow-hidden">
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
                <IconButton size={size} className="w-20" color="orange">
                  <MagnifyingGlassIcon
                    className={size == "md" ? "h-6" : "h-4"}
                  />
                </IconButton>
              </div>
              <CategoryAddModal refreshData={fetchKategori} />
            </div>
          </div>
        </div>
        <div className="overflow-x-scroll">
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
