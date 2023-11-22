import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import encApiData from "../utils/Encounter.json";
import patientApiData from "../utils/Patient.json";
import { encDataNew, patDataNew } from "./AllApiData";

const Details = () => {
  const params = useParams();
  console.log(params);
  const location = useLocation();
  console.log(location);

  const filteredEncData = encDataNew(params.id);

  const filteredPatData = patDataNew(params.id);

  const [encData, setEncData] = useState(filteredEncData);
  const [patData, setPatData] = useState(filteredPatData);

  return (
    <>
      <h3>
        <NavLink
          to={`/${params.details}`}
          state={{
            filterAll: location?.state?.filterAll,
            dropdown: location?.state?.dropdown,
            gender: location?.state?.gender,
          }}
        >
          {params.details}
        </NavLink>
        {">"} Patient details
      </h3>
      <p>
        Email :
        {location.pathname === `/patients/patients-details/${params.id}`
          ? patData?.email
          : "N/A"}
      </p>
      <p>
        Full Name :
        {location.pathname === `/patients/patients-details/${params.id}`
          ? patData?.first_name
          : encData?.partner_display_name}
      </p>
      <p>
        Date of Birth :
        {location.pathname === `/patients/patients-details/${params.id}`
          ? patData?.dob
          : "N/A"}
      </p>
      <p>
        Gender:{" "}
        {location.pathname === `/patients/patients-details/${params.id}`
          ? patData?.gender
          : "N/A"}
      </p>
    </>
  );
};

export default Details;
