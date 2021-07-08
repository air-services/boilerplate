const calculatePagination = ({
  page,
  pages,
}: {
  page: number;
  pages: number;
}) => {
  const limit = 2;
  const elements = Array.apply(null, Array(pages)).map(
    (element, index) => index + 1
  );

  return elements.reduce((result: number[], element: number) => {
    if (page - element > 3 && element > limit && pages > limit * 5) {
      return result[result.length - 1] === -1 ? result : [...result, -1];
    }

    if (
      element - page > limit &&
      pages - element > limit &&
      pages > limit * 5
    ) {
      return result[result.length - 1] === -2 ? result : [...result, -2];
    }

    return [...result, element];
  }, []);
};

export default calculatePagination;
