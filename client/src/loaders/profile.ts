export function loader({ params: { userId } }: { params: { userId: string } }): { userId: string; } {
    return {userId: userId}
  }
  