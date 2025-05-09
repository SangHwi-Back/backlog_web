import { Props } from "../../page";
import MainContents from "../../_components/Main/MainContents";

export default async function SelectedCategoryPage({ params }: { params: Promise<Props> }) {
  const categoryId = Number((await params).selectedCategory);

  if (!isNaN(categoryId)) {
    return <MainContents selectedCategory={categoryId} />;
  } else {
    return <MainContents />;
  }
}
