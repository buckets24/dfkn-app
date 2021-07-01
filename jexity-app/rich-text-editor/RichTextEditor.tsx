import React, { FC, KeyboardEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Editable, withReact, useSlate, Slate } from 'slate-react';
import { Editor, Transforms, createEditor, Descendant, Element as SlateElement } from 'slate';
import { withHistory } from 'slate-history';
import { HStack, ListItem, OrderedList, Text, UnorderedList } from '@chakra-ui/layout';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Icon,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import {
  BlockButtonType,
  CustomEditor,
  HOTKEYS,
  ListElement,
  LIST_TYPES,
  MarkButtonType,
  RenderElementType,
  RenderLeafType,
} from './richTextEditorApi';
import isHotkey from 'is-hotkey';
import { BoldIcon } from 'jexity-app/icons/BoldIcon';
import { ItalicIcon } from 'jexity-app/icons/ItalicIcon';
import { UnderlineIcon } from 'jexity-app/icons/UnderLineIcon';
import { NumberListIcon } from 'jexity-app/icons/NumberListIcon';
import { BulletListIcon } from 'jexity-app/icons/BulletListIcon';
import { useFormikByName } from 'jexity-app/form/useFormikByName';
import { FieldControl } from 'jexity-app/form/fields/fieldApi';
import { ErrorMessageContainer } from 'jexity-app/form/fields/common/ErrorMessageContainer';
import { Node } from 'slate';
import { flushedLabelStyle } from 'jexity-app/styles/form/flushedLabel';

export type RichTextEditorFieldType = Omit<FieldControl<HTMLInputElement>, 'value'> & {
  name: string;
  label?: string;
  value?: Descendant[] | string;
  isRequired?: boolean;
};

const Element: RenderElementType = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return (
        <Box as="blockquote" {...attributes}>
          {children}
        </Box>
      );
    case 'bulleted-list':
      return <UnorderedList {...attributes}>{children}</UnorderedList>;
    case 'list-item':
      return <ListItem {...attributes}>{children}</ListItem>;
    case 'numbered-list':
      return <OrderedList {...attributes}>{children}</OrderedList>;
    default:
      return <Text {...attributes}>{children}</Text>;
  }
};

const Leaf: RenderLeafType = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <Text as="strong">{children}</Text>;
  }

  if (leaf.italic) {
    children = <Text as="em">{children}</Text>;
  }

  if (leaf.underline) {
    children = <Text as="u">{children}</Text>;
  }

  return (
    <Box as="span" {...attributes}>
      {children}
    </Box>
  );
};

const isBlockActive = (editor: CustomEditor, format: string) => {
  const [match]: any = Editor.nodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

const toggleBlock = (editor: CustomEditor, format: ListElement['type']) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(!Editor.isEditor(n) && SlateElement.isElement(n) && n.type),
    split: true,
  });
  const newProperties: Partial<SlateElement> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const BlockButton: BlockButtonType = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      size="sm"
      isActive={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
      _active={{
        bg: 'brand.primary.500',
        color: 'white',
      }}
      _hover={{
        bg: 'brand.primary.500',
        color: 'white',
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const isMarkActive = (editor: CustomEditor, format: string) => {
  const marks: any = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor: CustomEditor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const MarkButton: MarkButtonType = ({ format, icon }) => {
  const editor = useSlate();

  return (
    <Button
      size="sm"
      isActive={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      _active={{
        bg: 'brand.primary.500',
        color: 'white',
      }}
      _hover={{
        bg: 'brand.primary.500',
        color: 'white',
      }}
    >
      {icon}
    </Button>
  );
};

export const RichTextEditor: FC<RichTextEditorFieldType> = ({
  variant = 'default',
  name,
  label,
  isInvalid,
  error,
  value,
  onBlur,
  onChange,
  errorMessageSpacer = true,
  isRequired = false,
  showRequiredIcon = true,
  isReadOnly = false,
  helperText,
}) => {
  const [slateValue, setSlateValue] = useState<Descendant[]>(
    typeof value === 'string' && value.length > 0
      ? JSON.parse(value)
      : [{ type: 'paragraph', children: [{ text: '' }] }]
  );

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [showEditor, setShowEditor] = useState(false);
  const styles = useMultiStyleConfig('Form', {
    size: 'lg',
    variant: variant ? variant : 'default',
  });

  useEffect(() => {
    onChange(slateValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slateValue]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShowEditor(true);
    }
  }, []);

  return (
    <FormControl id={name} isInvalid={isInvalid} isRequired={isRequired && showRequiredIcon} sx={styles.formControl}>
      {label && (
        <FormLabel {...(flushedLabelStyle(variant, styles.formLabel, undefined) as FormLabelProps)}>{label}</FormLabel>
      )}
      <Slate
        editor={editor}
        value={isReadOnly ? typeof value === 'string' && JSON.parse(value) : slateValue}
        onChange={(val) => setSlateValue(val)}
      >
        {!isReadOnly && (
          <HStack spacing={1} mb={1} pb={1}>
            <MarkButton format="bold" icon={<BoldIcon />} />
            <MarkButton format="italic" icon={<ItalicIcon />} />
            <MarkButton format="underline" icon={<UnderlineIcon />} />
            <BlockButton format="numbered-list" icon={<NumberListIcon />} />
            <BlockButton format="bulleted-list" icon={<BulletListIcon />} />
          </HStack>
        )}
        <Box
          minH={isReadOnly ? 'auto' : '139px'}
          borderWidth={isReadOnly ? 0 : '1px'}
          borderColor={isInvalid ? 'support.alert.500' : 'gray.300'}
          borderRadius="md"
        >
          {showEditor && (
            <Editable
              as="div"
              name={name}
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              spellCheck
              autoFocus
              placeholder="Geben Sie einen Rich-Text ein ..."
              style={{
                padding: '5px',
                maxHeight: isReadOnly ? '100%' : '300px',
                height: '100%',
                overflowX: 'hidden',
                overflowY: 'auto',
              }}
              readOnly={isReadOnly}
              onBlur={onBlur}
              onKeyDown={(event: KeyboardEvent<HTMLDivElement> | any) => {
                for (const hotkey in HOTKEYS) {
                  if (isHotkey(hotkey, { byKey: false }, event)) {
                    event.preventDefault();
                    const mark = HOTKEYS[hotkey];
                    toggleMark(editor, mark);
                  }
                }
              }}
            />
          )}
        </Box>
        {variant === 'default' || variant === 'flushed' ? (
          <ErrorMessageContainer errorMessageSpacer={errorMessageSpacer}>
            {helperText && !isInvalid && <FormHelperText sx={styles.formHelper}>{helperText}</FormHelperText>}
            <FormErrorMessage>{error}</FormErrorMessage>
          </ErrorMessageContainer>
        ) : null}
      </Slate>
    </FormControl>
  );
};

export const RichTextEditorFormikField: FC<RichTextEditorFieldType> = ({ name, ...props }) => {
  const { value, touch, error, onBlur, setFieldValue, setFieldTouched } = useFormikByName(name);

  // const getValue = typeof value === 'string' ? JSON.parse(value) : [{ type: 'paragraph', children: [{ text: '' }] }];
  const memoizedOnChange = useCallback<NonNullable<RichTextEditorFieldType['onChange']>>(
    (value: Descendant[]) => {
      /**
       * Serialize nodes into plain text
       */
      const stringValue = value.map((n) => Node.string(n)).join('\n');
      setFieldValue?.(name, stringValue.length > 0 ? JSON.stringify(value) : '');
      setFieldTouched?.(name, true);
    },
    [name, setFieldTouched, setFieldValue]
  );

  return (
    <RichTextEditor
      name={name}
      isInvalid={touch && error ? true : false}
      value={value}
      error={error}
      onBlur={onBlur}
      onChange={memoizedOnChange}
      {...props}
    />
  );
};
