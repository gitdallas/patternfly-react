import React from 'react';
import { Table, TableHeader, TableBody, expandable } from '@patternfly/react-table';
import {
  Button,
  Checkbox,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
  ToolbarExpandIconWrapper,
  ToolbarContent
} from '@patternfly/react-core';
import AngleDownIcon from '@patternfly/react-icons/dist/esm/icons/angle-down-icon';
import AngleRightIcon from '@patternfly/react-icons/dist/esm/icons/angle-right-icon';

class ExpandCollapseAllTableDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      selectedRows: 0,
      expandedRows: 0,
      expandCollapseToggle: 'expand',
      columns: [
        {
          title: 'Header cell1',
          cellFormatters: [expandable]
        },
        'Branches',
        'Pull requests',
        'Workspaces',
        'Last Commit'
      ],
      rows: [
        {
          cells: ['one', 'two', 'three', 'four', 'five']
        },
        {
          isOpen: false,
          cells: ['parent - 1', 'two', 'three', 'four', 'five']
        },
        {
          parent: 1,
          cells: ['child - 1']
        },
        {
          isOpen: false,
          cells: ['parent - 2', 'two', 'three', 'four', 'five']
        },
        {
          parent: 3,
          cells: ['child - 2']
        },
        {
          isOpen: false,
          cells: ['parent - 3', 'two', 'three', 'four', 'five']
        },
        {
          parent: 5,
          cells: ['child - 3']
        }
      ]
    };
    this.onCollapse = this.onCollapse.bind(this);
    this.toggleCollapseAll = this.toggleCollapseAll.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.toggleSelectAll = this.toggleSelectAll.bind(this);
  }

  onCollapse(event, rowIndex, isOpen) {
    const { rows, expandedRows, expandCollapseToggle } = this.state;
    const expandableRowLength = this.state.rows.filter(row => row.isOpen !== undefined).length;
    /**
     * Please do not use rowKey as row index for more complex tables.
     * Rather use some kind of identifier like ID passed with each row.
     */
    const newRows = Array.from(rows);
    newRows[rowIndex] = { ...newRows[rowIndex], isOpen };
    const updatedExpandedRows = isOpen ? expandedRows + 1 : expandedRows - 1;
    this.setState({
      rows: newRows,
      expandedRows: updatedExpandedRows,
      expandCollapseToggle:
        updatedExpandedRows === expandableRowLength
          ? 'collapse'
          : updatedExpandedRows === 0
          ? 'expand'
          : expandCollapseToggle
    });
  }

  toggleCollapseAll(collapse) {
    const expandableRowLength = this.state.rows.filter(row => row.isOpen !== undefined).length;
    const updatedRows = this.state.rows.map(row =>
      row.isOpen !== undefined
        ? {
            ...row,
            isOpen: !collapse
          }
        : row
    );
    this.setState({
      rows: updatedRows,
      expandedRows: collapse ? 0 : expandableRowLength,
      expandCollapseToggle: collapse === false ? 'collapse' : 'expand'
    });
  }

  onSelect(event, isSelected, rowId) {
    let isChecked = null;
    let selectedRows = this.state.selectedRows;
    const selectableRowLength = this.state.rows.filter(row => row.parent === undefined).length;
    let rows;
    if (rowId === -1) {
      rows = this.state.rows.map(row => {
        row.selected = isSelected;
        return row;
      });
      isChecked = isSelected;
      selectedRows = isSelected ? selectableRowLength : 0;
    } else {
      rows = [...this.state.rows];
      rows[rowId] = { ...rows[rowId], selected: isSelected };
      selectedRows = isSelected ? selectedRows + 1 : selectedRows - 1;
      isChecked = selectedRows === 0 ? false : selectedRows === selectableRowLength ? true : null;
    }
    this.setState({
      rows,
      isChecked,
      selectedRows
    });
  }

  toggleSelectAll(checked) {
    this.onSelect(null, checked, -1);
  }

  render() {
    const { columns, rows, expandCollapseToggle, isChecked } = this.state;

    return (
      <React.Fragment>
        <Toolbar>
          <ToolbarContent>
            <ToolbarGroup variant="icon-button-group">
              <ToolbarItem variant="expand-all" isAllExpanded={expandCollapseToggle !== 'expand'}>
                {expandCollapseToggle === 'expand' ? (
                  <Button variant="plain" aria-label="Expand all" onClick={() => this.toggleCollapseAll(false)}>
                    <ToolbarExpandIconWrapper>
                      <AngleRightIcon />
                    </ToolbarExpandIconWrapper>
                  </Button>
                ) : (
                  <Button variant="plain" aria-label="Collapse all" onClick={() => this.toggleCollapseAll(true)}>
                    <ToolbarExpandIconWrapper>
                      <AngleRightIcon />
                    </ToolbarExpandIconWrapper>
                  </Button>
                )}
              </ToolbarItem>
              <ToolbarItem>
                <Checkbox
                  isChecked={isChecked}
                  onChange={this.toggleSelectAll}
                  aria-label="toggle select all checkbox"
                  id="toggle-select-all"
                  name="toggle-select-all"
                  label={isChecked ? 'Deselect all' : 'Select all'}
                />
              </ToolbarItem>
            </ToolbarGroup>
          </ToolbarContent>
        </Toolbar>
        <Table
          aria-label="Collapsible table"
          onSelect={this.onSelect}
          onCollapse={this.onCollapse}
          rows={rows}
          cells={columns}
          canSelectAll={false}
        >
          <TableHeader />
          <TableBody />
        </Table>
      </React.Fragment>
    );
  }
}