import { Button } from "./stories/atoms/button/Button.tsx";

const label = {
  button: "Default +",
};

export function Presentation() {
  return (
    <div className="container">
      <div>
        <h1>Bienvenue sur la documentation UI</h1>
        <a href="/storybook-static" target="_blank" rel="noopener noreferrer">
          Ouvrir Storybook
        </a>
      </div>
      <div className="presentation">
        <div className="stack">
          <div className="hstack">
            <Button variant="primary" children={label.button} />
            <Button variant="secondary" children={label.button} />
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
