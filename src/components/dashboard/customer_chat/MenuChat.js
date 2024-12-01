import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { BiMenu } from "react-icons/bi";

export default function MenuChat() {
  const items = [
    {
      key: "new",
      label: "New file",
    },
    {
      key: "copy",
      label: "Copy link",
    },
    {
      key: "edit",
      label: "Edit file",
    },
    {
      key: "delete",
      label: "Delete file",
    }
  ];

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          isIconOnly
          radius="none"
          color="secondary"
        >
          <BiMenu size={24} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={items}>
        {(item) => (
          <DropdownItem
            key={item.key}
            color={item.key === "delete" ? "danger" : "default"}
            className={item.key === "delete" ? "text-danger" : ""}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}