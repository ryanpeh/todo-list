import { TextField, Grid, Button, makeStyles } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { RestaurantMenuSharp } from "@material-ui/icons";

const FormStyle = styled.form`
  width: 100%;
  margin: 8px;
`;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    margin: theme.spacing(1),
    width: "40ch",
  },
  descriptionField: {
    margin: theme.spacing(1),
    width: "40ch",
  },
  buttonField: {
    margin: theme.spacing(1),
    textTransform: "none",
  },
}));

const initialFieldValues = {
  id: 0,
  title: "",
  description: "",
  tags: "",
  due_date: null,
  completed: false,
};

const Form = (props) => {
  const [values, setValues] = useState(initialFieldValues);
  const [titleNotFilled, setTitleNotFilled] = useState(false);
  const classes = useStyles();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (name == "title") {
      if (value != "") {
        setTitleNotFilled(false);
      }
    }
  };

  const handleDateChange = (date) => {
    setValues({
      ...values,
      due_date: date,
    });
  };

  const handleSubmit = () => {
    if (values.title == "") {
      setTitleNotFilled(true);
    } else {
      props.onSubmit(values);
      props.closeForm();
    }
  };

  return (
    <FormStyle>
      <Grid container>
        <Grid item xs={6}>
          <div>
            <TextField
              variant="outlined"
              label="To-Do"
              name="title"
              className={classes.textField}
              value={values.title}
              error={titleNotFilled}
              helperText={titleNotFilled ? "Todo cannot be empty" : ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              label="Description (Optional)"
              name="description"
              className={classes.descriptionField}
              rows={5}
              multiline
              value={values.description}
              onChange={handleInputChange}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
            <TextField
              variant="outlined"
              label="Tags (Optional)"
              className={classes.textField}
              name="tags"
              value={values.tags}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                inputVariant="outlined"
                format="dd/MM/yyyy"
                margin="normal"
                name="due_date"
                label="Due Date (Optional)"
                className={classes.textField}
                value={values.due_date}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div>
            <Button
              variant="contained"
              size="large"
              color="primary"
              className={classes.buttonField}
              onClick={() => setValues(initialFieldValues)}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              size="large"
              color="primary"
              className={classes.buttonField}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </Grid>
      </Grid>
    </FormStyle>
  );
};

export default Form;
