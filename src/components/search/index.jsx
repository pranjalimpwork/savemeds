import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { Country, State, City } from "country-state-city";
import { Space, Input, Table, Tag, Select, Button } from "antd";
import { getAllMedicine } from "../../services/database";
const { Search } = Input;

const SearchComponent = () => {
  const [cities, setCities] = useState([{}]);
  const [states, setStates] = useState([]);
  const [allMedicineData, setAllMedicineData] = useState([]);
  const [data, setData] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Select Cities");
  const [selectedState, setSelectedState] = useState("Select State");
  const [searchValue, setSearchValue] = useState("");
  const [showClearButton, setShowClearButton] = useState(false);
  const [loading, setloading] = useState(false);

  const handleCityChange = (value, label) => {
    setShowClearButton(true);
    let newData = allMedicineData.filter((val) => {
      if (val.city) {
        let city = val.city.toUpperCase();
        return city.includes(label.label.toUpperCase());
      }
    });
    setSelectedCity(label);
    setData(newData);
  };

  const handleStateChange = (value, label) => {
    setShowClearButton(true);
    let newData = allMedicineData.filter((val) => {
      if (val.state) {
        let state = val.state.toUpperCase();
        return state.includes(label.label.toUpperCase());
      }
    });
    setCities(City.getCitiesOfState("IN", value));
    setSelectedState(label);
    setData(newData);
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
          <a href={`tel:+91${record.phoneNumber}`}>
            <Button>Call Owner </Button>
          </a>
        </Space>
      ),
    },
  ];

  const filterData = (medicineName) => {
    let newData = allMedicineData.filter((data) => {
      let name = data.name.toUpperCase();
      return name.includes(medicineName.toUpperCase());
    });
    setData(newData);
  };

  const clearFilter = () => {
    setData(allMedicineData);
    setShowClearButton(false);
    setSelectedCity("Select Cities");
    setSelectedState("Select States");
    setSearchValue("");
  };

  useEffect(() => {
    setStates(State.getStatesOfCountry("IN"));
    setCities(City.getCitiesOfState("IN", "CT"));
    getAllMedicine(setAllMedicineData);
  }, []);

  useEffect(() => {
    setData(allMedicineData);
  }, [allMedicineData]);

  return (
    <>
      <div className={style.search_page_container}>
        <div className={style.search_header}>
          <div className={style.search_box_container}>
            <div className={style.title}>Enter The Name Of The Medicine </div>
            <Search
              placeholder="input search text"
              className={style.search_input}
              value={searchValue}
              onChange={(e) => {
                filterData(e.target.value);
                setSearchValue(e.target.value);
              }}
            />
          </div>
          <div className={style.filter_container}>
            <div className={style.filter_selector}>
              <div className={style.label}>Select States</div>
              {states && (
                <Select
                  value={selectedState}
                  className={style.select}
                  onSelect={handleStateChange}
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
                  value={selectedCity}
                  className={style.select}
                  onSelect={handleCityChange}
                  options={cities.map((val, ind) => {
                    return {
                      value: val.name,
                      label: val.name,
                    };
                  })}
                />
              )}
            </div>
            {showClearButton && (
              <div
                className={style.filter_selector}
                onClick={() => clearFilter()}
              >
                <Button>Clear Filter</Button>
              </div>
            )}
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
