import React, { type PropsWithChildren } from "react";

export function createContext(rootComponentName: string, defaultContext: any) {
  const Context = React.createContext(defaultContext);

  const Provider = (props: PropsWithChildren<{}>) => {
    const { children, ...context } = props;

    return <Context.Provider value={context}>{children}</Context.Provider>;
  };

  function useContext(consumerName: string) {
    const context = React.useContext(Context);
    if (context) {
      return context;
    }
    if (defaultContext !== undefined) {
      return defaultContext;
    }

    throw new Error(
      `\`${consumerName}\` must be used within \`${rootComponentName}\``
    );
  }

  return [Provider, useContext] as const;
}
