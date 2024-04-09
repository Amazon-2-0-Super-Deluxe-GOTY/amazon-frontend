interface StarsStatistic {
  stars: 1 | 2 | 3 | 4 | 5;
  percentage: number;
}

export interface ReviewsStatistic {
  score: number;
  reviewsCount: number;
  starsStatistic: StarsStatistic[];
  tags: string[];
}

export interface Review {
  user: {
    avatar: string;
    fullName: string;
    location: string;
  };
  options: { title: string; value: string }[];
  images?: string[];
  title: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  reviewRatesCount: number;
  isRatedByUser: boolean;
  createdAt: Date;
}
