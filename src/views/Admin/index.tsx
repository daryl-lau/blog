import React, { useEffect, useState } from "react";
import {
  Space,
  Table,
  Tag,
  Button,
  message,
  Popconfirm,
  Pagination,
  Input,
} from "antd";
import type { PaginationProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import { getCategory, deleteArticleById, searchArticle } from "@/api";
import "./index.less";

interface DataType {
  id: string;
  toc: string;
  title: string;
  markdown: string;
  category: string;
  abstract: string;
  cover: string;
}

const { Search } = Input;

const Admin: React.FC = () => {
  const history = useHistory();
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    getArticleList();
  }, []);

  useEffect(() => {
    document.title = `${import.meta.env.VITE_APP_TITLE}-管理端`;
  }, []);

  const getArticleList = () => {
    setCurrent(1);
    getCategory("all", current, pageSize).then((res: any) => {
      setData(res.articles);
      setTotal(res.total);
    });
  };
  const deleteArticle = (id: any) => {
    deleteArticleById(id).then((res: { status: number }) => {
      if (res.status === 0) {
        messageApi.open({
          type: "success",
          content: "删除成功",
        });
        getArticleList();
      }
    });
  };
  const addArticle = () => {
    history.push(`/writing/${uuidv4()}`);
  };
  const onChange: PaginationProps["onChange"] = (page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
    getCategory("all", page, pageSize).then((res: any) => {
      setData(res.articles);
      setTotal(res.total);
    });
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "主题",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "摘要",
      dataIndex: "abstract",
      key: "abstract",
    },
    {
      title: "分类",
      key: "category",
      dataIndex: "category",
      render: (_, { category }) => (
        <>
          {category.split(",").map((tag) => {
            let color;
            if (tag.length <= 3) {
              color = "green";
            } else if (tag.length > 3 && tag.length <= 5) {
              color = "processing";
            } else {
              color = "warning";
            }
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "封面",
      key: "cover",
      dataIndex: "cover",
      render: (_, { cover }) => (
        <>
          <img className="cover" src={cover} alt="" />
        </>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            onClick={() => {
              history.push(`/writing/${record.id}`);
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除该文章吗？"
            onConfirm={() => deleteArticle(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link">删除</Button>
          </Popconfirm>

          <Button type="link">发布</Button>
        </Space>
      ),
    },
  ];
  const handleSearch = (value: any, _: any) => {
    const params = {
      keyword: value,
    };
    searchArticle(params).then((res: any) => {
      setData(res.articles);
      setTotal(res.articles.length);
    });
  };

  return (
    <>
      {contextHolder}
      <div className="adminWrapper">
        <div>
          <Space>
            <Button type="primary" onClick={addArticle}>
              新建文章
            </Button>
            <Button
              type="primary"
              onClick={() => history.push(`/admin/category`)}
            >
              管理目录
            </Button>
            <Button
              type="primary"
              onClick={() => history.push(`/admin/coverManage`)}
            >
              封面管理
            </Button>
            <Search placeholder="搜索..." allowClear onSearch={handleSearch} />
          </Space>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={false}
        />
        <Pagination
          className="pagination"
          showQuickJumper
          showSizeChanger
          current={current}
          pageSize={pageSize}
          pageSizeOptions={[10, 20, 30, 50, 100]}
          total={total}
          onChange={onChange}
          showTotal={() => <>{`共${total}条`}</>}
        />
      </div>
    </>
  );
};

export default Admin;
