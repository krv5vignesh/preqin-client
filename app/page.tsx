import { InvestorsGrid } from "./components/InvestorsGrid";
import styles from "./page.module.css";
import React from "react";

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


  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <div className={styles.title}> Preqin Investors</div>
        {
          investorData && 
            <InvestorsGrid data={investorData} />
        }
      </div>
    </main>
  );
}
