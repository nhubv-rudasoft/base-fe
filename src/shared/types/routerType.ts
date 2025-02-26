import { JSX } from 'react';

export interface RouterConfig {
  path: string;
  element: (() => JSX.Element) | React.LazyExoticComponent<() => JSX.Element>;
  title: string;
  isLazy?: boolean;
}
