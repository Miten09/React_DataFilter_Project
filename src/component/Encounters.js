import React, { useEffect, useState } from "react";
import {
  NavLink,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Enc from "../utils/Encounter";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import encApiData from "../utils/Encounter.json";
import { encDataNew, patDataNew } from "./AllApiData";

const Encounters = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState([]);
  const location = useLocation();
  console.log("ENCOUNTERLOCATION", location);

  const [selectOption, setSelectOption] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [encounterData, setEncounterData] = useState(encDataNew());
  const [searchParams, setSearchParams] = useSearchParams();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  useEffect(() => {
    let id = "";
    const apiFilteredData = encDataNew(id, selectOption);
    setFilteredData(apiFilteredData);
  }, [selectOption]);

  useEffect(() => {
    searchParams.get("myParam")
      ? setSelectOption(decodeURI(searchParams.get("myParam")))
      : setSelectOption(location?.state?.dropdown);
  }, []);

  console.log("??????", selectOption);

  console.log("FILTERDATA", filteredData);
  console.log("EncounterData", encounterData);

  // console.log("DATEVALUES", values);

  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        <label>Consultation Type</label>
        <br />
        <select
          name="consultation"
          style={{ height: "3%" }}
          onChange={(e) => {
            setSelectOption(e.target.value);
            setSearchParams({ myParam: encodeURI(e.target.value) });
          }}
          value={selectOption}
        >
          <option value="All">All</option>
          <option value="FH Test">FH Test</option>
          <option value="Get Started - No Results ">
            Get Started - No Results
          </option>
          <option value="CDT Consultation">CDT Consultation</option>
        </select>
        <br />
        <br />
        <br />
      </div>

      {/* <Calendar value={values} onChange={setValues} multiple range /> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1100 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date of Service</StyledTableCell>
              <StyledTableCell align="right">Patient Name</StyledTableCell>
              <StyledTableCell align="right">Consultation Type</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.length > 0
              ? filteredData.map((val, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {new Date(val.date_of_service).toLocaleDateString()}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <NavLink
                        to={`/encounters/patients-details/${val.id}`}
                        state={{
                          filterAll: filteredData,
                          dropdown: selectOption,
                        }}
                      >
                        {val.partner_display_name}
                      </NavLink>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {val.consultation_type}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              : encounterData.map((val, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {new Date(val.date_of_service).toLocaleDateString()}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <NavLink
                        to={`/encounters/patients-details/${val.id}`}
                        state={encounterData[index]}
                      >
                        {val.partner_display_name}
                      </NavLink>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {val.consultation_type}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Encounters;
