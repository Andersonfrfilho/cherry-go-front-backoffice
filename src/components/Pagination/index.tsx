import { memo, useMemo } from 'react';
import { Stack, Box, Text } from '@chakra-ui/react';
import { PaginationItem } from './PaginationItem';
import { PaginationPropsDTO } from '../../services/hooks/useUsers';

export type PaginationProps = {
  total: number;
  limit?: number;
  currentPage?: number;
  onPageChange: (data: PaginationPropsDTO) => void;
  pageProps: PaginationPropsDTO;
  lastPage: number;
};

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter(page => page > 0);
}

function PaginationComponent({
  total,
  limit = 10,
  currentPage = 1,
  onPageChange,
  lastPage,
  pageProps,
}: PaginationProps) {
  // useMemo
  /**
   * 1. Calculo pesados
   * 2. Igualdade referencial
   */

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage),
        )
      : [];
  // const { lastPage, nextPages, previousPages } = useMemo(
  //   () => ({
  //     lastPage: Math.floor(totalCountOfRegisters / registersPerPage),
  //     previousPages:
  //       currentPage > 1
  //         ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
  //         : [],
  //     nextPages:
  //       currentPage < lastPage
  //         ? generatePagesArray(
  //             currentPage,
  //             Math.min(currentPage + siblingsCount, lastPage)
  //           )
  //         : [],
  //   }),
  //   [totalCountOfRegisters, registersPerPage, currentPage, onPageChange]
  // );
  // console.log('###########lastPage');
  // console.log(lastPage);
  // const previousPages = useMemo(
  //   () =>
  //     currentPage > 1
  //       ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
  //       : [],
  //   [currentPage, siblingsCount]
  // );

  // const nextPages = useMemo(
  //   () =>
  //     currentPage < lastPage
  //       ? generatePagesArray(
  //           currentPage,
  //           Math.min(currentPage + siblingsCount, lastPage)
  //         )
  //       : [],
  //   [lastPage]
  // );

  return (
    <Stack
      direction={['column', 'row']}
      spacing="6"
      marginTop="8"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <strong>{pageProps.skip}</strong> - <strong>{pageProps.limit}</strong>{' '}
        de <strong>{total}</strong>
      </Box>
      <Stack direction="row" spacing="2">
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem
              onPageChange={onPageChange}
              number={1}
              pageProps={pageProps}
            />
            {currentPage > 2 + siblingsCount && (
              <Text color="gray.300" width="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map(page => {
            return (
              <PaginationItem
                onPageChange={onPageChange}
                key={page}
                number={page}
                pageProps={pageProps}
              />
            );
          })}

        <PaginationItem
          onPageChange={onPageChange}
          number={currentPage}
          isCurrent
          pageProps={pageProps}
        />

        {nextPages.length > 0 &&
          nextPages.map(page => {
            return (
              <PaginationItem
                onPageChange={onPageChange}
                key={page}
                number={page}
                pageProps={pageProps}
              />
            );
          })}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text color="gray.300" width="8" textAlign="center">
                ...
              </Text>
            )}
            <PaginationItem
              onPageChange={onPageChange}
              number={lastPage}
              pageProps={pageProps}
            />
          </>
        )}
      </Stack>
    </Stack>
  );
}
// Memo
/**
 * 1. Pure Functional components
 * 2. Renders too often
 * 3. Re-renders with same props
 * 4. Medium to big size
 */
export const Pagination = memo(PaginationComponent, (prevProps, nextProps) => {
  return Object.is(prevProps, nextProps);
});
