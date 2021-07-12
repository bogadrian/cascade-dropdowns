import { useEffect, useState } from 'react';

import FilterTest from './FilterTest';

const FilterHocMiddle = ({
  data,
  handleOnChangeOwned,
  owned,
  handleOnChangeSTORE_CODE,
  searchTerm,
  resetMain
}) => {
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  const [storeTypes, setStoreTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  // SELECTED Filters - hook reset filter

  const [selectedStoreType, setSelectedStoreType] = useState('Demo Store');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  /*********** */

  useEffect(() => {
    setData2(data);
    setData3([]);
    const storeTypesForSelect = Array.from(new Set(data.flatMap(s => s.types)));

    setSelectedStoreType('');
    setStoreTypes(
      storeTypesForSelect
        ?.filter(el => el !== '')
        .map(s => ({ value: s, label: s }))
    );
  }, [data]);

  useEffect(() => {
    const countriesForSelect = data2.filter(s => {
      return (
        s.types.includes(selectedStoreType) && s.types[0] === selectedStoreType
      );
    });
    const countriesSelect = Array.from(
      new Set(countriesForSelect.map(c => c.country))
    );

    setSelectedCountry('');
    if (selectedStoreType !== '')
      setCountries(
        countriesSelect
          ?.filter(el => el !== '')
          .map(c => ({ value: c, label: c }))
      );
  }, [selectedStoreType]);

  useEffect(() => {
    const provincesForSelect = data2.filter(el => {
      return el.country.includes(selectedCountry);
    });
    const provincesSelect = Array.from(
      new Set(provincesForSelect.map(c => c.province))
    );

    setSelectedProvince('');

    setProvinces(
      provincesSelect
        ?.filter(el => el !== '')
        .map(c => ({ value: c, label: c }))
    );
  }, [selectedCountry]);

  useEffect(() => {
    const citiesForSelect = data2?.filter(el => {
      if (el.province) {
        return el.province.includes(selectedProvince);
      } else {
        return el.country === selectedCountry;
      }
    });

    console.log('pppppp', citiesForSelect);
    const citiesSelect = Array.from(new Set(citiesForSelect.map(c => c.city)));

    setSelectedCity('');

    setCities(citiesSelect.map(c => ({ value: c, label: c })));
  }, [selectedProvince, selectedCountry]);

  /********** */
  const handleOnChangeStoreType = e => {
    setData3([]);
    const value = e.target.value;

    const filteredData = data.filter(s => {
      return s.types[0].includes(value);
    });

    if (filteredData?.length > 0) setData2(filteredData);

    setSelectedStoreType(() => filteredData[0]?.types[0]);
  };

  const handleOnChangeCountry = e => {
    setData3([]);
    const value = e.target.value;

    const filteredData = data.filter(s => {
      return s.country.includes(value) && s.types[0] === selectedStoreType;
    });
    if (filteredData?.length > 0) setData2(filteredData);
    setSelectedCountry(() => filteredData[0]?.country);
  };

  const handleChangeProvince = e => {
    setData3([]);
    const value = e.target.value;

    const filteredData = data.filter(s => {
      return (
        s.province.includes(value) &&
        s.country === selectedCountry &&
        s.types[0] === selectedStoreType
      );
    });

    if (filteredData?.length > 0) setData2(filteredData);
    setSelectedProvince(() => filteredData[0]?.province);
  };

  const handleChangeCity = e => {
    const value = e.target.value;

    const filteredData = data2.filter(s => {
      return s.city.includes(value);
    });

    if (filteredData?.length > 0) setData3(filteredData);
    setSelectedCity(() => filteredData[0]?.city);
  };

  const resetFilters = () => {
    resetMain();
    setSelectedStoreType('');
    setSelectedCountry('');
    setSelectedProvince('');
    setSelectedCity('');
  };
  return (
    <div>
      <FilterTest
        data={data3?.length > 0 ? data3 : data2}
        handleOnChangeOwned={handleOnChangeOwned}
        owned={owned}
        handleOnChangeSTORE_CODE={handleOnChangeSTORE_CODE}
        searchTerm={searchTerm}
        handleOnChangeStoreType={handleOnChangeStoreType}
        handleOnChangeCountry={handleOnChangeCountry}
        handleChangeProvince={handleChangeProvince}
        handleChangeCity={handleChangeCity}
        storeTypes={storeTypes}
        countries={countries}
        provinces={provinces}
        cities={cities}
        selectedStoreType={selectedStoreType}
        selectedCountry={selectedCountry}
        selectedProvince={selectedProvince}
        selectedCity={selectedCity}
        resetFilters={resetFilters}
      />
    </div>
  );
};

export default FilterHocMiddle;
