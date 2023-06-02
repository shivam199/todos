import React, { FC } from "react";
import styled from "@emotion/styled";

export const Wrapper = styled.label({
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderRadius: 4,
  marginBottom: 8,
  padding: 16,
  background: "white",
  fontWeight: "400",
  fontSize: 14,
  cursor: "pointer",
  position: "relative",
});

const Label = styled.span<{ checked: boolean }>(({ checked }) => ({
  textDecoration: checked ? "line-through" : "none",
  fontSize: 20,
  margin: 0,
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignItems: "center",
}));

const Checkbox = styled.input({
  width: 16,
  height: 16,
  marginRight: 12,
});

const CrossIcon = styled.span({
  position: 'absolute',
  fontSize: 20,
  margin: 0,
  color: "red",
  right: 15,
});

export interface TodoItemProps {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: (id: string) => void;
  onCrossClick?: (id: string) => void;
}

export const TodoItem: FC<TodoItemProps> = ({
  id,
  label,
  checked = false,
  onChange,
  onCrossClick,
}) => {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  }; return (
    <Wrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Checkbox
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(id)}
      />
      <Label checked={checked}>{label}</Label>
      {isHovered && <CrossIcon onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        onCrossClick(id);
      }}>x</CrossIcon>}
    </Wrapper>
  );
};
