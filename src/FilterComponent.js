import React, { useEffect, useState } from 'react';

import {
  Container,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import MuiButton from '@material-ui/core/Button';

import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

import { makeStyles, styled } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';

import { SHOPS_FAKE_2 } from './data';

//! TABELLA - DATA GRID!
import { DataGrid, GridToolbar } from '@material-ui/data-grid';

// stile bottone
const Button = styled(MuiButton)(spacing);

// comp TABELLA CON FILTRO NEGOZI
export default function TwoStepperDataGridEsempioConFILTRO() {
  const CODICESTOREINIZIALE = '';
  const DEFAULT_STORE_TYPE = 'DEMO STORE';
  const OWNED = 'owned';
  const NOT_OWNED = 'notOwned';
  const COUNTRY = '';

  //| selettore elementi tabella data grid - ritorna ID DELLE SELEZIONI -> VEDI -> STAMPO SELEZIONE per ID dell'UTENTE!
  const [selectionModel, setSelectionModel] = useState([]);

  // mostro tooltip per filtri
  const [showFilters, setShowFilters] = useState(false);

  //! Filters Dropdown data
  const [storeTypes, setStoreTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  // SELECTED Filters - hook reset filter
  const [selectedOwned, setSelectedOwned] = useState(OWNED);
  const [selectedStoreType, setSelectedStoreType] =
    useState(DEFAULT_STORE_TYPE);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  // ..
  const [searchTerm, setSearchTerm] = useState('');

  // DATI MODELLO DATAGRID
  const columns = [
    { field: 'id', type: 'number', headerName: 'ID', width: 90 },
    {
      field: 'owned',
      headerName: "DI PROPRIETA'",
      type: 'boolean',
      width: 180,
      editable: false
    },
    {
      field: 'store_code',
      headerName: 'CODICE SHOP',
      type: 'string',
      width: 180,
      editable: false
    },
    {
      field: 'types',
      type: 'string',
      headerName: 'TIPO DI SHOP',
      width: 180,
      editable: false,
      sortable: true
    },
    {
      field: 'country',
      headerName: 'NAZIONE',
      type: 'string',
      width: 140,
      editable: false
    },
    {
      field: 'province',
      headerName: 'PROVINCE',
      type: 'string',
      width: 150,
      editable: false
    },
    {
      field: 'city',
      headerName: "CITTA'",
      type: 'string',
      width: 140,
      editable: false
    },
    {
      field: 'business_name',
      headerName: 'NOME SHOP',
      type: 'string',
      width: 180,
      editable: false
    }
  ];

  // load initial data
  const [data, setData] = useState(
    // se la selezione è OWNED ritorna gli store selezionati dall'utente, e viceversa - filtro iniziale da owned a cascata
    SHOPS_FAKE_2.filter(
      r =>
        r.owned === (selectedOwned === OWNED) &&
        r.types.includes(selectedStoreType)
    )
  );

  //! Handle onChange functions
  const handleOnChangeSTORE_CODE = e => {
    setSearchTerm(e.target.value);

    const filteredData = !searchTerm
      ? SHOPS_FAKE_2
      : SHOPS_FAKE_2.filter(code =>
          code?.store_code
            ?.toLowerCase()
            .includes(searchTerm.toLocaleLowerCase())
        );

    console.log('value handleOnChangeSTORE_CODE', filteredData);

    setData(filteredData);
  };

  const handleOnChangeOwned = e => {
    const value = e.currentTarget.value;
    setSelectedOwned(value);

    const filteredData = SHOPS_FAKE_2.filter(s => {
      return (
        s.owned === (value === OWNED) && s.types.includes(selectedStoreType)
      );
    });
    setData(filteredData);
  };

  const handleOnChangeStoreType = e => {
    const value = e.target.value;
    console.warn('value', value);
    setSelectedStoreType(value);

    const filteredData = SHOPS_FAKE_2.filter(s => {
      return s.owned === (selectedOwned === OWNED) && s.types.includes(value);
    });

    setData(filteredData);
  };

  const handleOnChangeCountry = e => {
    const value = e.target.value;
    console.warn('value country select', value);
    setSelectedCountry(value);

    const filteredData = SHOPS_FAKE_2?.filter(s => {
      //
      return (
        s.country === (selectedStoreType === value) && s.country.includes(value)
      );
    });

    setData(filteredData);
  };

  // SCHEMA DATA MODEL:
  //   id: -844,
  //   types: ['DEMO STORE'],
  //   country: 'HU',
  //   city: 'Budapest',
  //   province: 'Budapest',
  //   owned: true,
  //   store_code: '-DEMO844',
  //   business_name: 'Demo Boutique'

  // BUGS -> TO FIX!
  // SELECT ONLY OWNED OR NOT OWNED -> NON FILTERING DATA AND RETURN EMPY FIELD IN TYPE OF SHOPS (types) DATA GRID COMPONENT!
  // SEARCH BY input text not work by store_code -> NON FILTERING DATA BUT RETURN NOT exactly DATA IN DATA GRID COMPONENT!
  // SELECT BY COUNTRY -> NOT RETURN DATA IN DATA GRID COMPONENT BUT RETURN MORE COUNTRIES FILTERING FOR TYPE OF SHOPS
  //

  // UPDATE DATA GRID AFTER FILTERING - LOGIC
  useEffect(() => {
    const filteredStoreTypes = SHOPS_FAKE_2.filter(
      c => c.owned === (selectedOwned === OWNED)
    );

    const storeTypesForSelect = Array.from(
      new Set(filteredStoreTypes.flatMap(s => s.types))
    );

    const filteredCountries = filteredStoreTypes.filter(c =>
      c.types.includes(selectedStoreType)
    );

    const countriesForSelect = Array.from(
      new Set(filteredCountries.map(c => c.country))
    );

    const filteredProvinces = filteredCountries.filter(
      c => c.country === selectedCountry
    );

    const provincesForSelect = Array.from(
      new Set(filteredProvinces.map(c => c.province))
    );

    const filteredCities = filteredProvinces.filter(
      c => c.province === selectedProvince
    );

    const citiesForSelect = Array.from(
      new Set(filteredCities.map(c => c.city))
    );

    setStoreTypes(storeTypesForSelect.map(s => ({ value: s, label: s })));
    setCountries(countriesForSelect.map(c => ({ value: c, label: c })));

    // return province - only IT - TO FIX!
    setProvinces(
      provincesForSelect.length
        ? provincesForSelect.map(c => ({ value: c, label: c }))
        : [{ value: null, label: 'No province available' }]
    );
    setCities(citiesForSelect.map(c => ({ value: c, label: c })));
  }, [
    SHOPS_FAKE_2,
    selectedOwned,
    selectedStoreType,
    selectedCountry,

    searchTerm
  ]);

  // open box and reset filtri selettori/Dropdown
  const toggleShowFilters = () => setShowFilters(s => !s);

  const resetFilters = () => {
    setSearchTerm('');
    //
    setSelectedStoreType('');
    setSelectedOwned('');
    setSelectedCountry('');
    setSelectedProvince('');
    setSelectedCity('');
    setData(SHOPS_FAKE_2);
  };

  return (
    <Container>
      <Box m={2} align="center">
        <Button
          onClick={toggleShowFilters}
          variant="contained"
          disableElevation
          endIcon={showFilters ? <ArrowDropUp /> : <ArrowDropDown />}
        >
          {showFilters ? 'Nascondi filtro negozi' : 'Filtro negozi'}
        </Button>
        {showFilters && (
          <Box py={1}>
            <Card variant="outlined">
              <CardHeader
                titleTypographyProps={{ variant: 'h6' }}
                title="Filtro negozi - varie opzioni"
              />
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item container spacing={4}>
                    {/* START */}

                    {/* FILTRO PER - PROPRIETA' DELLO STORE */}
                    <Grid item xs={12} sm={6} lg={3}>
                      <FormControl>
                        <FormLabel>
                          Store di proprietà (obbligatorio):
                        </FormLabel>
                        <RadioGroup
                          row
                          name="owned"
                          value={selectedOwned}
                          onChange={handleOnChangeOwned}
                        >
                          <FormControlLabel
                            key={OWNED}
                            value={OWNED}
                            control={<Radio size="small" />}
                            label="di proprietà"
                          />
                          <FormControlLabel
                            key={NOT_OWNED}
                            value={NOT_OWNED}
                            control={<Radio size="small" />}
                            label="non di proprietà"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    {/* FILTRO PER - STORE CODE */}

                    <Grid item xs={12} sm={6} lg={3}>
                      <TextField
                        label="Store Code - ricerca"
                        variant="filled"
                        fullWidth
                        // value={selectedStoreCode}
                        // onChange={handleOnChangeSTORE_CODE}
                        value={searchTerm}
                        onChange={handleOnChangeSTORE_CODE}
                      />
                    </Grid>

                    {/* FILTRO PER - TIPO DI STORE  */}

                    <Grid item xs={12} sm={6} lg={3}>
                      <Dropdown
                        id="type stores"
                        label="Tipi di Stores"
                        value={selectedStoreType}
                        onChange={handleOnChangeStoreType}
                        options={storeTypes} // ritorno dati unici -> rimuovo duplicati dei valori!
                      />
                    </Grid>

                    {/* FILTRO PER - NAZIONE DELLO STORE  */}

                    <Grid item xs={12} sm={6} lg={3}>
                      <Dropdown
                        id="nazione stores"
                        label="Nazione degli Stores"
                        //
                        value={selectedCountry}
                        // onChange={e => setSelectedCountry(e.target.value)}
                        onChange={handleOnChangeCountry}
                        options={countries} // ritorno dati unici -> rimuovo duplicati dei valori!
                      />
                    </Grid>

                    {/* FILTRO PER - PROVINCIA DELLO STORE  */}

                    <Grid item xs={12} sm={6} lg={3}>
                      <Dropdown
                        id="provincia stores"
                        label="Provincia degli Stores"
                        value={selectedProvince}
                        // onChange={e => setfilterProvinciaStore(e.target.value)}
                        options={provinces} // ritorno dati unici -> rimuovo duplicati dei valori!
                      />
                    </Grid>

                    {/* FILTRO PER - CITTA DELLO STORE  */}

                    <Grid item xs={12} sm={6} lg={3}>
                      <Dropdown
                        id="città stores"
                        label="Città degli Stores"
                        value={selectedCity}
                        // onChange={e => setfilterCittaStore(e.target.value)}
                        options={cities} // ritorno dati unici -> rimuovo duplicati dei valori!
                      />
                    </Grid>
                    {/* END */}
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button onClick={resetFilters} size="small">
                  Applica reset
                </Button>
              </CardActions>
            </Card>
          </Box>
        )}
        <div style={{ height: 520, width: '100%', marginTop: 16 }}>
          <DataGrid
            components={{
              Toolbar: GridToolbar
            }}
            rows={data} // UPDATA DATA -> setData() -> setData(updatedRows); -> useEffect block
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50, 100]}
            pagination
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={newSelection => {
              setSelectionModel(newSelection.selectionModel);
            }}
            selectionModel={selectionModel}
          />
        </div>
        {/* STAMPO SELEZIONE per ID dell'UTENTE */}
        {selectionModel.map((val, index) => (
          <h5 key={index}>Selezione ID: {val}</h5>
        ))}
      </Box>
    </Container>
  );
}

//? stile COMPONENTE - Dropdown
const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 120
  },
  selectEmpty: {
    minWidth: 200
  }
}));

//! COMPONENTE stateless - Dropdown
const Dropdown = ({ id, value, onChange, label, options }) => {
  const classes = useStyles();
  // console.log("options", options);

  const forwardID = id ?? `${JSON.stringify(options)}-select`;
  return (
    <FormControl variant="filled" fullWidth className={classes.formControl}>
      <InputLabel id={`${forwardID}-label`}>{label}</InputLabel>
      <Select
        displayEmpty
        labelId={`${forwardID}-label`}
        fullWidth
        id={forwardID}
        value={value}
        onChange={onChange}
        label={label}
        variant="filled"
      >
        {options.map((option, index) => {
          const { label: optionLabel, value } = option;
          return (
            <MenuItem key={index} value={value}>
              {optionLabel}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
