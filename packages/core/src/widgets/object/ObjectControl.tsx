import React, { useMemo } from 'react';

import EditorControl from '@staticcms/core/components/entry-editor/editor-control-pane/EditorControl';
import useHasChildErrors from '@staticcms/core/lib/hooks/useHasChildErrors';
import { compileStringTemplate } from '@staticcms/core/lib/widgets/stringTemplate';
import widgetObjectClasses from './ObjectControl.classes';
import ObjectFieldWrapper from './ObjectFieldWrapper';

import type { ObjectField, ObjectValue, WidgetControlProps } from '@staticcms/core/interface';
import type { FC } from 'react';

import './ObjectControl.css';

const ObjectControl: FC<WidgetControlProps<ObjectValue, ObjectField>> = ({
  label,
  field,
  fieldsErrors,
  submitted,
  forList,
  forSingleList,
  duplicate,
  locale,
  path,
  i18n,
  errors,
  disabled,
  value = {},
  listItemPath,
}) => {
  const fields = useMemo(() => field.fields, [field.fields]);

  const objectLabel = useMemo(() => {
    const summary = field.summary;
    return summary
      ? `${label} - ${compileStringTemplate(summary, null, '', value, fields)}`
      : label;
  }, [field.summary, label, value]);

  const hasChildErrors = useHasChildErrors(path, fieldsErrors, i18n, false);

  const renderedField = useMemo(() => {
    return (
      fields?.map((field, index) => {
        let fieldName = field.name;
        let parentPath = path;
        const fieldValue = value && value[fieldName];

        if (forList && fields.length === 1) {
          const splitPath = path.split('.');
          fieldName = splitPath.pop() ?? field.name;
          parentPath = splitPath.join('.');
        }

        return (
          <EditorControl
            key={index}
            field={field}
            fieldName={fieldName}
            value={fieldValue}
            fieldsErrors={fieldsErrors}
            submitted={submitted}
            parentPath={parentPath}
            disabled={disabled || duplicate}
            parentDuplicate={duplicate}
            locale={locale}
            i18n={i18n}
            forSingleList={forSingleList}
            listItemPath={listItemPath}
          />
        );
      }) ?? null
    );
  }, [
    fields,
    path,
    value,
    forList,
    fieldsErrors,
    submitted,
    disabled,
    duplicate,
    locale,
    i18n,
    forSingleList,
    listItemPath,
  ]);

  if (fields.length) {
    if (forList) {
      return <div className={widgetObjectClasses['list-root']}>{renderedField}</div>;
    }

    return (
      <ObjectFieldWrapper
        key="object-control-wrapper"
        field={field}
        openLabel={label}
        closedLabel={objectLabel}
        errors={errors}
        hasChildErrors={hasChildErrors}
        hint={field.hint}
        disabled={disabled}
        forSingleList={forSingleList}
      >
        {renderedField}
      </ObjectFieldWrapper>
    );
  }

  return <div key="no-fields-found">No field(s) defined for this widget</div>;
};

export default ObjectControl;
