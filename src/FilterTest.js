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

// import { SHOPS_FAKE_2 } from './data';

//! TABELLA - DATA GRID!
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { CollectionsOutlined } from '@material-ui/icons';

// stile bottone
const Button = styled(MuiButton)(spacing);

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
// comp TABELLA CON FILTRO NEGOZI
const FilterTest = ({
  data,
  handleOnChangeOwned,
  owned,
  handleOnChangeSTORE_CODE,
  searchTerm,
  handleOnChangeCountry,
  handleOnChangeStoreType,
  handleChangeProvince,
  handleChangeCity,
  storeTypes,
  countries,
  provinces,
  cities,
  selectedStoreType,
  selectedCountry,
  selectedProvince,
  selectedCity,
  resetFilters
}) => {
  const OWNED = 'owned';
  const NOT_OWNED = 'notOwned';

  const [selectionModel, setSelectionModel] = useState([]);

  const [showFilters, setShowFilters] = useState(false);

  const toggleShowFilters = () => setShowFilters(s => !s);

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
                          value={owned}
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
                        value={selectedCountry}
                        onChange={handleOnChangeCountry}
                        options={countries} // ritorno dati unici -> rimuovo duplicati dei valori!
                      />
                    </Grid>

                    {/* FILTRO PER - PROVINCIA DELLO STORE  */}

                    <Grid item xs={12} sm={6} lg={3}>
                      {(selectedCountry === 'IT' ||
                        selectedCountry === 'Italia') && (
                        <Dropdown
                          id="provincia stores"
                          label="Provincia degli Stores"
                          value={selectedProvince}
                          onChange={handleChangeProvince}
                          options={provinces} // ritorno dati unici -> rimuovo duplicati dei valori!
                        />
                      )}
                    </Grid>

                    {/* FILTRO PER - CITTA DELLO STORE  */}

                    <Grid item xs={12} sm={6} lg={3}>
                      <Dropdown
                        id="città stores"
                        label="Città degli Stores"
                        value={selectedCity}
                        onChange={handleChangeCity}
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
};

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

export default FilterTest;
