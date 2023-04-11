import React from 'react';
import { Link } from '@reach/router';
import { Dropdown, DropdownItem, DropdownList, MenuToggle } from '@patternfly/react-core';

export const DropdownBasic: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onToggleClick = () => {
    setIsOpen(!isOpen);
  };

  const onSelect = (_event: React.MouseEvent<Element, MouseEvent> | undefined, itemId: string | number | undefined) => {
    // eslint-disable-next-line no-console
    console.log('selected', itemId);
    setIsOpen(false);
  };

  return (
    <Dropdown
      isOpen={isOpen}
      onSelect={onSelect}
      onOpenChange={(isOpen) => setIsOpen(isOpen)}
      toggle={(toggleRef) => (
        <MenuToggle ref={toggleRef} onClick={onToggleClick} isExpanded={isOpen}>
          Dropdown
        </MenuToggle>
      )}
      ouiaId="BasicDropdown"
    >
      <DropdownList>
        <DropdownItem itemId={0} key="rendered"
          render={( props ) => (
            <Link to="#dropdownitem" {...props}>
              Rendered Link
            </Link>
          )}
        />
        <DropdownItem itemId={1} key="link">
          Link
        </DropdownItem>
      </DropdownList>
    </Dropdown>
  );
};
