import React from "react";

const NODES = ["form", "div", "label", "h2", "h3", "input"] as const;

type Primitives = {
  [E in (typeof NODES)[number]]: PrimitiveForwardRefComponent<E>;
};

type PrimitivePropsWithRef<E extends React.ElementType> =
  React.ComponentPropsWithRef<E>;

interface PrimitiveForwardRefComponent<E extends React.ElementType>
  extends React.ForwardRefExoticComponent<PrimitivePropsWithRef<E>> {}

const Primitive = NODES.reduce((primitive, node) => {
  const Node = React.forwardRef(
    (props: PrimitivePropsWithRef<typeof node>, ref) => {
      const { ...primitiveProps } = props;
      const Comp: any = node;
      return <Comp {...primitiveProps} ref={ref} />;
    }
  );

  return { ...primitive, [node]: Node };
}, {} as Primitives);

const Root = Primitive;

export { Primitive, Root };
