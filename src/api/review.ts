export function getReviewTranslation(reviewId: string, to: string) {
  return fetch("/api/review/translate", {
    method: "POST",
    body: JSON.stringify({ reviewId, to }),
  }).then((r) => r.json());
}
