import { Button } from '@chakra-ui/react';
import { PaginationPropsDTO } from '../../services/hooks/useUsers';

interface PaginationItemProps {
  pageProps: PaginationPropsDTO;
  number: number;
  isCurrent?: boolean;
  onPageChange: (data: PaginationPropsDTO) => void;
}
export function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
  pageProps,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="pink"
        disabled
        _disabled={{ backgroundColor: 'pink.500', cursor: 'default' }}
      >
        {number}
      </Button>
    );
  }
  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      backgroundColor="gray.700"
      _hover={{ backgroundColor: 'gray.500' }}
      onClick={() => onPageChange({ ...pageProps, skip: number })}
    >
      {number}
    </Button>
  );
}
