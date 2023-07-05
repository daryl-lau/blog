import React from 'react';
import ArticleCard from '../ArticleCard';

const ArticleCardTest: React.FC = () => {
  return (
    <ArticleCard
      title="生命也四季，世界也青灯"
      cover="https://ccdn.goodq.top/caches/249a4e899082a6b48f46e5b4e4ae8a14/aHR0cDovL3ctNTE5NjktMzgwNTYtOTI5NzUuMTA2MTUxNzkyMDMuc2l0ZXMuY25mcmVlMDcucWlmZWl5ZS5jb20vcWZ5LWNvbnRlbnQvdXBsb2Fkcy8yMDE5LzEwLzc2N2NlZWQ0NjE2M2ZjYzdhNmMyNDAyNmVhNzBhZjAyLTQyMHgyNTAuanBn.jpg"
      mode="vertical"
      date="2021-01-01"
      reading={213}
      support={12}
    >
      “小满小满，江满河满。”说明这时开始，雨水多起来，导致空气潮湿，各种皮肤病，如脚气、湿疹、汗斑、湿性皮肤病、足癣等易发生。中医认为
    </ArticleCard>
  );
};

export default ArticleCardTest;
