// Minimal typings for the `sax` package (no @types shipped as a dependency)
// covering only the streaming-parser surface used by dump-import.ts.
declare module 'sax' {
  export interface SAXTag {
    name: string;
    attributes: Record<string, string>;
    isSelfClosing: boolean;
  }

  export interface SAXParser {
    onopentag: (node: SAXTag) => void;
    ontext: (text: string) => void;
    oncdata: (cdata: string) => void;
    onclosetag: (name: string) => void;
    onerror: (e: Error) => void;
    onend: () => void;
    error: Error | null;
    write(chunk: string): SAXParser;
    close(): SAXParser;
    resume(): SAXParser;
  }

  export function parser(strict?: boolean, opt?: Record<string, unknown>): SAXParser;

  const sax: { parser: typeof parser };
  export default sax;
}
