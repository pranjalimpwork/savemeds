import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { Country, State, City } from "country-state-city";
import { Space, Input, Table, Tag, Select } from "antd";
import { FiSearch } from "react-icons/fi";
const { Search } = Input;

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const SearchComponent = () => {
  const onSearch = (value) => console.log(value);
  const [cities, setCities] = useState([{}]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    console.log("state", State.getStatesOfCountry("IN"));
    console.log("CITY", City.getCitiesOfState("IN", "CT"));
    setStates(State.getStatesOfCountry("IN"));
    setCities(City.getCitiesOfState("IN", "CT"));
  }, []);

  const changeCityList = (stateCode) => {
    console.log("dada", stateCode);
    setCities(City.getCitiesOfState("IN", stateCode));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
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

  return (
    <>
      <div className={style.search_page_container}>
        <div className={style.search_header}>
          <div className={style.search_box_container}>
            <div className={style.title}>
              Enter The Name Of The Medicine{" "}
            </div>
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
                  onChange={changeCityList}
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
                  onChange={handleChange}
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
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
