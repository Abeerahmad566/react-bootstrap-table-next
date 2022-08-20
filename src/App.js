import axios from "axios";
import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const [data, setdata] = useState();

  const getData = () => {
    axios("https://jsonplaceholder.typicode.com/comments").then((res) => {
      console.log(res.data);
      setdata(res.data);
    });
  };
  useEffect(getData, []);

  const columns = [
    {
      dataField: "postId",
      text: "ID",
      sort: true,
      editable: false,
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      validator: (newValue, row, column) => {
        if (!isNaN(newValue)) {
          return {
            valid: false,
            message: "Please enter String value",
          };
        }
        return true;
      },
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      style: (cell, row, rowIndex, colIndex) => {
        if (rowIndex % 2 === 0) {
          return {
            backgroundColor: "#81c784",
          };
        }
        return {
          backgroundColor: "#c8e6c9",
        };
      },
    },
  ];

  const rowStyle2 = (row, rowIndex) => {
    const style = {};
    if (row.id > 3) {
      style.backgroundColor = "red";
    } else {
      style.backgroundColor = "#00BFFF";
    }

    if (rowIndex > 2) {
      style.fontWeight = "bold";
      style.color = "white";
    }

    return style;
  };
  return (
    <div className="App">
      <BootstrapTable
        keyField="id"
        data={data}
        columns={columns}
        striped
        hover
        pagination={paginationFactory()}
        cellEdit={cellEditFactory({
          mode: "click",
          blurToSave: true,
        })}
        rowStyle={rowStyle2}
      />
    </div>
  );
}

export default App;
