import {PageContents} from "../../page";

export default async function Page({
  params
}: {
  params: Promise<{ selectedCategory: string | undefined }>
}) {
  const { selectedCategory } = await params;
  console.log('테스트입니다', selectedCategory);
  
  if (selectedCategory) {
    return <PageContents selectedCategory={Number(selectedCategory)}/>;
  } else {
    return <PageContents selectedCategory={-1}/>;
  }
}
