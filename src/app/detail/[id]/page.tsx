import {type BlogRowData} from '../../lib/dto'
import {Row} from "../../lib/data";
import styles from "./page.module.css";
import React from "react";
import DetailMarkdown from "./DetailMarkdown";

type Params = Promise<{ id: string }>

export default async function Page({params}: {params: Params}) {
    const { id } = await params;
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
            <DetailMarkdown className={styles.descriptionArea} />
          </section>
        </div>
    )
}
