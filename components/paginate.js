import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { IconButton } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const Paginate = ({ page, paginateNavigate, refreshData }) => {

  const [size, setSize] = useState()

  useEffect(() => {
    window.innerWidth >= 960 ? setSize('lg') : setSize('sm')
  }, [])


  return (
    <div className="flex gap-1 bg-blue-gray-100">
      <IconButton size={size} onClick={refreshData}>
        <ArrowPathIcon className="h-6" />
      </IconButton>
      <IconButton
        size={size}
        disabled={page.prev_page_url === null ? true : false}
        onClick={() => {
          paginateNavigate(page.prev_page_url);
        }}
      >
        Prev
      </IconButton>
      {page.current_page != 1 && (
        <IconButton
          size={size}
          onClick={() => {
            paginateNavigate(page.path + `?page=${page.current_page - 1}`);
          }}
        >
          {page.current_page - 1}
        </IconButton>
      )}
      <IconButton
        size={size}
        onClick={() => {
          paginateNavigate(page.path + `?page=${page.current_page}`);
        }}
        variant="outlined"
      >
        {page.current_page}
      </IconButton>
      {page.current_page != page.last_page && (
        <>
          <IconButton
            size={size}
            onClick={() => {
              paginateNavigate(page.path + `?page=${page.current_page + 1}`);
            }}
          >
            {page.current_page + 1}
          </IconButton>
        </>
      )}
      {page.current_page != page.last_page &&
        page.current_page + 1 != page.last_page && (
          <IconButton
            size={size}
            onClick={() => {
              paginateNavigate(page.last_page_url);
            }}
          >
            ...{page.last_page}
          </IconButton>
        )}
      <IconButton
        size={size}
        disabled={page.next_page_url === null ? true : false}
        onClick={() => {
          paginateNavigate(page.next_page_url);
        }}
      >
        next
      </IconButton>
    </div>
  );
};

export default Paginate;
