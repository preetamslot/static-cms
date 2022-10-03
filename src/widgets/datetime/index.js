import controlComponent from './DateTimeControl';
import previewComponent from './DateTimePreview';
import schema from './schema';

function Widget(opts = {}) {
  return {
    name: 'datetime',
    controlComponent,
    previewComponent,
    schema,
    ...opts,
  };
}

export const StaticCmsWidgetDatetime = { Widget, controlComponent, previewComponent };
export default StaticCmsWidgetDatetime;
