
import React, { useEffect, useState } from 'react';


export const DataContext = React.createContext();
const ALLUserDataProvider = ({ children }) => {
  const [ploader, setPloader] = useState(false);







  return (
    <DataContext.Provider
      value={
        {
          // patientAllData,
          // setpatientAllData,
          // doctorAllData,
          // setdoctorAllData,
          // MedicalResearchLabAllData,
          // setMedicalResearchLabAllData,
          // PathologistAllData,
          // setPathologistAllData,
          // PharmacyCompanyAllData,
          // setPharmacyCompanyAllData,
          ploader, setPloader,
        }
      }>
      {children}
    </DataContext.Provider>
  );
};

export default ALLUserDataProvider;
