import React from "react";
import Select from "react-select";

export default function WarehouseStore() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <div>
      WarehouseStore
      <Select options={options} />
    </div>
  );
}
