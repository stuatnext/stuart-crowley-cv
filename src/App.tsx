/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import InteractiveCV from './InteractiveCV';
import PrintableCV from './PrintableCV';

export default function App() {
  // ?print=1 renders the A4 printable view — used by scripts/generate-pdf.mjs
  // to produce public/Stuart-Crowley-CV.pdf, and handy for manual printing.
  const isPrint = new URLSearchParams(window.location.search).has('print');
  return isPrint ? <PrintableCV /> : <InteractiveCV />;
}
