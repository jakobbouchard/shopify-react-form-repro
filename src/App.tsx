import { useForm, useField, useDynamicList } from "@shopify/react-form";
import { useEffect } from "react";

function exampleFactory() {
  return { id: Date.now() };
}

function App() {
  const {
    fields: { dummy },
    dynamicLists: { example },
    submit,
    dirty,
    makeClean,
  } = useForm({
    fields: {
      dummy: useField("normal text field"),
    },
    dynamicLists: {
      example: useDynamicList([{ id: 1234 }], exampleFactory),
    },
    makeCleanAfterSubmit: true, // Apparently doesn't work... it does in my project though.
    onSubmit: async (form) => {
      console.log("SUBMIT");
      console.log(form.dummy);
      // @ts-ignore-next-line
      console.table(form.example); // Also: types aren't working for dynamic fields
      makeClean();
      console.log("END SUBMIT");
      return { status: "success" };
    },
  });

  useEffect(() => {
    console.table(example.fields.map((f) => f.id.value));
  }, [example]);

  return (
    <>
      <input type="text" {...dummy} />
      <button
        onClick={() => {
          console.log("Adding item");
          example.addItem();
        }}
      >
        dynamicList.addItem()
      </button>
      <button
        onClick={() => {
          console.log("Setting new default values");
          example.newDefaultValue([{ id: 1 }, { id: 2 }]);
        }}
      >
        dynamicList.newDefaultValue(...)
      </button>
      <button disabled={!dirty} onClick={submit}>
        form.submit()
      </button>
      <button
        disabled={!dirty}
        onClick={() => {
          console.log("Making clean");
          makeClean();
        }}
      >
        form.makeClean()
      </button>
      <ul>
        {example.fields.map((field) => (
          <li key={field.id.value}>{field.id.value}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
