import styles from "./RocketCard.module.css";
import type { RocketType } from "../routes/Home.tsx";
import { Link } from "react-router";

function RocketCard({ rocket }: { rocket: RocketType }) {
  return (
    <Link to={`/${rocket.id}`} className={styles.card}>
      <h3 className={styles.name}>{rocket.name}</h3>
      <div className={styles.country}>
        {/* before */}
        {rocket.country}
        {/* after */}
      </div>
    </Link>
  );
}

export default RocketCard;
