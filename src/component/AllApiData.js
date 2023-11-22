import React from "react";
import { useParams } from "react-router-dom";
import encApiData from "../utils/Encounter.json";
import patientApiData from "../utils/Patient.json";

function encDataNew(id, consultation) {
  let encData = encApiData.data;
  if (id) {
    encData = encData?.find((val) => val.id === Number(id));
  }
  if (consultation) {
    encData = encData.filter((val) => {
      return val.consultation_type === consultation;
    });
  }
  return encData;
}

function patDataNew(id, referral, selectedGender) {
  let patData = patientApiData.data;
  if (id) {
    patData = patData?.find((val) => val.id === Number(id));
  }
  if (referral) {
    patData = patData.filter((val) => {
      return val.referral_program === referral;
    });
  }
  if (selectedGender?.length > 0) {
    if (selectedGender) {
      patData = patData.filter((val) => {
        return val.gender === selectedGender;
      });
    }
  }
  return patData;
}

export { encDataNew, patDataNew };
