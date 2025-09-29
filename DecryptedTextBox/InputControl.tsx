import * as React from "react";
import * as CryptoJs from "crypto-js";
import { makeStyles, useId, Input, Label } from "@fluentui/react-components";

export interface IInputControlProps {
  fontSize?: number; // Font size for tree node labels (in px)
  label: string;
  secretKey: string;
  encryptedText?: string;
  InputIV?: string;
  InputSalt?: string;
  showInputValues?: boolean;
}

export interface IOutputControlProps {
  Text?: string;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    width: "100%",
    maxWidth: "100%",
  },
  fullWidth: {
    width: "100%",
    boxSizing: "border-box",
  },
});

export const InputControl: React.FC<IInputControlProps> = ({
  fontSize,
  label,
  secretKey,
  encryptedText,
  InputIV,
  InputSalt,
  showInputValues,
}) => {
  const labelId = useId("label");
  const styles = useStyles();
  const [inputValue, setInputValue] = React.useState("");
  const [output, setOutput] = React.useState<IOutputControlProps>({
    Text: "",
  });

  const decrypt = (value: string): IOutputControlProps => {
    if (!value) return { Text: "" };
    const salt: CryptoJs.lib.WordArray = CryptoJs.enc.Base64.parse(
      InputSalt ?? ""
    );
    const iv: CryptoJs.lib.WordArray = CryptoJs.enc.Base64.parse(InputIV ?? "");
    const key: CryptoJs.lib.WordArray = CryptoJs.PBKDF2(secretKey, salt, {
      keySize: 256 / 32,
      iterations: 1000,
    });
    let decrypted: string;
    try {
      decrypted = CryptoJs.AES.decrypt(value, key, {
        iv: iv,
        padding: CryptoJs.pad.Pkcs7,
        mode: CryptoJs.mode.CBC,
      }).toString(CryptoJs.enc.Utf8);
    } catch (error) {
      decrypted = "";
    }

    return {
      Text: decrypted,
    };
  };

  return (
    <div className={styles.root}>
      <Label
        style={fontSize ? { fontSize: fontSize } : undefined}
        className={styles.fullWidth}
      >
        {label}
      </Label>
      <Label
        style={fontSize ? { fontSize: fontSize } : undefined}
        className={styles.fullWidth}
      >
        {decrypt(encryptedText ?? "").Text}
      </Label>
      {showInputValues && (
        <div
          style={{
            marginTop: "12px",
            fontSize: fontSize ?? "12px",
            wordBreak: "break-all",
          }}
        >
          <div>
            <strong>Encrypted Text:</strong> {encryptedText}
          </div>
          <div>
            <strong>IV:</strong> {InputIV}
          </div>
          <div>
            <strong>Salt:</strong> {InputSalt}
          </div>
        </div>
      )}
    </div>
  );
};
