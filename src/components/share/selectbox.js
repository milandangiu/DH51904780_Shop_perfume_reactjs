import React, { PureComponent, Fragment } from "react";
import { useState, useEffect } from "react";

const SelectBox = ({ itemId, selectedFirst, onOptionChange }) => {
  const options = [
    {
      name: "Đang chờ xử lý",
      value: "Đang chờ xử lý",
    },
    {
      name: "Đang xử lý",
      value: "Đang xử lý",
    },
    {
      name: "Đang giao hàng",
      value: "Đang giao hàng",
    },
    {
      name: "Đã nhận hàng",
      value: "Đã nhận hàng",
    },
  ];
  const handleChangeStatus = (value) => {
    setSelectedOption(value);
    onOptionChange(itemId, value);
  };
  const [selectedOption, setSelectedOption] = useState(selectedFirst);
  return (
    <Fragment>
      {(selectedOption === "Đã hủy" || selectedOption === "Đã nhận hàng") && (
        <span>{selectedOption}</span>
      )}
      {selectedOption !== "Đã hủy" && selectedOption !== "Đã nhận hàng" && (
        <select
          className="form-select"
          value={selectedOption}
          onChange={(e) => handleChangeStatus(e.target.value)}
        >
          {options.map((o) => (
            <option
              disabled={o.value === "Đã hủy" || o.value === "Đang chờ xử lý"}
              key={o.value}
              value={o.value}
            >
              {o.name}
            </option>
          ))}
        </select>
      )}
    </Fragment>
  );
};

export default SelectBox;
