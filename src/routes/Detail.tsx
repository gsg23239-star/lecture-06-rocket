import { useEffect, useState } from "react";
import type { RocketType } from "./Home.tsx";
import { Link, useParams } from "react-router";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [rocket, setRocket] = useState<RocketType | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`https://api.spacexdata.com/v4/rockets/${id}`)
      .then((res) => res.json())
      .then((json: RocketType) => {
        setRocket(json);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>접속 중...</div>;
  }

  if (!rocket) {
    return <div className={styles.loading}>로켓 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.container}>
      <Link to={"/"} className={styles.backLink}>
        &larr; 목록으로 돌아가기
      </Link>

      <article className={styles.article}>
        {rocket.flickr_images[0] && (
          <div className={styles.imageWrapper}>
            <img
              src={rocket.flickr_images[0]}
              alt={rocket.name}
              className={styles.rocketImage}
            />
          </div>
        )}

        <div className={styles.info}>
          <h1>
            {/*
                            h1은 block 요소라, background가 width: 100%로 적용 중
                            그래서, 그 안에 span으로 inline을 주고, style 적용
                        */}
            <span className={styles.name}>{rocket.name}</span>
          </h1>
          <p className={styles.description}>{rocket.description}</p>

          <div className={styles.specs}>
            <div className={styles.specItem}>
              <span className={styles.label}>발사 비용</span>
              <span className={styles.value}>
                $ {rocket.cost_per_launch.toLocaleString()}
              </span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.label}>제조 국가</span>
              <span className={styles.value}>{rocket.country}</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.label}>상태</span>
              <span
                className={styles.value}
                style={{ color: rocket.active ? "#10b981" : "#ef4444" }}
              >
                {rocket.active ? "운용 중" : "비운용"}
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Detail;
