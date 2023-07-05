/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-console */
// eslint-disable-next-line import/prefer-default-export
import { v4 as uuidv4 } from "uuid";
export function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          // articleId: "105565939366",
          articleId: uuidv4(),
          title: "“彩虹之国”南非",
          coverImg:
            "https://ccdn.goodq.top/caches/249a4e899082a6b48f46e5b4e4ae8a14/aHR0cDovL3ctNTE5NjktMzgwNTYtOTI5NzUuMTA2MTUxNzkyMDMuc2l0ZXMuY25mcmVlMDcucWlmZWl5ZS5jb20vcWZ5LWNvbnRlbnQvdXBsb2Fkcy8yMDE5LzEwLzc2N2NlZWQ0NjE2M2ZjYzdhNmMyNDAyNmVhNzBhZjAyLTQyMHgyNTAuanBn.jpg",
          content:
            "南非世界杯即将拉开战幕，对于将赴南非观赛的中国球迷来说，除了看球之外，南非的迷人风光也不能错过。今年3月我曾经去过素有“彩虹之国”...",
          reading: 20,
          support: 30,
          date: "2021-01-01",
        },
        {
          // articleId: "107664518552",
          articleId: uuidv4(),
          title: "孤单时，遇见最美的你",
          coverImg:
            "https://ccdn.goodq.top/caches/249a4e899082a6b48f46e5b4e4ae8a14/aHR0cDovL3ctNTE5NjktMzgwNTYtOTI5NzUuMTA2MTUxNzkyMDMuc2l0ZXMuY25mcmVlMDcucWlmZWl5ZS5jb20vcWZ5LWNvbnRlbnQvdXBsb2Fkcy8yMDE5LzEwL2M2MWYwMGNhYzllYzUzZDk2YmRmY2QzNmE0MTllNzcyLTQyMHgyNTAuanBn.jpg",
          content:
            "“小满小满，江满河满。”说明这时开始，雨水多起来，导致空气潮湿，各种皮肤病，如脚气、湿疹、汗斑、湿性皮肤病、足癣等易发生。中医认为...",
          reading: 220,
          support: 130,
          date: "2021-01-01",
        },
        {
          articleId: uuidv4(),
          title: "生命也四季，世界也青灯",
          coverImg:
            "https://ccdn.goodq.top/caches/249a4e899082a6b48f46e5b4e4ae8a14/aHR0cDovL3ctNTE5NjktMzgwNTYtOTI5NzUuMTA2MTUxNzkyMDMuc2l0ZXMuY25mcmVlMDcucWlmZWl5ZS5jb20vcWZ5LWNvbnRlbnQvdXBsb2Fkcy8yMDE5LzEwLzM3NWU1ZmNmYzZjNmM2YWRhNmUyN2RmYWMyNWNkNjkwLTQyMHgyNTAuanBn.jpg",
          content:
            "“小满小满，江满河满。”说明这时开始，雨水多起来，导致空气潮湿，各种皮肤病，如脚气、湿疹、汗斑、湿性皮肤病、足癣等易发生。中医认为...",
          reading: 204,
          support: 301,
          date: "2021-01-01",
        },
        {
          articleId: uuidv4(),
          title: "让过往随风而逝，坚定当下土地",
          coverImg:
            "https://ccdn.goodq.top/caches/249a4e899082a6b48f46e5b4e4ae8a14/aHR0cDovL3ctNTE5NjktMzgwNTYtOTI5NzUuMTA2MTUxNzkyMDMuc2l0ZXMuY25mcmVlMDcucWlmZWl5ZS5jb20vcWZ5LWNvbnRlbnQvdXBsb2Fkcy8yMDE5LzEwL2JlNjdjMGUyMTg3ZGNiNDYyZjk0MWZhZTBjZjg4ZGQ3LTQyMHgyNTAuanBn.jpg",
          content:
            "“小满小满，江满河满。”说明这时开始，雨水多起来，导致空气潮湿，各种皮肤病，如脚气、湿疹、汗斑、湿性皮肤病、足癣等易发生。中医认为...",
          reading: 230,
          support: 24,
          date: "2021-01-04",
        },
        {
          articleId: uuidv4(),
          title: "找不到路的话，就找自己喜欢的吧",
          coverImg:
            "https://ccdn.goodq.top/caches/249a4e899082a6b48f46e5b4e4ae8a14/aHR0cDovL3ctNTE5NjktMzgwNTYtOTI5NzUuMTA2MTUxNzkyMDMuc2l0ZXMuY25mcmVlMDcucWlmZWl5ZS5jb20vcWZ5LWNvbnRlbnQvdXBsb2Fkcy8yMDE5LzA3L2I1ZWEyY2ZhOWQwOTA2NDJjNDZiYjhkODI1Y2NjNzBjLTQyMHgyNTAuanBn.jpg",
          content:
            "“小满小满，江满河满。”说明这时开始，雨水多起来，导致空气潮湿，各种皮肤病，如脚气、湿疹、汗斑、湿性皮肤病、足癣等易发生。中医认为...",
          reading: 212,
          support: 52,
          date: "2021-01-07",
        },
        {
          articleId: uuidv4(),
          title: "解读数字经济时代的“区块链”",
          coverImg:
            "https://ccdn.goodq.top/caches/249a4e899082a6b48f46e5b4e4ae8a14/aHR0cDovL3ctNTE5NjktMzgwNTYtOTI5NzUuMTA2MTUxNzkyMDMuc2l0ZXMuY25mcmVlMDcucWlmZWl5ZS5jb20vcWZ5LWNvbnRlbnQvdXBsb2Fkcy8yMDE5LzEyL2Q2ZTJlY2E0N2MyYTc3OWVmOTEwMzVmYzcwYjkwNDIwLTQyMHgyNTAucG5n.png",
          content:
            "中共中央政治局10月24日就区块链技术发展现状和趋势进行第十八次集体学习。中共中央总书记习近平在主持学习时强调，区块链技术的集成应...",
          reading: 212,
          support: 52,
          date: "2021-01-07",
        },
        {
          articleId: uuidv4(),
          title: "NVIDIA将通过5G技术传输云渲染VR将通过5G技术传输",
          coverImg:
            "https://ccdn.goodq.top/caches/249a4e899082a6b48f46e5b4e4ae8a14/aHR0cDovL3ctNTE5NjktMzgwNTYtOTI5NzUuMTA2MTUxNzkyMDMuc2l0ZXMuY25mcmVlMDcucWlmZWl5ZS5jb20vcWZ5LWNvbnRlbnQvdXBsb2Fkcy8yMDE5LzA3L2I1ZWEyY2ZhOWQwOTA2NDJjNDZiYjhkODI1Y2NjNzBjLTQyMHgyNTAuanBn.jpg",
          content:
            "在洛杉矶世界移动大会上，NVIDIA首席执行官Jensen Huang展示了CloudXR平台，该平台旨在通过5G连接流式传输云渲...",
          reading: 212,
          support: 52,
          date: "2021-01-07",
        },
        {
          articleId: uuidv4(),
          title: "英国旅游的风土人情",
          coverImg:
            "https://ccdn.goodq.top/caches/249a4e899082a6b48f46e5b4e4ae8a14/aHR0cDovL3ctNTE5NjktMzgwNTYtOTI5NzUuMTA2MTUxNzkyMDMuc2l0ZXMuY25mcmVlMDcucWlmZWl5ZS5jb20vcWZ5LWNvbnRlbnQvdXBsb2Fkcy8yMDE5LzEwL2E5ZjQ1ZDcxN2Q3OGM1YmI2MmM1Nzc1N2E0OGI5MmJhLTQyMHgyNTAuanBn.jpg",
          content:
            "今年十二月初，我跟团去英国旅游，从深圳出发，在香港出境，抵达伦敦，一共七天，行程包括伦敦、剑桥、牛津、巴斯、温莎、索尔兹伯等地，在...",
          reading: 212,
          support: 52,
          date: "2021-01-07",
        },
        {
          // articleId: "105565939366",
          articleId: uuidv4(),
          title: "“彩虹之国”南非",
          coverImg:
            "https://ccdn.goodq.top/caches/249a4e899082a6b48f46e5b4e4ae8a14/aHR0cDovL3ctNTE5NjktMzgwNTYtOTI5NzUuMTA2MTUxNzkyMDMuc2l0ZXMuY25mcmVlMDcucWlmZWl5ZS5jb20vcWZ5LWNvbnRlbnQvdXBsb2Fkcy8yMDE5LzEwLzc2N2NlZWQ0NjE2M2ZjYzdhNmMyNDAyNmVhNzBhZjAyLTQyMHgyNTAuanBn.jpg",
          content:
            "南非世界杯即将拉开战幕，对于将赴南非观赛的中国球迷来说，除了看球之外，南非的迷人风光也不能错过。今年3月我曾经去过素有“彩虹之国”...",
          reading: 20,
          support: 30,
          date: "2021-01-01",
        },
        {
          // articleId: "107664518552",
          articleId: uuidv4(),
          title: "孤单时，遇见最美的你",
          coverImg:
            "https://ccdn.goodq.top/caches/249a4e899082a6b48f46e5b4e4ae8a14/aHR0cDovL3ctNTE5NjktMzgwNTYtOTI5NzUuMTA2MTUxNzkyMDMuc2l0ZXMuY25mcmVlMDcucWlmZWl5ZS5jb20vcWZ5LWNvbnRlbnQvdXBsb2Fkcy8yMDE5LzEwL2M2MWYwMGNhYzllYzUzZDk2YmRmY2QzNmE0MTllNzcyLTQyMHgyNTAuanBn.jpg",
          content:
            "“小满小满，江满河满。”说明这时开始，雨水多起来，导致空气潮湿，各种皮肤病，如脚气、湿疹、汗斑、湿性皮肤病、足癣等易发生。中医认为...",
          reading: 220,
          support: 130,
          date: "2021-01-01",
        },
        {
          articleId: uuidv4(),
          title: "生命也四季，世界也青灯",
          coverImg:
            "https://ccdn.goodq.top/caches/249a4e899082a6b48f46e5b4e4ae8a14/aHR0cDovL3ctNTE5NjktMzgwNTYtOTI5NzUuMTA2MTUxNzkyMDMuc2l0ZXMuY25mcmVlMDcucWlmZWl5ZS5jb20vcWZ5LWNvbnRlbnQvdXBsb2Fkcy8yMDE5LzEwLzM3NWU1ZmNmYzZjNmM2YWRhNmUyN2RmYWMyNWNkNjkwLTQyMHgyNTAuanBn.jpg",
          content:
            "“小满小满，江满河满。”说明这时开始，雨水多起来，导致空气潮湿，各种皮肤病，如脚气、湿疹、汗斑、湿性皮肤病、足癣等易发生。中医认为...",
          reading: 204,
          support: 301,
          date: "2021-01-01",
        },
        {
          articleId: uuidv4(),
          title: "让过往随风而逝，坚定当下土地",
          coverImg:
            "https://ccdn.goodq.top/caches/249a4e899082a6b48f46e5b4e4ae8a14/aHR0cDovL3ctNTE5NjktMzgwNTYtOTI5NzUuMTA2MTUxNzkyMDMuc2l0ZXMuY25mcmVlMDcucWlmZWl5ZS5jb20vcWZ5LWNvbnRlbnQvdXBsb2Fkcy8yMDE5LzEwL2JlNjdjMGUyMTg3ZGNiNDYyZjk0MWZhZTBjZjg4ZGQ3LTQyMHgyNTAuanBn.jpg",
          content:
            "“小满小满，江满河满。”说明这时开始，雨水多起来，导致空气潮湿，各种皮肤病，如脚气、湿疹、汗斑、湿性皮肤病、足癣等易发生。中医认为...",
          reading: 230,
          support: 24,
          date: "2021-01-04",
        },
        {
          articleId: uuidv4(),
          title: "找不到路的话，就找自己喜欢的吧",
          coverImg:
            "https://ccdn.goodq.top/caches/249a4e899082a6b48f46e5b4e4ae8a14/aHR0cDovL3ctNTE5NjktMzgwNTYtOTI5NzUuMTA2MTUxNzkyMDMuc2l0ZXMuY25mcmVlMDcucWlmZWl5ZS5jb20vcWZ5LWNvbnRlbnQvdXBsb2Fkcy8yMDE5LzA3L2I1ZWEyY2ZhOWQwOTA2NDJjNDZiYjhkODI1Y2NjNzBjLTQyMHgyNTAuanBn.jpg",
          content:
            "“小满小满，江满河满。”说明这时开始，雨水多起来，导致空气潮湿，各种皮肤病，如脚气、湿疹、汗斑、湿性皮肤病、足癣等易发生。中医认为...",
          reading: 212,
          support: 52,
          date: "2021-01-07",
        },
        {
          articleId: uuidv4(),
          title: "解读数字经济时代的“区块链”",
          coverImg:
            "https://ccdn.goodq.top/caches/249a4e899082a6b48f46e5b4e4ae8a14/aHR0cDovL3ctNTE5NjktMzgwNTYtOTI5NzUuMTA2MTUxNzkyMDMuc2l0ZXMuY25mcmVlMDcucWlmZWl5ZS5jb20vcWZ5LWNvbnRlbnQvdXBsb2Fkcy8yMDE5LzEyL2Q2ZTJlY2E0N2MyYTc3OWVmOTEwMzVmYzcwYjkwNDIwLTQyMHgyNTAucG5n.png",
          content:
            "中共中央政治局10月24日就区块链技术发展现状和趋势进行第十八次集体学习。中共中央总书记习近平在主持学习时强调，区块链技术的集成应...",
          reading: 212,
          support: 52,
          date: "2021-01-07",
        },
        {
          articleId: uuidv4(),
          title: "NVIDIA将通过5G技术传输云渲染VR将通过5G技术传输",
          coverImg:
            "https://ccdn.goodq.top/caches/249a4e899082a6b48f46e5b4e4ae8a14/aHR0cDovL3ctNTE5NjktMzgwNTYtOTI5NzUuMTA2MTUxNzkyMDMuc2l0ZXMuY25mcmVlMDcucWlmZWl5ZS5jb20vcWZ5LWNvbnRlbnQvdXBsb2Fkcy8yMDE5LzA3L2I1ZWEyY2ZhOWQwOTA2NDJjNDZiYjhkODI1Y2NjNzBjLTQyMHgyNTAuanBn.jpg",
          content:
            "在洛杉矶世界移动大会上，NVIDIA首席执行官Jensen Huang展示了CloudXR平台，该平台旨在通过5G连接流式传输云渲...",
          reading: 212,
          support: 52,
          date: "2021-01-07",
        },
        {
          articleId: uuidv4(),
          title: "英国旅游的风土人情",
          coverImg:
            "https://ccdn.goodq.top/caches/249a4e899082a6b48f46e5b4e4ae8a14/aHR0cDovL3ctNTE5NjktMzgwNTYtOTI5NzUuMTA2MTUxNzkyMDMuc2l0ZXMuY25mcmVlMDcucWlmZWl5ZS5jb20vcWZ5LWNvbnRlbnQvdXBsb2Fkcy8yMDE5LzEwL2E5ZjQ1ZDcxN2Q3OGM1YmI2MmM1Nzc1N2E0OGI5MmJhLTQyMHgyNTAuanBn.jpg",
          content:
            "今年十二月初，我跟团去英国旅游，从深圳出发，在香港出境，抵达伦敦，一共七天，行程包括伦敦、剑桥、牛津、巴斯、温莎、索尔兹伯等地，在...",
          reading: 212,
          support: 52,
          date: "2021-01-07",
        },
      ]);
    }, 2000);
  });
}

// Suspense integrations like Relay implement
// a contract like this to integrate with React.
// Real implementations can be significantly more complex.
// Don't copy-paste this into your project!
// function wrapPromise(promise) {
//   let status = 'pending';
//   let result;
//   const suspender = promise.then(
//     (r) => {
//       status = 'success';
//       result = r;
//     },
//     (e) => {
//       status = 'error';
//       result = e;
//     },
//   );
//   return {
//     // eslint-disable-next-line consistent-return
//     read() {
//       if (status === 'pending') {
//         throw suspender;
//       } else if (status === 'error') {
//         throw result;
//       } else if (status === 'success') {
//         return result;
//       }
//     },
//   };
// }

// function fetchUser() {
//   console.log('fetch user...');
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log('fetched user');
//       resolve({
//         name: 'Ringo Starr',
//       });
//     }, 1000);
//   });
// }

// function fetchPosts() {
//   console.log('fetch posts...');
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log('fetched posts');
//       resolve([
//         {
//           articleId: '001',
//           title: '“彩虹之国”南非',
//           coverImg:
//             'https://ccdn.goodq.top/caches/249a4e899082a6b48f46e5b4e4ae8a14/aHR0cDovL3ctNTE5NjktMzgwNTYtOTI5NzUuMTA2MTUxNzkyMDMuc2l0ZXMuY25mcmVlMDcucWlmZWl5ZS5jb20vcWZ5LWNvbnRlbnQvdXBsb2Fkcy8yMDE5LzEwLzc2N2NlZWQ0NjE2M2ZjYzdhNmMyNDAyNmVhNzBhZjAyLTQyMHgyNTAuanBn.jpg',
//           content:
//             '南非世界杯即将拉开战幕，对于将赴南非观赛的中国球迷来说，除了看球之外，南非的迷人风光也不能错过。今年3月我曾经去过素有“彩虹之国”...',
//           reading: 20,
//           support: 30,
//           date: '2021-01-01',
//         },
//       ]);
//     }, 2000);
//   });
// }

// // eslint-disable-next-line import/prefer-default-export
// export function fetchProfileData() {
//   const userPromise = fetchUser();
//   const postsPromise = fetchPosts();
//   return {
//     user: wrapPromise(userPromise),
//     posts: wrapPromise(postsPromise),
//   };
// }
