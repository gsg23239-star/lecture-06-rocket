import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import RocketCard from "../components/RocketCard.tsx";

export type RocketType = {
  id: string;
  name: string;
  description: string;
  active: boolean;
  cost_per_launch: number;
  country: string;
  flickr_images: string[];
};

function Home() {
  // loading이라는 state은 초기값을 true로 넣었기 때문에
  // 타입스크립트 엔진이 "타입추론"을 통해 이 loading이라는 state의 타입을 boolean으로 추론
  const [loading, setLoading] = useState(true); // true, false

  // list라는 state에 초기값을 []로 넣어버리면.
  // 타입스크립트 엔진은 "타입추론"을 통해 추측을 []라고 하는데, 그안에 들어갈 요소의 타입은 알수 없음
  // 얘가 안에 들어가는 요소의 타입을 알 수없기때문에 결국, never[] 로 타입 추론을 해버림
  const [list, setList] = useState<RocketType[]>([]);

  useEffect(() => {
    // 비동기 함수의 반대는 동기 함수
    // 동기 함수는 : 일반 함수들 -> 원래부터 자바스크립트 엔진이 실행하면 결과가 나온 뒤에 다음 줄로 넘어가는 함수들
    fetch("https://api.spacexdata.com/v4/rockets")
      .then((response) => {
        // response는 상대방이 보내준 정보 자체이므로, string으로 들어옴
        // 그걸 response.json()을 실행시켜 자바스크립트의 객체 또는 배열의 형태로 가공
        return response.json();
      })
      .then((json: RocketType[]) => {
        // 우리가 타입을 지정해주지 않으면 가공된 결과값을 자바스크립트 엔진은 "실행하기 전까지" 알 수 없음
        // 그렇기 때문에 초기 타입은 any임
        setList(json);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>spaceX Archive</h1>
      </header>
      <main className={styles.content}>
        {loading ? (
          <div className={styles.loading}>SCANNING FOR ROCKET...</div>
        ) : (
          <div className={styles.flexContainer}>
            {list.map((value, index) => (
              <div key={index} className={styles.flexItem}>
                <RocketCard rocket={value} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
