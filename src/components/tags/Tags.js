import { Input, Tag } from "antd";
import React, { useEffect, useState } from "react";
import "./style.scss";

const Tags = ({ tgs, onAddTags }) => {
  const [tags, setTags] = useState(tgs || []);
  const [tagName, setTagName] = useState("");

  function onSaveTag(e) {
    if (e.key === "Enter" && tagName.length > 0) {
      setTags((prev) => [tagName, ...prev]);
      onAddTags([...tags, tagName]);
      setTagName("");
    }
  }

  useEffect(() => {}, [tagName, tgs]);
  return (
    <div className="tags">
      <div className="content">
        {tags
          ? tags.map((t, index) => (
              <Tag className="tag-ref" key={index}>
                {t}
              </Tag>
            ))
          : null}
      </div>
      <div className="input">
        <Input
          placeholder="Add new tag"
          value={tagName}
          className="tags-input"
          onChange={(e) => setTagName(e.target.value)}
          onKeyDown={onSaveTag}
        />
      </div>
    </div>
  );
};

export default Tags;
