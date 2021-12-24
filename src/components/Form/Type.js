import { Flex, Text, Stack, Box, Grid, Checkbox, Button, CheckboxGroup } from "@chakra-ui/react";


const Type = ({ props, children, ...rest }) => (
    <Button
        width="100%"
        color="#898989"
        borderColor="#191191191"
        rounded="4px"
        variant="outline"
        _hover={{ bg: "#BEFEF2" }}
        {...rest}
    >
        {children}

    </Button>
);
export default Type;