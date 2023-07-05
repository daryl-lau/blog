/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SvgIcon from '@/components/SvgIcon';
import './index.less';

export interface CarouselProps {
  children: React.ReactElement[];
}

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <SvgIcon name="angle-right" />
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <SvgIcon name="angle-left" />
    </div>
  );
};

const Carousel: React.FC<CarouselProps> = (props): React.ReactElement => {
  const { children } = props;
  const settings = {
    draggable: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // 要根据轮播的图片长度来决定，例如长度为2时，这里就应该为2，然后下方的box1的宽度也要有变化。
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <Slider {...settings}>
      {React.Children.map(children, (child) => (
        <div className="itme">
          <div className="inner">{child}</div>
        </div>
      ))}
    </Slider>
  );
};
export default Carousel;
