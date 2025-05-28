import { useState } from "react";
import { classNames } from "../../../utils/dom.ts";
import { Button } from "../../atoms/button/Button.tsx";
import styles from "./DialogConfirm.module.css";

export function DialogConfirm({
  onCancel,
  onConfirm,
  open: OpenModal = false,
}: {
  onCancel?: () => void;
  onConfirm?: () => void;
  open: Boolean;
}) {
  const [open, setOpen] = useState(OpenModal);

  
  return (
    <>
      {open && (
        <div className={classNames(styles.wrapper)}>
          <div className={classNames(styles.confirmDialog)}>
            <div className={classNames(styles.info)}>
              <h3 className={classNames(styles.title)}>
                Voulez vous vraiment confirmé
              </h3>
              <div className={classNames(styles.description)}>
                cette action est irréversible
              </div>
            </div>
            <div className={classNames(styles.actions)}>
              <Button onClick={() => onCancel} variant="destructive">
                annulé
              </Button>
              <Button onClick={() => onConfirm} variant="secondary">
                confirmé
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
