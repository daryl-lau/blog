import React from 'react';
import Carousel from '@/components/Carousel';
import './index.less';

const data = [
  {
    imgSrc:
      'https://ccdn.goodq.top/caches/839dc0788a3192795149377a8f01e8f5/aHR0cHM6Ly81ZGJmOTY4MDU0YzE3LnQ3NC5xaWZlaXllLmNvbS9xZnktY29udGVudC91cGxvYWRzLzIwMTkvMTAvMDY2N2VhZDJhNTZiZWNmYzdiY2IzMjExMjI0NTExMThwcmV2aWV3X2ltYWdlLTI2OHgzMzgtOTAud2VicA_p_p100_p_3D_p_p100_p_3D.webp',
    title: '你认为幸福的，就去珍惜',
    date: '2019 11-31',
  },
  {
    imgSrc:
      'https://ccdn.goodq.top/caches/839dc0788a3192795149377a8f01e8f5/aHR0cHM6Ly81ZGJmOTY4MDU0YzE3LnQ3NC5xaWZlaXllLmNvbS9xZnktY29udGVudC91cGxvYWRzLzIwMTkvMTAvOWQ0N2Y2MGNlMzllODU1NGQwZWY0MGJhNjY4NzViN2JwcmV2aWV3X2ltYWdlLTI2OHgzMzgtOTAud2VicA_p_p100_p_3D_p_p100_p_3D.webp',
    title: '你认为幸福的，就去珍惜',
    date: '2020 05-31',
  },
  {
    imgSrc:
      'https://ccdn.goodq.top/caches/839dc0788a3192795149377a8f01e8f5/aHR0cHM6Ly81ZGJmOTY4MDU0YzE3LnQ3NC5xaWZlaXllLmNvbS9xZnktY29udGVudC91cGxvYWRzLzIwMTkvMTAvYjAyMTkyYTllMWYxZTEwZjU1ZTI5NDA4MTIxMDFiNmNwcmV2aWV3X2ltYWdlLTM1MHg0NDAtOTAud2VicA_p_p100_p_3D_p_p100_p_3D.webp',
    title: '你认为幸福的，就去珍惜',
    date: '2020 06-31',
  },
  {
    imgSrc:
      'https://ccdn.goodq.top/caches/839dc0788a3192795149377a8f01e8f5/aHR0cHM6Ly81ZGJmOTY4MDU0YzE3LnQ3NC5xaWZlaXllLmNvbS9xZnktY29udGVudC91cGxvYWRzLzIwMTkvMTAvMDY2N2VhZDJhNTZiZWNmYzdiY2IzMjExMjI0NTExMThwcmV2aWV3X2ltYWdlLTI2OHgzMzgtOTAud2VicA_p_p100_p_3D_p_p100_p_3D.webp',
    title: '你认为幸福的，就去珍惜',
    date: '2021 01-01',
  },
  {
    imgSrc:
      'https://ccdn.goodq.top/caches/839dc0788a3192795149377a8f01e8f5/aHR0cHM6Ly81ZGJmOTY4MDU0YzE3LnQ3NC5xaWZlaXllLmNvbS9xZnktY29udGVudC91cGxvYWRzLzIwMTkvMTAvOWQ0N2Y2MGNlMzllODU1NGQwZWY0MGJhNjY4NzViN2JwcmV2aWV3X2ltYWdlLTI2OHgzMzgtOTAud2VicA_p_p100_p_3D_p_p100_p_3D.webp',
    title: '你认为幸福的，就去珍惜',
    date: '2021 01-03',
  },
  {
    imgSrc:
      'https://ccdn.goodq.top/caches/839dc0788a3192795149377a8f01e8f5/aHR0cHM6Ly81ZGJmOTY4MDU0YzE3LnQ3NC5xaWZlaXllLmNvbS9xZnktY29udGVudC91cGxvYWRzLzIwMTkvMTAvYjAyMTkyYTllMWYxZTEwZjU1ZTI5NDA4MTIxMDFiNmNwcmV2aWV3X2ltYWdlLTM1MHg0NDAtOTAud2VicA_p_p100_p_3D_p_p100_p_3D.webp',
    title: '你认为幸福的，就去珍惜',
    date: '2021 01-04',
  },
];

const Banner: React.FC = () => {
  return (
    <div className="banner">
      <Carousel>
        {data.map((item) => (
          <div className="banner-item" key={item.date}>
            <img src={item.imgSrc} alt="" />
            <div className="title">
              <p>{item.title}</p>
              <span>{item.date}</span>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
