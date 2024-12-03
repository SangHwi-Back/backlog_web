import {type BlogRowData} from '../../lib/dto'
import {Row} from "../../lib/data";
import styles from "./page.module.css";

export default async function Page({params}: {params: {id: string}}) {
    const id = params.id;
    const row = await Row(id);
    const {title, date} = row as BlogRowData;

    return (
        <div className={styles.background}>
          <section className={styles.titleArea}>
            <div className={styles.titleInformationArea}>
              <p style={{fontSize: 20, paddingLeft: 8, paddingRight: 8}}>{title}</p>
              <p style={{fontSize: 8, paddingRight: 8}}>{date}</p>
            </div>
          </section>
          
          <section className={styles.divider}/>
          
          <section className={styles.chipArea}>
            {[1,2,3].map((item) => {
              return (
                <div key={item} className={styles.chip}>
                  {'Testing'}
                </div>
              )
            })}
          </section>
          
          <section className={styles.descriptionArea}>
            <div className={styles.description}>
              {`
# 우주 탐사의 미래: 화성 정착지 건설 계획
## 서론
인류의 우주 탐사 역사는 끊임없는 도전과 혁신의 연속이었습니다. 달 착륙을 시작으로, 이제 우리는 더 먼 곳을 향해 나아가고 있습니다. 그 중에서도 화성은 인류의 다음 거대한 도약을 위한 핵심 목표가 되었습니다.
## 화성 정착의 필요성
화성 정착은 단순한 과학적 호기심을 넘어 인류의 생존과 발전을 위한 중요한 과제입니다. 지구의 자원 고갈과 환경 문제에 대한 대안으로서, 화성은 새로운 희망을 제시합니다.
1. 자원 확보: 화성의 풍부한 광물 자원
2. 과학 연구: 생명체 존재 가능성 탐구
3. 기술 혁신: 극한 환경 생존 기술 개발
## 화성 정착지 건설 계획
### 1. 초기 탐사 단계
- 무인 탐사선을 통한 지형 및 기후 조사
- 착륙 지점 선정 및 초기 기지 설립
### 2. 기반 시설 구축
- 산소 생성 시설 설치
- 방사선 차단 거주지 건설
- 식량 생산을 위한 온실 시스템 개발
### 3. 지속 가능한 생태계 조성
화성의 극한 환경에서 생존하기 위해서는 자급자족 가능한 생태계를 만드는 것이 필수적입니다. 이를 위해 다음과 같은 기술들이 개발되고 있습니다:
- 대기 테라포밍 기술
- 물 재활용 시스템
- 미생물을 이용한 토양 개량
## 기술적 도전과 해결 방안
화성 정착을 위해서는 아직 해결해야 할 기술적 과제들이 많이 있습니다.
1. 방사선 방호: 화성의 얇은 대기층은 유해한 우주 방사선을 충분히 차단하지 못합니다. 이를 위해 특수 소재의 우주복과 거주지 개발이 필요합니다.
2. 중력 문제: 화성의 중력은 지구의 약 38%에 불과합니다. 장기간 저중력 환경에 노출될 경우 발생할 수 있는 건강 문제를 해결하기 위한 연구가 진행 중입니다.
3. 심리적 고립: 지구와의 거리로 인한 통신 지연과 고립감은 우주 비행사들의 정신 건강에 큰 영향을 미칠 수 있습니다. 이를 위한 심리 지원 프로그램과 가상현실 기술 등이 개발되고 있습니다.
## 국제 협력의 중요성
화성 정착이라는 거대한 프로젝트는 한 국가나 기관의 노력만으로는 불가능합니다. 전 세계적인 협력이 필수적입니다.
- NASA, ESA, JAXA 등 주요 우주 기관들의 공동 연구
- 민간 기업들의 참여 (SpaceX, Blue Origin 등)
- 국제 우주법 제정을 통한 화성 자원의 공정한 활용 방안 모색
## 결론
화성 정착은 인류에게 주어진 가장 큰 도전 중 하나입니다. 이는 단순히 새로운 행성을 탐험하는 것을 넘어, 우리의 과학 기술과 협력 능력을 시험하는 거대한 프로젝트입니다. 성공적인 화성 정착은 인류 역사의 새로운 장을 열게 될 것이며, 우리의 미래에 대한 새로운 가능성을 제시할 것입니다.
우리는 지금 역사적인 순간의 문턱에 서 있습니다. 화성으로의 여정은 이제 막 시작되었지만, 우리의 끈기와 창의성, 그리고 협력을 통해 반드시 이 도전을 성공으로 이끌 수 있을 것입니다.
              `}
            </div>
          </section>
        </div>
    )
}
