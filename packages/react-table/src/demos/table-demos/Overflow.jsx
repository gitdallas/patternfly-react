import React from 'react';
import { Table, TableHeader, TableBody, expandable } from '@patternfly/react-table';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class OverflowTableDemo extends React.Component {
  constructor(props) {
    super(props);
    this.actions = [
        {
          title: <a href="#">Link</a>
        },
        {
          title: 'Action'
        },
        {
          isSeparator: true
        },
        {
          title: <a href="#">Separated link</a>
        }
      ];
    this.state = {
      columns: [
        {
          title: 'Header cell1',
        },
        'Branches',
        'Pull requests',
        'Workspaces',
        'Last Commit',
        ''
      ],
      rows: [
        {
          cells: ['one', 'two', 'three', 'four', 'five']
        },
      ]
    };
  }

  render() {
    const { columns, rows, collapseAllAriaLabel } = this.state;

    return (
      <React.Fragment>
        <Table
          aria-label="Table with verflow example"
          actionVariant="overflow"
          rows={rows}
          cells={columns}
          actions={this.actions}
        >
          <TableHeader />
          <TableBody />
        </Table>
      </React.Fragment>
    );
  }
}
