import * as React from 'react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/OverflowMenu/overflow-menu';
import { OverflowMenuContext } from './OverflowMenuContext';

export interface OverflowMenuItemProps extends React.HTMLProps<HTMLDivElement> {
  /** Any elements that can be rendered in the menu */
  children?: any;
  /** Additional classes added to the OverflowMenuItem */
  className?: string;
  /** Modifies the overflow menu item visibility */
  isPersistent?: boolean;
  /** A render function to render the component inside the menu item. */
  render?: (props: {className: string}) => React.ReactNode;
}

export const OverflowMenuItem: React.FunctionComponent<OverflowMenuItemProps> = ({
  className,
  children,
  isPersistent = false,
  render,
}: OverflowMenuItemProps) => (
  <OverflowMenuContext.Consumer>
    {value =>
      (isPersistent || !value.isBelowBreakpoint) && (
        render ? render({className: css(styles.overflowMenuItem, className)}) :
        <div className={css(styles.overflowMenuItem, className)}> {children} </div>
      )
    }
  </OverflowMenuContext.Consumer>
);
OverflowMenuItem.displayName = 'OverflowMenuItem';
