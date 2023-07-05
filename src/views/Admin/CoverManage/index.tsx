import React, { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload, Button } from "antd";
import { useHistory } from "react-router-dom";
import { queryCovers, deleteCover } from "@/api";
import { url } from "@/api/api";
import "./index.less";

const { Dragger } = Upload;

type Cover = {
  id: string;
  filename: string;
  url: string;
};

type Covers = Cover[];

const CoverManage: React.FC = () => {
  const history = useHistory();
  const [coverList, setCoverList] = useState<Covers>([]);
  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: `${url}/api/upload/cover`,
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} 上传成功`);
        getCovers();
      } else if (status === "error") {
        message.error(`${info.file.name} 上传失败`);
      }
    },
    onDrop(_) {},
  };
  useEffect(() => {
    getCovers();
  }, []);
  const getCovers = () => {
    queryCovers().then((res: any) => {
      if (res) {
        setCoverList(res.covers);
      }
    });
  };
  const handleDeleteCover = (id: string) => {
    deleteCover(id).then((res: any) => {
      if (res) {
        getCovers();
      }
    });
  };
  return (
    <>
      <div className="coverManageWrapper">
        <Button onClick={() => history.goBack()}>返回</Button>
        <div className="coverList">
          {coverList.map((item) => (
            <>
              <div className="cover" key={item.id}>
                <img src={item.url} alt="" />
                <div
                  className="deleteIcon"
                  onClick={() => handleDeleteCover(item.id)}
                >
                  <span>删除</span>
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="uploadBtn">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或者拖动文件到此区域上传</p>
          </Dragger>
        </div>
      </div>
    </>
  );
};

export default CoverManage;
