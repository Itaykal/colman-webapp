export function loader({ params: { posdId } }: { params: { posdId: string } }): { posdId: string; } {
  return { posdId: posdId }
}
