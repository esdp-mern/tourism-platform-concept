import React from 'react';
import { INews } from '@/type';
import { apiUrl } from '@/constants';
import { Fade } from 'react-awesome-reveal';
import Link from 'next/link';
import dayjs from 'dayjs';

interface Props {
  news: INews;
}

const NewsItem: React.FC<Props> = ({ news }) => {
  return (
    <Fade>
      <div className="card-news-img">
        <Link href={`/news/${news._id}`}>
          <div className="card-news-img-wrap">
            <img src={apiUrl + '/' + news.images[0]} alt={news.title} />
          </div>
        </Link>
        <div className="card-news-date">
          {dayjs(news.date).format('DD.MM.YYYY')}
        </div>
        <hr className="card-news-line" />
        <Link href={`/news/${news._id}`} className="news-item-link">
          <div className="one-news-title">{news.title}</div>
        </Link>
      </div>
    </Fade>
  );
};

export default NewsItem;
