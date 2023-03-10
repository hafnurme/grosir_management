import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { IconButton } from "@material-tailwind/react";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useState } from "react";

const Paginate = ({ page, refreshData, setData }) => {
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

  if (!page.next_page_url && !page.prev_page_url) {
    return null;
  }

  return (
    <>
      {page && (
        <div className="flex w-min gap-1 backdrop:blur sticky  bottom-0 mt-4 ml-auto">
          <IconButton onClick={refreshData}>
            <ArrowPathIcon className="h-6" />
          </IconButton>
          <IconButton
            disabled={page.prev_page_url === null ? true : false}
            onClick={() => {
              paginateNavigate(page.prev_page_url);
            }}
          >
            Prev
          </IconButton>
          {page.current_page != 1 && (
            <IconButton
              onClick={() => {
                paginateNavigate(page.path + `?page=${page.current_page - 1}`);
              }}
            >
              {page.current_page - 1}
            </IconButton>
          )}
          <IconButton
            onClick={() => {
              paginateNavigate(page.path + `?page=${page.current_page}`);
            }}
            variant="outlined"
            className="bg-blue-gray-100"
          >
            {page.current_page}
          </IconButton>
          {page.current_page != page.last_page && (
            <>
              <IconButton
                onClick={() => {
                  paginateNavigate(
                    page.path + `?page=${page.current_page + 1}`
                  );
                }}
              >
                {page.current_page + 1}
              </IconButton>
            </>
          )}
          {page.current_page != page.last_page &&
            page.current_page + 1 != page.last_page && (
              <IconButton
                onClick={() => {
                  paginateNavigate(page.last_page_url);
                }}
              >
                ...{page.last_page}
              </IconButton>
            )}
          <IconButton
            disabled={page.next_page_url === null ? true : false}
            onClick={() => {
              paginateNavigate(page.next_page_url);
            }}
          >
            next
          </IconButton>
        </div>
      )}
    </>
  );
};

export default Paginate;
