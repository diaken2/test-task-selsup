import { useState } from "react";

interface Param {
  id: number;
  name: string;
  type: "string";
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

const ParamEditor = ({ params, model }: Props) => {
  const [paramValues, setParamValues] = useState(model.paramValues);

  const handleParamChange = (paramId: number, value: string) => {
    const newParamValues = paramValues.map((pv) =>
      pv.paramId === paramId ? { ...pv, value } : pv,
    );
    setParamValues(newParamValues);
  };

  const getModel = (): Model => {
    alert("Модель получена, посмотрите консоль");
    return {
      ...model,
      paramValues,
    };
  };

  return (
    <div>
      {params.map((param) => (
        <div key={param.id}>
          <label>{param.name}</label>
          <input
            type="text"
            value={
              paramValues.find((pv) => pv.paramId === param.id)?.value || ""
            }
            onChange={(e) => handleParamChange(param.id, e.target.value)}
          />
        </div>
      ))}

      <button onClick={() => console.log(getModel())}>Получить модель</button>
    </div>
  );
};
const params: Param[] = [
  { id: 1, name: "Назначение", type: "string" },
  { id: 2, name: "Длина", type: "string" },
];
const model: Model = {
  paramValues: [
    { paramId: 1, value: "повседневное" },
    { paramId: 2, value: "макси" },
  ],
};
const App = () => {
  return <ParamEditor params={params} model={model} />;
};
export default App;
