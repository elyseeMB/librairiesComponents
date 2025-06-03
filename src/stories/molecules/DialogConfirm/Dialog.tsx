import { classNames } from "../../../utils/dom.ts";
import { Button } from "../../atoms/button/Button.tsx";
import styles from "./DialogConfirm.module.css";
import { Icon } from "../../atoms/icon/Icon.tsx";

export function Dialog({
  onCancel,
  onConfirm,
  loading,
  open: OpenModal = false,
}: {
  onCancel?: () => void;
  onConfirm?: () => void;
  open: boolean;
  loading?: boolean | undefined;
}) {
  console.log(loading);
  return (
    <>
      {OpenModal && (
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
              <Button
                disabled={loading}
                onClick={onCancel}
                variant="destructive"
              >
                annulé
              </Button>
              <Button
                disabled={loading}
                onClick={onConfirm}
                variant={loading ? "loading" : "secondary"}
              >
                {loading && <Icon name="SpinnerLine" />}
                confirmé
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
