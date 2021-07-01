import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { HTMLAttributes, ReactNode } from 'react';

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type HeadingElement = {
  type: 'heading';
  level: number;
  children: CustomText[];
};

export type ParagraphElement = {
  type: 'paragraph';
  children: CustomText[];
};

export type BlockQuoteElement = {
  type: 'block-quote';
  children: CustomText[];
};

export type ListElement = {
  type: 'bulleted-list' | 'list-item' | 'numbered-list';
  children: CustomText[];
};

export type CustomElement = ParagraphElement | HeadingElement | BlockQuoteElement | ListElement;

export type FormattedText = { type: 'paragraph'; children: [{ text: ' ' }] };

export type CustomText = FormattedText;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export interface HotkeyProps {
  [key: string]: string;
}

export type RenderElementType = (props: {
  attributes: HTMLAttributes<HTMLElement>;
  children: ReactNode;
  element: CustomElement;
}) => JSX.Element;

export type Leaf = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
};

export type RenderLeafType = (props: {
  attributes: HTMLAttributes<HTMLElement>;
  children: ReactNode;
  leaf: Leaf;
}) => JSX.Element;

export type BlockButtonType = (props: { format: ListElement['type']; icon: ReactNode }) => JSX.Element;

export type MarkButtonType = (props: { format: keyof Leaf; icon: ReactNode }) => JSX.Element;

export const HOTKEYS: HotkeyProps = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

export const LIST_TYPES: (string | boolean)[] = ['numbered-list', 'bulleted-list'];
