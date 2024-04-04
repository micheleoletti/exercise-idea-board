import { PropsWithChildren, useState } from "react";

export default function ContentEditable(props: PropsWithChildren<any>) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return <>{props.children}</>;
  }

  return <></>;
}
