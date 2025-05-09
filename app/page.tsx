import MainContents from "./_components/Main/MainContents";

export type Props = {
  selectedCategory?: number;
}

export default async function Page({ }: { params: Promise<Props> }) {
  return <MainContents />;
}
