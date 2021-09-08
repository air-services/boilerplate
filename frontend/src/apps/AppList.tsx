import React from 'react';
import appListStyles from './AppList.module.scss';

import SelectIcon from 'components/common/SelectIcon/SelectIcon';
import Button from 'components/ui/Button/Button';

import TableWrapper from 'components/ui/Table/TableWrapper/TableWrapper';
import Table from 'components/ui/Table/Table';
import TableHead from 'components/ui/Table/TableHead/TableHead';
import TableRow from 'components/ui/Table/TableRow/TableRow';
import TableHeadItem from 'components/ui/Table/TableHead/TableHeadItem/TableHeadItem';
import TableBody from 'components/ui/Table/TableBody/TableBody';
import TableBodyItem from 'components/ui/Table/TableBody/TableBodyItem/TableBodyItem';
import TableInputText from 'components/ui/Table/TableInputText/TableInputText';
import TableEditButton from 'components/ui/Table/TableEditButton/TableEditButton';

const AppList = () => {
  return (
    <div className={appListStyles.main}>
      <div className={appListStyles.title}>Apps</div>
      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadItem>name</TableHeadItem>
              <TableHeadItem>description</TableHeadItem>
              <TableHeadItem>url</TableHeadItem>
              <TableHeadItem>icon</TableHeadItem>
              <TableHeadItem>actions</TableHeadItem>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableBodyItem>
                <TableInputText placeholder="name" value="Store" />
              </TableBodyItem>
              <TableBodyItem>
                <TableInputText
                  placeholder="description"
                  value="Web store application"
                />
              </TableBodyItem>
              <TableBodyItem>
                <TableInputText placeholder="url" value="store" />
              </TableBodyItem>
              <TableBodyItem>
                <div className="w-60">
                  <SelectIcon
                    defaultValue={null}
                    onChange={(e) => e}
                    field={{ id: 'icon', label: 'icon', placeholder: 'icon' }}
                  />
                </div>
              </TableBodyItem>
              <TableBodyItem>
                <Button icon="times" buttonStyle={'danger'} />
                <span className={appListStyles.editButton}>
                  <Button icon="pen" buttonStyle={'info'} />
                </span>
              </TableBodyItem>
            </TableRow>
            <TableRow>
              <TableBodyItem>
                <TableInputText placeholder="name" value="Users" />
              </TableBodyItem>
              <TableBodyItem>
                <TableInputText
                  placeholder="description"
                  value="Users data app"
                />
              </TableBodyItem>
              <TableBodyItem>
                <TableInputText placeholder="url" value="users" />
              </TableBodyItem>
              <TableBodyItem>
                <div className="w-60">
                  <SelectIcon
                    defaultValue={null}
                    onChange={(e) => e}
                    field={{ id: 'icon', label: 'icon', placeholder: 'icon' }}
                  />
                </div>
              </TableBodyItem>
              <TableBodyItem>
                <Button icon="times" buttonStyle={'danger'} />
                <TableEditButton>
                  <Button icon="pen" buttonStyle={'info'} />
                </TableEditButton>
              </TableBodyItem>
            </TableRow>
          </TableBody>
        </Table>
      </TableWrapper>
    </div>
  );
};

export default AppList;
