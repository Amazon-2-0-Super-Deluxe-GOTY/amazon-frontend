export interface SellerInfo {
  fullName: string;
  isTopSeller: boolean;
  byersRatingPercent: number;
  descriptionRating: number;
  serviceRating: number;
  complaintsPercent: number;
  registerAt: Date;
  ratingsRemoved: {
    marketplace: number;
    byers: number;
  };
  ratingsExcluded: number;
}
