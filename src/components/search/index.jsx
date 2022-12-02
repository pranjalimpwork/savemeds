import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { Country, State, City } from "country-state-city";
import { Space, Input, Table, Tag, Select, Button } from "antd";
import { getAllMedicine } from "../../services/database";
const { Search } = Input;

const handleChange = (value, label) => {};

const SearchComponent = () => {
  const onSearch = (value) => console.log(value);
  const [cities, setCities] = useState([{}]);
  const [states, setStates] = useState([]);
  const [allMedicineData, setAllMedicineData] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setStates(State.getStatesOfCountry("IN"));
    setCities(City.getCitiesOfState("IN", "CT"));
  }, []);

  const changeCityList = (value, label) => {
    console.log("dada", value);
    setCities(City.getCitiesOfState("IN", value));
  };

  const handleDDD = (d, v) => {
    console.log(d, v);
  };

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "MNF DATE",
      dataIndex: "manufactureDate",
      key: "manufactureDate",
    },
    {
      title: "EXP DATE",
      dataIndex: "expireDate",
      key: "expireDate",
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "DONATER NAME",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "DONATER CONTACT",
      dataIndex: "phoneNumber",
      key: "userNphoneNumberame",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button>Buy Now</Button>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  useEffect(() => {
    getAllMedicine(setAllMedicineData);
  }, []);

  useEffect(() => {
    console.log("allMedicineData", allMedicineData);
  }, [allMedicineData]);

  return (
    <>
      <div className={style.search_page_container}>
        <div className={style.search_header}>
          <div className={style.search_box_container}>
            <div className={style.title}>Enter The Name Of The Medicine </div>
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              className={style.search_input}
            />
          </div>
          <div className={style.filter_container}>
            <div className={style.filter_selector}>
              <div className={style.label}>Select States</div>
              {states && (
                <Select
                  defaultValue={"Select States"}
                  className={style.select}
                  onSelect={changeCityList}
                  options={states.map((val, ind) => {
                    return {
                      value: val.isoCode,
                      label: val.name,
                    };
                  })}
                />
              )}
            </div>
            <div className={style.filter_selector}>
              <div className={style.label}>Select City</div>
              {cities && (
                <Select
                  defaultValue={"Select Cities"}
                  className={style.select}
                  onSelect={handleChange}
                  options={cities.map((val, ind) => {
                    return {
                      value: val.name,
                      label: val.name,
                    };
                  })}
                />
              )}
            </div>
          </div>
        </div>
        <div className={style.data_field_container}>
          {allMedicineData.length > 0 && (
            <Table columns={columns} dataSource={allMedicineData} />
          )}
          {allMedicineData.length === 0 && <h1>No Data</h1>}
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
