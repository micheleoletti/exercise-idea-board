import { PropsWithChildren, useState } from "react";

export default function ContentEditable(props: PropsWithChildren) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return <>{props.children}</>;
  }

  return <></>;
}
