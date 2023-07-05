import type { ProColumns } from "@ant-design/pro-components";
import { v4 as uuidv4 } from "uuid";
import { EditableProTable, useRefFunction } from "@ant-design/pro-components";
import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { saveCategory, queryCategory } from "@/api";
import "./index.less";
import { useHistory } from "react-router-dom";

type DataSourceType = {
  id?: React.Key;
  name?: string;
  decs?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [];

const loopDataSourceFilter = (
  data: readonly DataSourceType[],
  id: React.Key | undefined
): DataSourceType[] => {
  return data
    .map((item) => {
      if (item.id !== id) {
        if (item.children) {
          const newChildren = loopDataSourceFilter(item.children, id);
          return {
            ...item,
            children: newChildren.length > 0 ? newChildren : undefined,
          };
        }
        return item;
      }
      return null;
    })
    .filter(Boolean) as DataSourceType[];
};

export default () => {
  const history = useHistory();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>(
    () => defaultData
  );
  const [current, setCurrent] = useState<string>();

  useEffect(() => {
    queryCategory().then((res: { data: any }) => {
      const { data } = res;
      setDataSource(JSON.parse(data));
    });
  }, []);

  const getPKey = () => {
    return current;
  };

  const removeRow = useRefFunction((record: DataSourceType) => {
    const records = loopDataSourceFilter(dataSource, record.id);
    saveCategory({ data: JSON.stringify(records) }).then((res: any) => {
      console.log(res);
    });
    setDataSource(records);
  });

  const handleChange = (val: any) => {
    console.log(val);
    saveCategory({ data: JSON.stringify(val) }).then((res: any) => {
      console.log(res);
    });
    setDataSource(val);
  };
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "key",
      dataIndex: "key",
    },
    {
      title: "description",
      dataIndex: "decs",
    },
    {
      title: "操作",
      valueType: "option",
      width: 300,
      render: (_, record) => [
        <a
          key="delete"
          onClick={() => {
            removeRow(record);
          }}
        >
          删除
        </a>,
        <a
          key="select"
          onClick={() => {
            setCurrent(record.id as any);
          }}
        >
          在此目录下新建目录
        </a>,
        <a
          key="select1"
          onClick={() => {
            setCurrent("");
          }}
        >
          新建一级目录
        </a>,
      ],
    },
  ];

  return (
    <>
      <div className="categoryManageWrapper">
        <Button onClick={() => history.goBack()}>返回</Button>
        <EditableProTable<DataSourceType>
          expandable={{
            // 使用 request 请求数据时无效
            defaultExpandAllRows: true,
          }}
          scroll={{
            x: 960,
          }}
          rowKey="id"
          recordCreatorProps={{
            creatorButtonText: "新增目录",
            position: "bottom",
            parentKey: getPKey(),
            record: () => ({ id: uuidv4() }),
          }}
          columns={columns}
          value={dataSource}
          onChange={handleChange}
          editable={{
            type: "multiple",
            editableKeys,
            onChange: setEditableRowKeys,
          }}
        />
      </div>
    </>
  );
};
