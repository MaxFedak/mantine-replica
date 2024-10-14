import React, {useState} from 'react';
import './styles/main.scss';
import TextInput from './components/TextInput';
import Selector from "./components/Selector";

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
];

function App() {

  const [selectedValue, setSelectedValue] = useState(null);
  const handleChange = (item) => {
    console.log(item)
    setSelectedValue(item)
  }

  return (
    <div className="container">
      <div className="form-components">
        <TextInput
          label="Username"
          placeholder="Enter your username"
        />
        <Selector
          label="Searchable select"
          placeholder="Search me"
          data={options}
          onChange={handleChange}
          value={selectedValue}
          searchable={true}
        />
        <TextInput
          label="Password"
          type="password"
          placeholder="Enter your password"
        />
        <TextInput
          label="Error example"
          type="email"
          placeholder="Oh no"
          error="some error occured"
          required
        />
      </div>
    </div>
  );
}

export default App;
