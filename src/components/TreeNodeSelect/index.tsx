import React from "react";
import { TreeSelect } from "antd";

const { TreeNode } = TreeSelect;

export interface TreeNodeSelectProps {
  treeData: any;
  onChange?: (values: any) => void;
  value: string[];
  placeholder?: string;
}

const TreeNodeSelect: React.FC<TreeNodeSelectProps> = ({
  treeData = [],
  onChange,
  value = [],
  placeholder = "请选择",
}) => {
  const onNodeChange = (values: any) => {
    onChange && onChange(values);
  };

  const renderTreeNodes = (data: any) =>
    data.map((item: any) => {
      if (item.children) {
        item.disabled = true;
        return (
          <TreeNode
            key={item.name}
            title={item.name}
            value={item.name}
            disabled={item.disabled}
          >
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          {...item}
          key={item.key}
          title={item.label}
          value={item.value}
        />
      );
    });

  return (
    <TreeSelect
      showSearch
      style={{ width: "100%" }}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
      placeholder={placeholder}
      treeNodeFilterProp="name"
      allowClear
      multiple
      treeDefaultExpandAll
      onChange={(values) => onNodeChange(values)}
    >
      {renderTreeNodes(treeData)}
    </TreeSelect>
  );
};

export default TreeNodeSelect;
