import { Input } from "antd";
import "antd/dist/antd.css";
import { useState, useEffect, useCallback } from "react";
import "./App.scss";
import { fetchData } from "./utils/fetch";
import TodoCard from "./components/todo/TodoCard";
import { API_ACTION, ACTION } from "./utils/consts";
import { filterByNameAndTags, transferTagsToString } from "./utils/helper";

function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [todo, setTodo] = useState("");

  function onChangeInput(e) {
    setInput(e.target.value);
  }

  const fetchFromAPI = useCallback(async () => {
    const result = await fetchData(API_ACTION.GET);
    const json = await result.json();
    setList(json.records.map(transferTagsToString));
  }, []);

  useEffect(() => {
    fetchFromAPI();
  }, []);

  async function onDelete(item) {
    await fetchData(API_ACTION.DELETE, item);
    fetchFromAPI();
  }

  async function onChange(item, actionType, payload) {
    let updateItem;
    if (actionType === ACTION.STATUS_CHANGE) {
      const updateStatus = {
        Status: item.fields.Status === "Done" ? "Todo" : "Done",
      };
      updateItem = {
        id: item.id,
        fields: {
          ...updateStatus,
        },
      };
    }
    if (actionType === ACTION.TAGS_UPDATE) {
      const updateTags = {
        Tags: JSON.stringify(payload),
      };
      updateItem = {
        id: item.id,
        fields: {
          ...updateTags,
        },
      };
    }
    await fetchData(API_ACTION.UPDATE, {
      records: [{ ...updateItem }],
    });
    fetchFromAPI();

    setInput("");
  }

  function onChangeTodo(value) {
    setTodo(value);
  }

  async function onClickEnter(e) {
    if (e.key === "Enter" && todo.length > 0) {
      await fetchData(API_ACTION.ADD, { Text: todo });
      fetchFromAPI();
    }
  }
  return (
    <div className="App">
      <Input
        onChange={onChangeInput}
        placeholder={"Filter by tags. support hierarchical filter"}
        value={input}
      />
      {list.length > 0
        ? list.filter(filterByNameAndTags(input)).map((item, index) => {
            return (
              <TodoCard
                item={item}
                key={index}
                onDelete={() => onDelete(item)}
                onChange={(actionType, payload) =>
                  onChange(item, actionType, payload)
                }
              />
            );
          })
        : input.length > 0
        ? "There is no todo with this name/ tag"
        : "You dont have any Todo's"}
      <Input
        placeholder="Add new task, store on enter"
        value={todo}
        onChange={(e) => onChangeTodo(e.target.value)}
        onPressEnter={onClickEnter}
      />
    </div>
  );
}

export default App;
