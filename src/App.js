import React from "react";
import "./styles.css";

export default function App() {
  let [params, setParams] = React.useState([
    {
      key: "partner",
      value: ""
    },
    {
      key: "org",
      value: ""
    },
    {
      key: "email",
      value: ""
    },
    {
      key: "owner",
      value: ""
    }
  ]);
  let [baseURL, setBaseUrL] = React.useState(
    "forms.zohopublic.com/azentlab/form/StudentProfileAssessmentForm/formperma/K4DFFgiLtxx3wvlu7UlNeTRbwEHjnPS2NyX8iJxqy0A"
  );
  let [url, setUrl] = React.useState("");
  React.useEffect(() => {
    if (!baseURL) {
      setUrl("");
      return;
    }
    let urlWithParams = new URL("https://" + baseURL);
    params.forEach((param) => {
      if (param.key && param.value) {
        urlWithParams.searchParams.append(param.key, param.value);
      }
    });
    setUrl(urlWithParams.toString());
  }, [baseURL, params]);

  const addItem = function () {
    let newParams = [...params];
    newParams.push({
      key: "",
      value: ""
    });
    setParams(newParams);
  };

  const onChange = function (index, type) {
    return function (e) {
      let newParams = [...params];
      newParams[index][type] = e.target.value;
      setParams(newParams);
    };
  };

  const removeQueryParam = function (index) {
    return function () {
      let newParams = params.filter((i, _index) => _index !== index);
      setParams(newParams);
    };
  };
  return (
    <div className="root">
      <div className="App">
        <h2>Azent URL Builder </h2>
        <div>
          <span>Enter Base URL</span>
          <span>
            <span className="https">https://</span>
            <input
              type="text"
              value={baseURL}
              onChange={(e) => setBaseUrL(e.target.value)}
            />
          </span>
        </div>
        <div className="querySection">
          <h5> Query Params </h5>
          {params.map((item, index) => (
            <div key={index}>
              <input
                type="text"
                value={item.key}
                placeholder="key"
                onChange={onChange(index, "key")}
              />
              <input
                type="text"
                value={item.value}
                placeholder="value"
                onChange={onChange(index, "value")}
              />
              <button onClick={removeQueryParam(index)}> Remove </button>
            </div>
          ))}
          <button onClick={addItem}>Add Query Param</button>
          <div className="urlSection">
            <div className="urlHeading"> Generated URL: </div>
            <div className="url"> {url}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
