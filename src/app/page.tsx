import MainTopArea from "@/app/_components/Main/Top/MainTopArea";
import MainBottomArea from "@/app/_components/Main/Bottom/MainBottomArea";

export default async function Page() {
  return <div>
    <MainTopArea/>
    <MainBottomArea selectedCategory={-1}/>
  </div>
}
