"use client";

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import styles from "../page.module.scss";
import { useRouter } from 'next/navigation';

export const InvestorsGrid = ({data} : {data: Array<Investors>}) => {
  const router = useRouter();

  const rows = data.map(item => ({
    id: item.firm_id,
    firm_id: item.firm_id,
    firm_name: item.firm_name,
    firm_type: item.firm_type,
    date_added: new Date(item.date_added)?.toLocaleDateString(),
    address: item.address 
  }));

  const columns: GridColDef[] = [
    { field: 'firm_id', headerName: 'Firm ID', width: 100 },
    { field: 'firm_name', headerName: 'Firm name', width: 150 },
    { field: 'firm_type', headerName: 'Type', width: 150 },
    { field: 'date_added', headerName: 'Date added', width: 150 },
    { field: 'address', headerName: 'Address', width: 250 },
  ];

    return <DataGrid 
        className={styles.investorsGrid} 
        rows={rows} 
        columns={columns}
        onRowClick={(params) => {
            router.push(`/investor/${params.id}?name=${params.row.firm_name}`)
        }} 
    />
}