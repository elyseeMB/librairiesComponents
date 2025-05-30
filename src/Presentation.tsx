import { useRef } from "react";
import { Button } from "./stories/atoms/button/Button.tsx";
import { Icon, IconSymbols } from "./stories/atoms/icon/Icon.tsx";
import { Tooltip } from "./stories/molecules/Tooltip/Tooltip.tsx";
import {
  TooltipContextProvider,
  useTooltip,
} from "./stories/molecules/Tooltip/TooltipContext.tsx";
import { Combobox } from "./stories/molecules/combobox/Combobox.tsx";
import * as Form from "./components/Form.tsx";
import {
  ToastContextProvider,
  useToast,
} from "./stories/molecules/toast/useToast.tsx";
import { DialogConfirm } from "./stories/molecules/DialogConfirm/DialogConfirm.tsx";
import { Toaster, toast } from "sonner";

const label = {
  button: "Default +",
};

export function App() {
  return (
    <div className="page-wrapper">
      <ToastContextProvider>
        <TooltipContextProvider>
          <div className="container">
            <Presentation />
            <Toaster />
          </div>
        </TooltipContextProvider>
      </ToastContextProvider>
    </div>
  );
}

export function Presentation() {
  const ref = useRef(null);
  const { show } = useTooltip(ref);
  const { pushToast } = useToast();

  const handleToast = () => {
    pushToast({
      title: "je suis le Toast",
      content: "je suis le content",
      duration: 2000,
    });
  };

  return (
    <>
      <div>
        <h1>Bienvenue sur la documentation UI</h1>
        <a href="./storybook/" target="_blank" rel="noopener noreferrer">
          Ouvrir Storybook
        </a>
      </div>
      <div className="presentation">
        <div className="stack">
          <div className="block">
            <h1>Button</h1>
            <div className="hstack">
              <Button variant="primary" children={label.button} />
              <Button variant="secondary" children={label.button} />
              <Button variant="destructive" children={label.button} />
              <Button variant="outline" children={label.button} />
              <Button variant="ghost" children={label.button} />
              <Button variant="link" children={label.button} />
              <Button icon={<Icon name="ArrowRightLine" />} />
              <Button
                variant="with-icon"
                children={label.button}
                icon={<Icon name="MailLine" />}
              />
              <Button
                variant="loading"
                children={label.button}
                icon={<Icon name="SpinnerLine" />}
              />
            </div>
            <div className="hstack">
              <Button disabled variant="primary" children={label.button} />
              <Button disabled variant="secondary" children={label.button} />
              <Button disabled variant="destructive" children={label.button} />
              <Button disabled variant="ghost" children={label.button} />
              <Button disabled variant="link" children={label.button} />
            </div>
            <div className="hstack">
              <Button size="large" children={label.button} />
            </div>
            <div className="hstack">
              <Button size="medium" children={label.button} />
            </div>
            <div className="hstack">
              <Button size="small" children={label.button} />
            </div>
          </div>
          <hr />
          <div className="block">
            <h1>Combobox</h1>
            <div className="hstack">
              <Combobox info="je suis le message" />
            </div>
          </div>
          <hr />
          <div className="block">
            <h1>Tooltip</h1>
            <div className="hstack">
              <Tooltip message="t is a long established" />
              <Tooltip message="t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)." />
            </div>
          </div>
          <hr />
          <div className="block">
            <h1>Tooltip - Context</h1>
            <div className="hstack">
              <Button
                ref={ref}
                onMouseEnter={(e) => {
                  console.log("Button tooltip triggered", e);
                  show({
                    message:
                      "like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
                  });
                }}
                children="tooltip-context"
              />
            </div>
          </div>
          <hr />
          <div className="block">
            <h1>Tooltip - Context</h1>
            <div className="hstack">
              <Button onClick={handleToast} children="Toast" />
              <Button
                onClick={() =>
                  toast("je suis le title", {
                    closeButton: true,
                  })
                }
                children="sonner toast"
              />
            </div>
          </div>
          <hr />
          <div className="block">
            <h1>Confirm Dialog</h1>
            <div className="hstack">
              <DialogConfirm open={false} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
