import {type BlogRowData} from '../../lib/dto'
import {Row} from "../../lib/data";
import React from "react";
import { BackButton } from "../../_components/Insert/BackButton";
import { TitleLabel } from "../../_components/Insert/TitleLabel";
import { markdownPreviewStyles } from '@/app/insert/(style)/markdownPreviewStyles';
import DetailMarkdown from './DetailMarkdown';

type Params = Promise<{ id: string }>

export default async function Page({params}: {params: Params}) {
    const { id } = await params;
    const row = await Row(id);
    const {title, date, description} = row as BlogRowData;

    return (
        <div className="min-h-screen bg-[#f7f5f2] p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <BackButton />
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                        <p className="text-sm text-gray-500">{date}</p>
                    </div>

                    <div className="mb-6">
                        <TitleLabel text="Categories" />
                        <div className="flex flex-wrap gap-2">
                            {[1,2,3].map((item) => (
                                <span
                                    key={item}
                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100"
                                >
                                    Testing
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <TitleLabel text="Content" />
                        <div className="w-full min-h-[600px] p-4 border border-gray-300 rounded-md bg-white overflow-auto">
                          <DetailMarkdown style={markdownPreviewStyles} contents={"**"+description+"**"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
