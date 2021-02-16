import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from 'antd';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectItems() {
  const classes = useStyles();
  const [method, setMethod] = React.useState('');
  const [section, setSection] = React.useState('');
  const [model, setModel] = React.useState('');
  const handleMethodChange = (event) => {
    setMethod(event.target.value);
  };

  const handleSectionChange = (event) => {
    setSection(event.target.value);
  }

  const handleModelChange = (event) => {
      setModel(event.target.value);
      if (event.target.value === 2){
        
      }
  }

  

  return (
  <div className="container">
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="select-outlined-label">Method</InputLabel>
        <Select
          labelId="select-outlined-label"
          id="select-outlined"
          value={method}
          onChange={handleMethodChange}
          label="Method"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>Machine Learning Based</MenuItem>
          <MenuItem value={2}>Rule Based</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl} disabled={method !== 1}>
        <InputLabel id="select-disabled-label">Model</InputLabel>
        <Select
          labelId="select-disabled-label"
          id="select-disabled"
          value={model}
          onChange={handleModelChange}
          label="Model"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>Linear SVC</MenuItem>
          <MenuItem value={2}>Random Forest Classifier</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="select-outlined-label">Section</InputLabel>
        <Select
          labelId="select-outlined-label"
          id="select-outlined"
          value={section}
          onChange={handleSectionChange}
          label="Section"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>History of Present Illness</MenuItem>
          <MenuItem value={2}>Previous History</MenuItem>
        </Select>
      </FormControl>
    
    </div>
  );
}
