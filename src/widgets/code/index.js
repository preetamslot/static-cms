import controlComponent from './CodeControl';
import previewComponent from './CodePreview';
import schema from './schema';

function Widget(opts = {}) {
  return {
    name: 'code',
    controlComponent,
    previewComponent,
    schema,
    allowMapValue: true,
    codeMirrorConfig: {},
    ...opts,
  };
}

export const StaticCmsWidgetCode = { Widget, controlComponent, previewComponent };
export default StaticCmsWidgetCode;
