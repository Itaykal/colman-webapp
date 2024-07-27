export function loader({ params: { postId } }: { params: { postId: string } }): { postId: string; } {
  return { postId: postId }
}
