import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import Enc from "../utils/Encounter";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Pat from "../utils/Patient";
import Select from "react-dropdown-select";
import { encDataNew, patDataNew } from "./AllApiData";

const Patients = () => {
  const [selectOption, setSelectOption] = useState("");
  const [patientData, setPatientData] = useState(patDataNew());
  const [filteredData, setFilteredData] = useState([]);
  const location = useLocation();
  console.log("!!!!!!!!!!!!!!!!!!!!!!!", location);

  //  options = [
  //   //   { id: "male", name: 1 },
  //   //   { id: "Female", name: 2 },
  //   //   { id: "Other", name: 3 },
  //   //   { id: "transgender - female to male", name: 4 },
  //   // ];

  const [selectedGender, setSelectedGender] = useState(
    location.state?.gender || []
  );
  const navigate = useNavigate();
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

  let options = "";

  const [gender, setGender] = useState(options);

  useEffect(() => {
    let id = "";
    const apiFilteredData = patDataNew(id, selectOption, selectedGender[0]?.id);
    setFilteredData(apiFilteredData);

    if (
      selectOption === " UCLA Health" ||
      selectOption === "DTC_Proactive" ||
      selectOption === "outreach"
    ) {
      const genderDropdownFilter = apiFilteredData.map((val) => {
        return val.gender;
      });

      if (genderDropdownFilter) {
        const noDuplicatesFilteredData = genderDropdownFilter.filter(
          (item, index) => genderDropdownFilter.indexOf(item) === index
        );

        options = noDuplicatesFilteredData.map((val, index) => ({
          id: val,
          name: index + 1,
        }));
      }
    } else {
      options = [
        { id: "male", name: 1 },
        { id: "female", name: 2 },
        { id: "other", name: 3 },
        {
          id: "transgender - female to male",
          name: 4,
        },
      ];
    }
    setGender(options);
  }, [selectOption, selectedGender]);

  useEffect(() => {
    setSelectOption(location?.state?.dropdown);
  }, []);

  console.log("SELECTOPTION", selectOption);
  console.log("SELECTGENDER", selectedGender);

  function handleOptions(selectedValues) {
    setSelectedGender(selectedValues);
  }

  return (
    <>
      <br />
      <div style={{ display: "flex" }}>
        <label>Referral Program</label>
        <select
          name="consultation"
          style={{ height: "5%" }}
          onChange={(e) => setSelectOption(e.target.value)}
          value={selectOption}
        >
          <option value="">All</option>
          <option value=" UCLA Health">UCLA Health</option>
          <option value="DTC_Proactive">DTC_Proactive</option>
          <option value="outreach">outreach</option>
        </select>
        &nbsp;&nbsp;
        <br />
        <br />
        <br />
        <label>Gender</label>
        <Select
          style={{ width: "120%" }}
          name="select"
          options={gender}
          labelField="id"
          valueField="name"
          multi
          onChange={handleOptions}
        ></Select>
      </div>
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1100 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell align="right">Patient Name</StyledTableCell>
              <StyledTableCell align="right">Gender</StyledTableCell>
              <StyledTableCell align="right">Referral Program</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.length > 0
              ? filteredData.map((val, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {val.email}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <NavLink
                        to={`/patients/patients-details/${val.id}`}
                        state={{
                          filterAll: filteredData,
                          dropdown: selectOption,
                          gender: selectedGender,
                        }}
                      >
                        {val.first_name}
                      </NavLink>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {val.gender}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {val.referral_program}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              : patientData.map((val, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {val.email}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <NavLink
                        to={`/patients/patients-details/${val.id}`}
                        state={{
                          // indexFilter: patientData[index],
                          gender: selectedGender,
                          filterAll: patientData,
                        }}
                      >
                        {val.first_name}
                      </NavLink>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {val.gender}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {val.referral_program}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Patients;
