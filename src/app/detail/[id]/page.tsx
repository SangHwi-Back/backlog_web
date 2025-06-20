import { type BlogRowData } from '../../lib/dto'
import { Row } from "../../lib/data";
import {ReactNode} from "react";
import { BackButton } from "../../_components/Insert/BackButton";
import { TitleLabel } from "../../_components/Insert/TitleLabel";
import { markdownPreviewStyles } from '@/app/insert/(style)/markdownPreviewStyles';
import DetailMarkdown from './DetailMarkdown';

type Props = { params: Promise<{ id: string }>; };
type BackgroundProps = { children: ReactNode; };
type TitleProps = { title: string; date: string; };
type CategoryProps = { categories: string[]; };
type ContentProps = { description: string; };

export default async function Page({ params }: Props) {
  const { id } = await params;
  const row = await Row(id);
  const { title, date, description } = row as BlogRowData;
  
  const Background = ({children}: BackgroundProps) => {
    return <div className="bg-white rounded-lg shadow-sm p-6 mt-4">
      {children}
    </div>
  }
  
  const Title = ({title, date}: TitleProps) => {
    return <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-sm text-gray-500">{date}</p>
    </div>
  }
  
  const Category = ({categories}: CategoryProps) => {
    return <div className="mb-6">
      <TitleLabel text="Categories" />
      <div className="flex flex-wrap gap-2">
        {categories.map((item) => (
          <span key={item} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100">
            {item}
          </span>
        ))}
      </div>
    </div>
  }
  
  const Content = ({description}: ContentProps) => {
    return <div className="mb-6">
      <TitleLabel text="Content" />
      <div className="w-full min-h-[600px] p-4 border border-gray-300 rounded-md bg-white overflow-auto">
        <DetailMarkdown style={markdownPreviewStyles} contents={description} />
      </div>
    </div>
  }
  
  return (
    <div className="min-h-screen bg-[#f7f5f2] p-6">
      <div className="max-w-7xl mx-auto">
        <BackButton />
        
        <Background>
          <Title title={title} date={date} />
          
          <Category categories={["Test", "Categories", "Are testing"]} />
          
          <Content description={"**" + description + "**"} />
        </Background>
      </div>
    </div>
  )
}
