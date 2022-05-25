import { API_ACTION } from "./consts";

const GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  UPDATE = "PATCH";

const generateHeaders = ({ method, body }) => {
  const headers = {
    "Content-Type": "application/json",
    "x-api-key": "DD2cgT1gqo31G0rd0UCar5h2CGM3Z9Oa51ZG2uKe",
  };
  const mainRequest = body
    ? { headers: { ...headers }, method: method, body }
    : { headers: { ...headers }, method: method };
  return body
    ? {
        ...mainRequest,
        body: JSON.stringify(body),
      }
    : mainRequest;
};

const MAIN_URL =
  "https://tyn2p16cy2.execute-api.eu-west-1.amazonaws.com/prod/todos/";

export const fetchData = async (type, content) => {
  switch (type) {
    case API_ACTION.GET: {
      return await fetch(MAIN_URL, generateHeaders({ method: GET }));
    }
    case API_ACTION.ADD: {
      const newTodo = {
        records: [
          {
            fields: {
              Status: "Todo",
              Tags: "[]",
              Text: content.Text,
            },
          },
        ],
      };
      return await fetch(
        MAIN_URL,
        generateHeaders({ method: POST, body: newTodo })
      );
    }
    case API_ACTION.DELETE: {
      const deleteURL =
        MAIN_URL.slice(0, MAIN_URL.length - 1) + `?records[]=${content.id}`;
      return await fetch(deleteURL, generateHeaders({ method: DELETE }));
    }
    case API_ACTION.UPDATE: {
      return await fetch(
        MAIN_URL,
        generateHeaders({ method: UPDATE, body: content })
      );
    }

    default: {
      return null;
    }
  }
};
