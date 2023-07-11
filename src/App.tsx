import React from 'react';


interface Color {
}

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}
interface Props {
  params: Param[];
  model: Model;
  onParamChange: (paramId: number, value: string) => void;
}
interface AppState {
  params: Param[];
  model: Model;
}
class ParamEditor extends React.Component<Props> {
  handleParamChange = (paramId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { onParamChange } = this.props;
    const value = e.target.value;
    onParamChange(paramId, value);
  };

  render() {
    const { params, model } = this.props;
    const { paramValues } = model;

    return (
      <div>
        {params.map((param) => {
          const paramValue = paramValues.find((pv) => pv.paramId === param.id);
          const value = paramValue ? paramValue.value : '';

          return (
            <div key={param.id}>
              <label htmlFor={`param_${param.id}`}>{param.name}</label>
              <input
                type="text"
                id={`param_${param.id}`}
                value={value}
                onChange={(e) => this.handleParamChange(param.id, e)}
              />
            </div>
          );
        })}
      </div>
    );
  }
}


class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      params: [
        { id: 1, name: 'Назначение', type: 'string' },
        { id: 2, name: 'Длина', type: 'string' },
      ],
      model: {
        paramValues: [
          { paramId: 1, value: 'повседневное' },
          { paramId: 2, value: 'макси' },
        ],
        colors: [],
      },
    };
  }

  handleParamChange = (paramId: number, value: string) => {
    const { model } = this.state;
    const { paramValues } = model;

    const updatedParamValues = paramValues.map((pv) =>
      pv.paramId === paramId ? { ...pv, value } : pv
    );
console.log(updatedParamValues)
    this.setState({
      model: {
        ...model,
        paramValues: updatedParamValues,
      },
    });
  };

  render() {
    const { params, model } = this.state;

    return (
      <div>
        <ParamEditor
          params={params}
          model={model}
          onParamChange={this.handleParamChange}
        />
      </div>
    );
  }
}

export default App;
