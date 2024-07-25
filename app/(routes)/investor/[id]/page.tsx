import styles from "@/app/page.module.css";

const Investor = ({ params }: { params: { id: number } }) => {
    return <main className={styles.main}>
    <div className={styles.center}>
      <div className={styles.title}> Investor {params.id}</div>
      
    </div>
  </main>
}

export default Investor;