// @flow

import cssjanus from 'cssjanus';
import { compile, KEYFRAMES, RULESET, stringify } from 'stylis';

function stylisRTLPlugin(element: Object, index: number, children: Object[], callback: Function): ?string {
  if (element.type === RULESET || element.type === KEYFRAMES) {
    element.children = compile(`{${cssjanus.transform(element.children.map((x) => x.value).join('\n'))}}`)[0].children;
  }
}

// stable identifier that will not be dropped by minification unless the whole module
// is unused
Object.defineProperty(stylisRTLPlugin, 'name', { value: 'stylisRTLPlugin' });

export default stylisRTLPlugin;
