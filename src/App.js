import "./App.css";
import { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
// import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import "bootstrap/dist/css/bootstrap.min.css";
import ToolkitProvider, {
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

function App() {
  const { ExportCSVButton } = CSVExport;
  const [file, setFile] = useState("");
  const [Array, setArray] = useState([""]);
  const [Classdata, setClassdata] = useState("");
  const [expression1, setexpression1] = useState("");
  const [expression2, setexpression2] = useState("");
  const [expression3, setexpression3] = useState("");
  const [expression4, setexpression4] = useState("");
  const [expression5, setexpression5] = useState("");
  const [expression6, setexpression6] = useState("");
  const [logic, setlogic] = useState("AND");
  const [showform, setshowform] = useState("");
  const [data, setdata] = useState([
    {
      Id: "1",
      Class: "Invoice",
      LOGIC: "OR",
      Expression1: "Invoice Numeber",
      Expression2: "Invoice #",
      Expression3: "Invoice No",
      Expression4: "Tax Invoice ",
      Expression5: "",
      Expression6: "",
    },
    {
      Id: "2",
      Class: "Purchase order",
      LOGIC: "OR",
      Expression1: "PO Numeber",
      Expression2: "Order Numeber",
      Expression3: "Order No",
      Expression4: "",
      Expression5: "",
      Expression6: "",
    },
    {
      Id: "3",
      Class: "Bill",
      LOGIC: "OR",
      Expression1: "Bill Date",
      Expression2: "Billing Period",
      Expression3: "Bill Numeber",
      Expression4: "",
      Expression5: "",
      Expression6: "",
    },
    {
      Id: "4",
      Class: "Bank Statement",
      LOGIC: "OR",
      Expression1: "Account Statement",
      Expression2: "Statement of Account",
      Expression3: "Business Checking",
      Expression4: "Accounts Payable",
      Expression5: "Statement No",
      Expression6: "",
    },
    {
      Id: "5",
      Class: "Income Statement",
      LOGIC: "OR",
      Expression1: "Income Statement",
      Expression2: "",
      Expression3: "",
      Expression4: "",
      Expression5: "",
      Expression6: "",
    },
    {
      Id: "6",
      Class: "Has US Number",
      LOGIC: "OR",
      Expression1: "/\b-?(d+,?)+(.dd)\b/",
      Expression2: "",
      Expression3: "",
      Expression4: "",
      Expression5: "",
      Expression6: "",
    },
  ]);

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = (string) => {
    console.log(string);
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
    setArray(array);
    console.log(array);
    array.map((item, index) => {
      const newObj = {
        id: item.Id,
        classdata: item.Class,
        logic: item.LOGIC,
        Expression1: item.Expression1,
        Expression2: item.Expression2,
        Expression3: item.Expression3,
        Expression4: item.Expression4,
        Expression5: item.Expression5,
        Expression6: item.Expression6,
      };
      return newObj;
    });
    console.log(array);
    setdata([...array]);
  };

  console.log(data);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        console.log(text);
        if (text) {
          csvFileToArray(text);
        } else {
          console.log("empty");
        }
      };

      fileReader.readAsText(file);
    }
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    setdata([
      ...data,
      {
        classdata: Classdata,
        logic: logic,
        Expression1: expression1,
        Expression2: expression2,
        Expression3: expression3,
        Expression4: expression4,
        Expression5: expression5,
        Expression6: expression6,
      },
    ]);
    setshowform(false);
  };
  const columns = [
    {
      dataField: "Id",
      text: "Id",
    },
    {
      dataField: "Class",
      text: "Class",
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
      dataField: "LOGIC",
      text: "LOGIC",
      editor: {
        type: Type.SELECT,
        options: [
          {
            value: "OR",
            label: "OR",
          },
          {
            value: "AND",
            label: "AND",
          },
        ],
      },
    },
    {
      dataField: "Expression1",
      text: "Expression1",
      sort: true,
    },
    {
      dataField: "Expression2",
      text: "Expression2",
      sort: true,
    },
    {
      dataField: "Expression3",
      text: "Expression3",
      sort: true,
    },
    {
      dataField: "Expression4",
      text: "Expression4",
      sort: true,
    },
    {
      dataField: "Expression5",
      text: "Expression5",
      sort: true,
    },
    {
      dataField: "Expression6",
      text: "Expression6",
      sort: true,
    },
  ];
  const updatedata = (row, newValue) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === row.id) {
        data[i].column = newValue;
      }
    }
    console.log(data);
  };
  return (
    <div className="App">
      <button onClick={() => setshowform(true)}>Add a Row</button>
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
      </form>
      {console.log(data)}

      {/* <BootstrapTable
        keyField="id"
        data={data}
        columns={columns}
        cellEdit={cellEditFactory({
          mode: "dbclick",
          blurToSave: true,
          afterSaveCell: (oldValue, newValue, row, column) => {
            updatedata(row, column, newValue);
          },
        })}
      /> */}
      <ToolkitProvider exportCSV>
        {(props) => (
          <div>
            <ExportCSVButton {...props.csvProps}>Export CSV!!</ExportCSVButton>
            <hr />
            <BootstrapTable
              keyField="id"
              data={data}
              columns={columns}
              cellEdit={cellEditFactory({
                mode: "dbclick",
                blurToSave: true,
                afterSaveCell: (oldValue, newValue, row, column) => {
                  updatedata(row, column, newValue);
                },
              })}
            />
          </div>
        )}
      </ToolkitProvider>

      {showform ? (
        <div class="form-popup">
          <form class="form-container" onSubmit={handleAddFormSubmit}>
            <input
              type="text"
              name="Class"
              placeholder="Enter a class..."
              onChange={(e) => setClassdata(e.target.value)}
            />
            <input
              type="text"
              name="Logic"
              placeholder="Enter a Logic..."
              onChange={(e) => setlogic(e.target.value)}
            />
            <input
              type="text"
              name="Expression 1"
              placeholder="Enter an Expression 1..."
              onChange={(e) => setexpression1(e.target.value)}
            />

            <input
              type="text"
              name="Expression 2"
              placeholder="Enter an Expression 2..."
              onChange={(e) => setexpression2(e.target.value)}
            />

            <input
              type="text"
              name="Expression 3"
              placeholder="Enter an Expression 3..."
              onChange={(e) => setexpression3(e.target.value)}
            />

            <input
              type="text"
              name="Expression 4"
              placeholder="Enter an Expression 4..."
              onChange={(e) => setexpression4(e.target.value)}
            />

            <input
              type="text"
              name="Expression 5"
              placeholder="Enter an Expression 5..."
              onChange={(e) => setexpression5(e.target.value)}
            />

            <input
              type="text"
              name="Expression 6"
              placeholder="Enter an Expression 6..."
              onChange={(e) => setexpression6(e.target.value)}
            />
            <button type="submit">Add</button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default App;
