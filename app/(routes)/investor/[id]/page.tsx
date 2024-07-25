"use client";
import styles from "@/app/page.module.scss";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSearchParams } from 'next/navigation';

const Investor = ({ params }: { params: { id: number } }) => {
  console.log(params);
    const searchParams = useSearchParams()
    const [assetClass, setAssetClass] = useState<string>();
    const [assets, setAssets] = useState<Array<string>>();
    const [commitment, setCommitment] = useState<Array<Commitment>>();

    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 100 },
      { field: 'asset_class', headerName: 'Asset Class', width: 150 },
      { field: 'firm_id', headerName: 'Firm ID', width: 150 },
      { field: 'currency', headerName: 'Currency', width: 150 },
      { field: 'amount', headerName: 'Amount', width: 250 },
    ];

    const getAssetClasses = async () => {
      const url = "http://localhost:8000/api/asset_classes";
      const response = await fetch(url);
      if(response.status === 200) {
        let data = await response.json();
        setAssets(data);
      }
    };

    const getCommitment = async (assetClass: string, investorID: number) => {
      const url = `http://localhost:8000/api/investor/commitment/${assetClass}/${investorID}`;
      const response = await fetch(url);
      if(response.status === 200) {
        let data = await response.json();
        setCommitment(data);
      }
    };

    useEffect(() => {
      getAssetClasses();
    }, []);

    useEffect(() => {
      console.log(assetClass);
      if(assetClass) {
        getCommitment(assetClass, params.id);
      }
    }, [assetClass]);

    return <main className={styles.main}>
    <div className={styles.center}>
      <div className={styles.title}>Investor: {searchParams.get("name")}</div>
      <div className={styles.assetsContainer}>
          {
            assets && assets.length > 0 && 
              <>
              <FormControl fullWidth className={styles.form}>
                <InputLabel id="asset-class-label" className={styles.label}>Asset Class</InputLabel>
                <Select
                    labelId="asset-class-label"
                    id="asset-class-select"
                    value={assetClass}
                    onChange={(event: SelectChangeEvent) => setAssetClass(event.target.value)}
                >
                    {
                        assets?.map(asset => <MenuItem value={asset}>{asset}</MenuItem>)
                    }
                    
                </Select>
              </FormControl>
              { commitment && 
                <DataGrid 
                  className={styles.investorsGrid} 
                  rows={commitment} 
                  columns={columns}
                  initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                  }}
                />
              }
              </>
          }
      </div>
    </div>
  </main>
}

export default Investor;