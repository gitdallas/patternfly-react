import React from 'react';
import { Link } from '@reach/router';
import { Menu, MenuContent, MenuList, MenuItem } from '@patternfly/react-core';

export const MenuBasic: React.FunctionComponent = () => (
    <React.Fragment>
      <Menu>
        <MenuContent>
          <MenuList>
            <MenuItem
              render={( props ) => (
                <Link to="#menuitem" {...props}>
                  Rendered Link
                </Link>
              )}
            />
            <MenuItem
              itemId={1}
              to="#default-link2"
              // just for demo so that navigation is not triggered
              onClick={event => event.preventDefault()}
            >
              Link
            </MenuItem>
          </MenuList>
        </MenuContent>
      </Menu>
    </React.Fragment>
  );
