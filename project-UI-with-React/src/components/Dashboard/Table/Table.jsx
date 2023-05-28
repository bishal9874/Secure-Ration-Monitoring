import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import useUserData from "../../../utils/useUserData";


const makeStyle=(status)=>{
  if(status === 'Approved')
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if(status === 'Pending')
  {
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else{
    return{
      background: '#59bfff',
      color: 'white',
    }
  }
}
export default function BasicTable() {
  const { userData, userKYCData, userRationDetails } = useUserData();
  const [tableData, setTableData] = useState([]);

  React.useEffect(() => {
    setTableData([
      createData("Rice", `${userRationDetails.id}`, `${userRationDetails.nextRationDate}`, "Approved", `${userRationDetails.rice}`),
      createData("Kerosene ", `${userRationDetails.id}`, `${userRationDetails.nextRationDate}`, "Pending", `${userRationDetails.kerosene}`),
      createData("oil", `${userRationDetails.id}`, `${userRationDetails.nextRationDate}`, "Approved", `${userRationDetails.oil}`),
      createData("Wheat", `${userRationDetails.id}`, `${userRationDetails.nextRationDate}`, "Delivered", `${userRationDetails.wheat}`),
    ]);
  }, [userRationDetails]);

  function createData(name, trackingId, date, status, Quantity) {
    return { name, trackingId, date, status, Quantity };
  }

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + encodeURI(
      [
        ["Product", "Tracking ID", "Next Date", "Status", "Quantity"].join(","),
        ...tableData.map(row => [row.name, row.trackingId, row.date, row.status, row.Quantity].join(","))
      ].join("\n")
    );
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", "Ration_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="Table">
     
      <h3>Ration List <span><img src="src/assets/icons/download (2).png" alt="" width={30} style={{marginleft:"30px",cursor:"pointer"}} onClick={downloadCSV}/></span></h3>
      
      
      
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029", backgroundImage: "src/assets/colorfu.jpg" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              {/* <TableCell align="left">Tracking ID</TableCell> */}
              <TableCell align="left">Next Date</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Quantity</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {tableData.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                {/* <TableCell align="left">{row.trackingId}</TableCell> */}
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="left">
                  <span className="status" style={makeStyle(row.status)}>{row.status}</span>
                </TableCell>
                <TableCell align="left" className="Details">{row.Quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          
        </Table>
      </TableContainer>
    </div>
  );
}
