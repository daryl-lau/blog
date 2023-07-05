/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
interface ObjType {
  key: string;
  children?: Array<ObjType>;
}
function getObjPath(data: ObjType[], val: string): string[] | undefined {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item.key === val) {
      return [item.key];
    }
    if (item.key !== val && item.children && item.children.length > 0) {
      const temp = getObjPath(item.children, val);
      if (temp) return [item.key, temp].flat();
    }
  }
}

export default getObjPath;
