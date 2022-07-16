import { Input, Text } from "@chakra-ui/react";
import { useState } from "react";

function ContendEditable(props: any) {
  const [isEditing, setIsEditing] = useState(true);

  debugger;
  if (isEditing) {
    return (
      <Input
        {...props}
        onBlur={() => {
          setIsEditing(false);
        }}
      ></Input>
    );
  }

  return <Text>{props.value ?? props.placeholder ?? "asdas"}</Text>;
}

export default ContendEditable;
