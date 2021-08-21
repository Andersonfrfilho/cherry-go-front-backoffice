import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
  IconButton,
  Icon,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';
import { forwardRef, ForwardRefRenderFunction } from 'react';

interface ButtonProps {
  onClick?: () => void;
  title?: string;
  icon?: any;
  transition?: boolean;
  active?: boolean;
}
interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
  button?: boolean;
  buttonProps?: ButtonProps;
  mask?: string;
  isDisabled?: boolean;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    name,
    label,
    isDisabled = false,
    error = null,
    button,
    buttonProps,
    ...rest
  },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputGroup>
        <ChakraInput
          id={name}
          name={name}
          focusBorderColor="pink.500"
          backgroundColor="gray.900"
          variant="filled"
          _hover={{
            backgroundColor: 'gray.900',
          }}
          isDisabled={isDisabled}
          size="lg"
          ref={ref}
          {...rest}
        />
        {button && (
          <InputRightElement height="100%" paddingRight="3">
            {buttonProps.icon ? (
              <IconButton
                type="button"
                aria-label={buttonProps.title}
                icon={<Icon as={buttonProps.icon} />}
                fontSize="24"
                variant="filled"
                onClick={buttonProps.onClick}
                backgroundColor={
                  buttonProps.transition ? 'pink.500' : 'gray.500'
                }
              />
            ) : (
              <Button
                height="80%"
                size="sm"
                colorScheme="pink"
                onClick={buttonProps.onClick}
              >
                buttonProps.title
              </Button>
            )}
          </InputRightElement>
        )}
      </InputGroup>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};
export const Input = forwardRef(InputBase);
