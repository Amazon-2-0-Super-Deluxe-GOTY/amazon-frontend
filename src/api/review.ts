import { useQuery } from "@tanstack/react-query";

export function getReviewTranslation(reviewId: string, to: string) {
  return fetch("/api/reviews/translate", {
    method: "POST",
    body: JSON.stringify({ reviewId, to }),
  }).then((r) => r.json());
}

// export function useTranslation(reviewId: string, language: string) {
//   return useQuery<{ title: string; text: string }>({
//     queryKey: ["translation", reviewId],
//     queryFn: () => getReviewTranslation(reviewId, language),
//     enabled: false,
//   });
// }
