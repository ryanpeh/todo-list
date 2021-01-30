import React, { useState, useEffect, forwardRef } from "react";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import Form from "./Form";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Button } from "@material-ui/core";

import styled from "styled-components";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const convertDate = (date) => {
  if (date == null) {
    return null;
  } else {
    return JSON.stringify(date).slice(1, 11).split("-").reverse().join("-");
    //return JSON.stringify(date);
  }
};

const TodoTable = () => {
  const [data, setData] = useState([]); //table data
  const [selectedData, setSelectedData] = useState({title:"",description:""});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  var columns = [
    {
      title: "",
      field: "completed",
      render: (rowData) => (
        <Checkbox
          checked={rowData.completed}
          color="primary"
          onChange={(e) => handleCheckboxChange(e, rowData)}
        />
      ),
      cellStyle: { width: "20%" },
    },
    { title: "id", field: "id", hidden: true },
    {
      title: "Title",
      field: "title",
      cellStyle: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth: 100,
      },
    },
    {
      title: "Description",
      field: "description",
      cellStyle: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth: 100,
      },
    },
    {
      title: "Due Date",
      field: "due_date",
      render: (rowData) => convertDate(rowData.due_date),
      editComponent: ({ value, onChange }) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="time-picker"
            format="dd/MM/yyyy"
            value={value}
            onChange={onChange}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
          />
        </MuiPickersUtilsProvider>
      ),
    },
  ];

  const closeForm = (e) => {
    setIsFormOpen(false);
  };

  const closeAlert = (e) => {
    setIsAlertOpen(false);
  };

  useEffect(() => {
    axios
      .get("/todos")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log("Error");
      });
  }, []);

  const handleCheckboxChange = (e, rowData) => {
    e.preventDefault();
    if (rowData.completed) {
      rowData.completed = false;
    } else {
      rowData.completed = true;
    }
    console.log(rowData);
    axios.patch("/todos/" + rowData.id, rowData).then((res) => {
      axios.get("/todos").then((res) => {
        setData(res.data);
      });
    });
  };

  const updateRow = (newData, oldData, resolve) => {
    axios
      .patch("/todos/" + newData.id, newData)
      .then((res) => {
        const dataUpdate = [...data];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setData([...dataUpdate]);
        resolve();
      })
      .catch((error) => {
        resolve();
      });
  };

  const addRow = (newData) => {
    axios.post("/todos", newData).then((res) => {
      // setData([...data, newData]); This doesn't update the ID, so below is my temporary workaround for it while I figure it out
      axios.get("/todos").then((res) => {
        setData(res.data);
      });
    });
  };

  const deleteRow = (oldData, resolve) => {
    axios
      .delete("/todos/" + oldData.id)
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
      })
      .catch((error) => {
        resolve();
      });
  };

  const expandRow = (selectedRow) => {
    setSelectedData({
      title: selectedRow.title,
      description: selectedRow.description
    });
    setIsAlertOpen(true);
  };

  return (
    <div className="App">
      <Grid container spacing={1}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <MaterialTable
            title=""
            columns={columns}
            data={data}
            icons={tableIcons}
            options={{
              paging: false,
              addRowPosition: "first",
              thirdSortClick: false,
              actionsColumnIndex: -1,
              selectionProps: (rowData) => 1,
            }}
            onRowClick={(evt, selectedRow) => expandRow(selectedRow)}
            actions={[
              {
                icon: AddBox,
                tooltip: "Add Todo",
                isFreeAction: true,
                onClick: (event, rowData) => {
                  setIsFormOpen(true);
                },
              },
            ]}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  updateRow(newData, oldData, resolve);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  deleteRow(oldData, resolve);
                }),
            }}
          />
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <Dialog
        title="Add Todo"
        open={isFormOpen}
        onClose={closeForm}
        maxWidth="lg"
      >
        <DialogTitle onClose={closeForm}>
          Add Todo
        </DialogTitle>
        <Form onSubmit={addRow} closeForm={closeForm} />
      </Dialog>
      <Dialog
        open={isAlertOpen}
        onClose={closeAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          {selectedData.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedData.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAlert} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TodoTable;
