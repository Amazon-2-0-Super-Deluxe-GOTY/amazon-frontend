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
