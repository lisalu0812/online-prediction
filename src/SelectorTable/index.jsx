import React, { useState } from 'react';
import { Table, Tag } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { setSelectedRows } from '../store/selectedRowsSlice'

const SelectorTable = () => {

    const dispatch = useDispatch();
    const documents = useSelector(state => state.documents);
    const selectedDocId = useSelector(state => state.selectedDoc.id);
    const selectedRowKeys = useSelector(state => state.selectedRows.keys);

    const columns = [
        {
            title: '#',
            dataIndex: 'index',
        },
        {
            title: 'Content',
            dataIndex: 'content'
        },
        {
            title: 'Tag',
            dataIndex: 'tag',
            render: tag => {
              let color = 'green';
              if (tag === 'I') {
                color = 'geekblue';
              } else if (tag === 'B') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag}
                </Tag>
              )
            }
        }
    ]

    const content = documents[selectedDocId] ? documents[selectedDocId].content : null;

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          dispatch(setSelectedRows(selectedRowKeys));
        },
        selectedRowKeys
      };

    return (
        <div>
          <Table
            rowSelection={{
              type: 'checkbox',
              ...rowSelection,
            }}
            columns={columns}
            dataSource={content}
            pagination={{ hideOnSinglePage: true }}
          />
        </div>
      );
}

export default SelectorTable;