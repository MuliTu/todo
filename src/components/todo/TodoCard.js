import { Card } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import "./style.scss";
import Tags from "../tags/Tags";
import { ACTION } from "../../utils/consts";

const TodoCard = ({ onDelete, onChange, key, item }) => {
  const Text = item.fields.Text;
  const stringTag = item.fields.Tags;
  const Status = item.fields.Status;

  useEffect(() => {}, [item]);
  return (
    <Card key={key} className="todo-wrapper">
      <div className="todo-actions">
        <div className="checkbox-wrapper">
          <input
            type={"checkbox"}
            className="checkbox"
            checked={Status === "Done"}
            onChange={() => onChange(ACTION.STATUS_CHANGE)}
          />
        </div>
        <div>{Text}</div>
        <div>
          <DeleteOutlined
            style={{
              fontSize: "25px",
              position: "absolute",
              top: "14px",
              right: "14px",
            }}
            onClick={onDelete}
          />
        </div>
      </div>
      <div className="todo-tags">
        <Tags
          tgs={stringTag}
          onAddTags={(content) => onChange(ACTION.TAGS_UPDATE, content)}
        />
      </div>
    </Card>
  );
};

export default TodoCard;
