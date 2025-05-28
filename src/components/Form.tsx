import React, { useEffect, useRef, type RefObject } from "react";
import { Primitive } from "./primitve/primitve.tsx";
import { createContext } from "./context/context.tsx";
import { isPreview } from "storybook/internal/csf";

const FORM_NAME = "Form";

const defaultShowTooltip = (
  id: string,
  tooltip: any,
  parentRef: RefObject<HTMLElement>
) => {};
const defaultHideTooltip = (id: string) => {};

const [Provider, useContext] = createContext(FORM_NAME, {
  showTooltipRef: { current: defaultShowTooltip },
  hideTooltipRef: { current: defaultHideTooltip },
});

type FormElement = React.ComponentRef<typeof Primitive.form>;
type FormProps = React.ComponentPropsWithRef<typeof Primitive.form>;

const Form = React.forwardRef<FormElement>((props: FormProps, forwardedRef) => {
  const { ...rootPros } = props;

  return (
    <Provider parent={forwardedRef}>
      <Primitive.form {...rootPros} ref={forwardedRef} />
    </Provider>
  );
});

const FIELD_NAME = "FormField";
const FormControl = (props) => {
  const context = useContext(FIELD_NAME);

  console.log(context);

  return <Primitive.input ref={context.parent} className="input" />;
};

const WRAPPER = "FormWrapper";
const FormWrapper = (props) => {
  return <Primitive.div className="wrapper" />;
};

Form.displayName = FORM_NAME;
const Control = FormControl;
const Root = Form;
const Wrapper = FormWrapper;
export { Form, Root, Control, FormControl, Wrapper };
