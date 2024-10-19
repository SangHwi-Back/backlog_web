import style from "./layout.module.css";

export default function MainThumbnail() {
  return <div className={style.thumbnail}>
    <div style={{
      width: "350px",
      height: "305px",
      backgroundColor: "red",
    }}>
    </div>
  </div>;
}