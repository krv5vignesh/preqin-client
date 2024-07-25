import styles from "./page.module.css";
import React from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const getInvestors = async () => {
  const url = "http://localhost:8000/api/investors";
  const response = await fetch(url);
  let data;
  if(response.status === 200) {
    data = response.json();
  }
  return data;
}

export default async function Home() {
  const investorData:Array<Investors> = await getInvestors();

  const rows = investorData.map(item => ({
    id: item.firm_id,
    firm_id: item.firm_id,
    firm_name: item.firm_name,
    data_added: item.date_added,
    address: item.address 
  }));

  const columns: GridColDef[] = [
    { field: 'firm_id', headerName: 'Firm ID', width: 150 },
    { field: 'firm_name', headerName: 'Firm name', width: 150 },
    { field: 'firm_type', headerName: 'Type', width: 150 },
    { field: 'date_added', headerName: 'Date added', width: 150 },
    { field: 'address', headerName: 'Address', width: 150 },
  ];



  return (
    <main className={styles.main}>
      <div className={styles.center}>
        {
          investorData && <DataGrid className={styles.investorsGrid} rows={rows} columns={columns} />
        }
      </div>
    </main>
  );
}
