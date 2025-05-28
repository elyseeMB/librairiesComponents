import { classNames } from "../../../utils/dom.ts";
import styles from "./Toast.module.css";

export function Toast({ title, content }: { title: string; content: string }) {
  return (
    <div className={classNames(styles.toast)}>
      <div>{title}</div>
      <div>{content}</div>
    </div>
  );
}
