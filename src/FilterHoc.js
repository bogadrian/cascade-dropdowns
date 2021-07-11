import { useEffect, useState } from 'react';
import { SHOPS_FAKE_2 } from './data';
import FilterHocMiddle from './FilterHocMiddle';

const FilterHoc = () => {
  const [data, setData] = useState([]);
  const [owned, setOwned] = useState('owned');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const initialData = SHOPS_FAKE_2?.filter(el => el.owned);

    if (initialData.length > 0) setData(initialData);
  }, [SHOPS_FAKE_2]);

  const handleOnChangeOwned = e => {
    setSearchTerm('');
    const value = e.target.value;
    setOwned(value);
    const initialData = SHOPS_FAKE_2.filter(el => {
      if (value === 'owned') return el.owned;
      if (value === 'notOwned') return !el.owned;
    });

    setData(initialData);
  };

  const handleOnChangeSTORE_CODE = e => {
    console.log(e.target.value);
    const value = e.target.value;
    setSearchTerm(value);

    const searchTermData = SHOPS_FAKE_2?.filter(s => {
      if (owned === 'owned') return s.owned;
      if (owned === 'notOwned') return !s.owned;
    }).filter(dat => {
      return dat?.store_code?.toLowerCase().includes(value.toLowerCase());
    });

    setData(searchTermData);
  };

  const resetMain = () => {
    setSearchTerm('');
    setOwned('owned');
    const initialData = SHOPS_FAKE_2?.filter(el => el.owned);

    if (initialData.length > 0) setData(initialData);
  };
  return (
    <div>
      {data?.length > 0 && (
        <FilterHocMiddle
          data={data}
          handleOnChangeOwned={handleOnChangeOwned}
          owned={owned}
          handleOnChangeSTORE_CODE={handleOnChangeSTORE_CODE}
          searchTerm={searchTerm}
          resetMain={resetMain}
        />
      )}
    </div>
  );
};

export default FilterHoc;
