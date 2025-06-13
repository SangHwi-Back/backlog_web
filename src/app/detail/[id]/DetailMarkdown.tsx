'use client';

import MarkdownPreview from "@uiw/react-markdown-preview";
import React from "react";

interface Props {
  contents: string;
  style: React.CSSProperties;
}

export default function DetailMarkdown({ contents, style }: Props) {
  return (
    <MarkdownPreview style={style} source={contents} />
  )
}
