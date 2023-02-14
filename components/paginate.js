import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { IconButton } from "@material-tailwind/react";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useState } from "react";

const Paginate = ({ page, refreshData, setData }) => {

  const [size, setSize] = useState()

  const paginateNavigate = async (link) => {
    const accessToken = await getSession().then((token) => token.accessToken);

    const dataTemp = await axios
      .get(link, {
        headers: {
          token: accessToken,
        },
      })
      .then((res) => {
        return res.data;
      });

    return setData(dataTemp);
  };

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
