import React from 'react';
import './index.less';

const FilingInfo = (): React.ReactElement => {
  return (
    <div className="filing-info">
      <div className="site">白胡子</div>
      <div className="filing-number">
        <span>©2023 白胡子</span>
        <a href="https://beian.miit.gov.cn/#/Integrated/index" target="blank">
          ICP备案号: 鄂ICP备20006679号
        </a>
        <a href="https://beian.miit.gov.cn/#/Integrated/index" target="blank">
          网站备案号: 鄂ICP备20006679号-1
        </a>
      </div>
      <p className="advice">
        建议您使用Chrome、Firefox、Edge、IE10及以上版本和360等主流浏览器浏览本网站
      </p>
      {/* <div className="links">
        <SvgIcon name="github" />
        <SvgIcon name="qq" />
        <SvgIcon name="weixin" />
      </div> */}
    </div>
  );
};

export default FilingInfo;
