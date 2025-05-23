import { Button } from "./stories/atoms/button/Button.tsx";
import { Icon } from "./stories/atoms/icon/Icon.tsx";

const label = {
  button: "Default +",
};

export function Presentation() {
  return (
    <div className="container">
      <div>
        <h1>Bienvenue sur la documentation UI</h1>
        <a href="./storybook/" target="_blank" rel="noopener noreferrer">
          Ouvrir Storybook
        </a>
      </div>
      <div className="presentation">
        <div className="stack">
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
      </div>
    </div>
  );
}
