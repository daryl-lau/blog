import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import classnames from "classnames";
import MdEditor from "@/components/MdEditor";
import {
  Button,
  Form,
  Input,
  TreeSelect,
  message,
  Space,
  Modal,
  Upload,
} from "antd";
import type { UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getArticleById, saveArticle, queryCategory, queryCovers } from "@/api";
import { url } from "@/api/api";
import "./index.less";

const { TreeNode } = TreeSelect;

export interface MenuItemInterface {
  name: string;
  key: string;
  articleCount: number;
  children?: Array<MenuItemInterface>;
}
export type MenuData = Array<MenuItemInterface>;

type Cover = {
  id: string;
  filename: string;
  url: string;
};

type Covers = Cover[];

interface CoverSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
}

const CoverSelector: React.FC<CoverSelectorProps> = ({
  value = "",
  onChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coverList, setCoverList] = useState<Covers>([]);
  const [cover, setCover] = useState<string>("");

  useEffect(() => {
    queryCovers().then((res: any) => {
      setCoverList(res.covers);
    });
  }, [isModalOpen]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    onChange?.(cover);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const selectCover = (url: string) => {
    setCover(url);
  };
  const props: UploadProps = {
    name: "file",
    multiple: false,
    showUploadList: false,
    action: `${url}/api/upload/cover`,
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} 上传成功`);
        setCover(info.file.response.imgUrl);
        onChange?.(info.file.response.imgUrl);
      } else if (status === "error") {
        message.error(`${info.file.name} 上传失败`);
      }
    },
    onDrop(_) {},
  };
  return (
    <>
      <div className="coverSelector" onClick={showModal}>
        {value ? (
          <img src={value} alt="" />
        ) : (
          <>
            <span>点击添加封面图片</span>
          </>
        )}
      </div>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <Modal
        title="选择封面"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="coverModal"
        width={"60vw"}
      >
        <div className="coverList">
          {coverList.map((item) => {
            return (
              <div
                key={item.id}
                className={classnames("coverItem", {
                  active: cover === item.url,
                })}
                onClick={() => selectCover(item.url)}
              >
                <img src={item.url} alt="" />
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

const Writing: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const params: any = useParams();
  const history = useHistory();
  const [value, setValue] = useState("");
  const [menuData, setMenuData] = useState<MenuData>([]);
  const editorRef = useRef<any>();
  const fetchArticle = () => {
    getArticleById(params.articleId)
      .then((res: any) => {
        const { markdown, title, abstract, category, cover } = res;
        setValue(markdown || "");
        form.setFieldsValue({
          title,
          abstract,
          category: category ? category.split(",") : [],
          cover,
        });
      })
      .catch((error: any) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchArticle();
    queryCategory().then((res: { data: any }) => {
      const { data } = res;
      const menu = JSON.parse(data);
      setMenuData(menu);
    });
  }, []);

  const save = () => {
    form
      .validateFields()
      .then((data) => {
        const { markdown, toc } = editorRef.current.getValues();
        const postParams = {
          id: params.articleId || "",
          markdown: markdown || "",
          toc: toc || "",
          title: data.title || "",
          abstract: data.abstract || "",
          category: data.category.join(",") || "",
          cover: data.cover || "",
        };
        saveArticle(postParams).then((res: { status: any }) => {
          const { status } = res;
          if (status === 0) {
            messageApi.open({
              type: "success",
              content: "保存成功",
            });
          }
        });
      })
      .catch(() => {});
  };
  const handleSave = (markdown?: string, toc?: string) => {
    form
      .validateFields()
      .then((data) => {
        const postParams = {
          id: params.articleId || "",
          markdown: markdown || "",
          toc: toc || "",
          title: data.title || "",
          abstract: data.abstract || "",
          category: data.category.join(",") || "",
          cover: data.cover || "",
        };
        saveArticle(postParams).then((res: { status: any }) => {
          const { status } = res;
          if (status === 0) {
            messageApi.open({
              type: "success",
              content: "保存成功",
            });
          }
        });
      })
      .catch(() => {});
  };
  const renderTreeNodes = (data: any) =>
    data.map((item: any) => {
      if (item.children) {
        item.disabled = true;
        return (
          <TreeNode
            key={item.key}
            title={item.name}
            value={item.key}
            disabled={item.disabled}
          >
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode {...item} key={item.key} title={item.name} value={item.key} />
      );
    });
  return (
    <div className="wrapper">
      {contextHolder}
      <div className="form">
        <Form form={form} autoComplete="off" layout="vertical">
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入标题！" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="摘要"
            name="abstract"
            rules={[{ required: true, message: "请输入摘要！" }]}
          >
            <Input.TextArea rows={6} />
          </Form.Item>
          <Form.Item
            label="文章分类"
            name="category"
            rules={[{ required: true, message: "请选择分类！" }]}
          >
            <TreeSelect
              multiple
              allowClear
              treeDefaultExpandAll
              // treeData={menuData}
            >
              {renderTreeNodes(menuData)}
            </TreeSelect>
          </Form.Item>
          <Form.Item
            label="文章封面"
            name="cover"
            rules={[{ required: true, message: "请选择封面！" }]}
          >
            <CoverSelector />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button onClick={save} type="primary">
                保存
              </Button>
              <Button onClick={history.goBack}>返回</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
      <div className="mdEditor">
        <MdEditor
          ref={editorRef}
          value={value}
          id={params.articleId}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default Writing;
