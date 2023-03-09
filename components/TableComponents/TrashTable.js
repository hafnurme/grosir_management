import { useEffect, useState } from "react";
import DeleteBtn from "./Trash/DeleteBtn";
import { BtnRestore } from "./Trash/RestoreBtn";

const TrashTable = ({ data, head, refreshData, restoreURL, deleteURL, id }) => {
    const [finalData, setFinalData] = useState();

    useEffect(() => {
        setFinalData(data);
    }, [data]);

    return (
        <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-[12px] sm:text-xs uppercase bg-gray-100">
                <tr>
                    <th></th>
                    {head &&
                        head.map((elem, i) => {
                            return (
                                <th key={i} scope="col" className="px-3 py-3">
                                    {elem}
                                </th>
                            );
                        })}
                    <th scope="col" className="px-6 py-3"></th>
                </tr>
            </thead>
            <tbody>
                {finalData &&
                    finalData.map((object, indexp) => {
                        return (
                            <tr
                                className="bg-white border-b text-[11px] sm:text-sm"
                                key={indexp}
                            >
                                <td className="px-3">{indexp + 1}</td>
                                {head &&
                                    head.map((elem, i) => {
                                        return (
                                            <td
                                                className="px-2  whitespace-nowrap lg:whitespace-normal py-1"
                                                key={Math.random() * 100 * i}
                                            >
                                                {object[elem]}
                                            </td>
                                        ); 1
                                    })}
                                <td className="px-2 sm:py-1 flex gap-3 justify-end items-center">
                                    <BtnRestore url={restoreURL} id={object[id]} />
                                    <DeleteBtn url={deleteURL} id={object[id]} />
                                </td>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
};

export default TrashTable;
