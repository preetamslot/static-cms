import { ContentCopy as ContentCopyIcon } from '@styled-icons/material/ContentCopy';
import copyToClipboard from 'copy-text-to-clipboard';
import React, { useCallback, useEffect, useState } from 'react';

import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import { isAbsolutePath } from '@staticcms/core/lib/util';
import Button from '../../common/button/Button';
import mediaLibraryClasses from './MediaLibrary.classes';

import type { FC } from 'react';

export interface CopyToClipBoardButtonProps {
  draft?: boolean;
  path?: string;
  name?: string;
}

const CopyToClipBoardButton: FC<CopyToClipBoardButtonProps> = ({ draft, path, name }) => {
  const t = useTranslate();

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let alive = true;

    const timer = setTimeout(() => {
      if (alive) {
        setCopied(false);
      }
    }, 1500);

    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, []);

  const handleCopy = useCallback(() => {
    if (!path || !name) {
      return;
    }

    copyToClipboard(isAbsolutePath(path) || !draft ? path : name);
    setCopied(true);
  }, [draft, name, path]);

  const getTitle = useCallback(() => {
    if (copied) {
      return t('mediaLibrary.mediaLibraryCard.copied');
    }

    if (!path) {
      return t('mediaLibrary.mediaLibraryCard.copy');
    }

    if (isAbsolutePath(path)) {
      return t('mediaLibrary.mediaLibraryCard.copyUrl');
    }

    if (draft) {
      return t('mediaLibrary.mediaLibraryCard.copyName');
    }

    return t('mediaLibrary.mediaLibraryCard.copyPath');
  }, [copied, draft, path, t]);

  return (
    <Button
      variant="text"
      title={getTitle()}
      onClick={handleCopy}
      className={mediaLibraryClasses['copy-to-clipboard-button']}
    >
      <ContentCopyIcon className={mediaLibraryClasses['copy-to-clipboard-button-icon']} />
    </Button>
  );
};

export default CopyToClipBoardButton;
