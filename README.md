# PowerApps PCF DecryptedTextBox

A PowerApps Component Framework (PCF) control for securely displaying decrypted text using React, Fluent UI, and CryptoJS.

![alt text](https://arpitshah.me/wp-content/uploads/2025/09/ReactFluent-EncryptDecrypt.png)

Encrpted TextBox - [text](https://github.com/arpitsvshah/PowerApps-PCF-EncryptedTextBox)
Decrypted Textbox - [text](https://github.com/arpitsvshah/PowerApps-PCF-DecryptedTextBox)

## Overview

This PCF control allows you to display a decrypted value from an encrypted string using a secret key, IV, and salt. It is built with React, styled using Fluent UI v9, and uses CryptoJS for AES decryption.

## Key Files

### `InputControl.tsx`

- **React functional component** that renders the decrypted text and optionally displays the input values (encrypted text, IV, salt).
- **UI**: Uses Fluent UI v9 components for consistent styling.
- **Decryption**: Uses CryptoJS to decrypt the provided encrypted text using the secret key, IV, and salt.
- **Props**:
  - `label`: Label for the control.
  - `fontSize`: Font size for the label and text.
  - `secretKey`: Secret key for decryption (required).
  - `encryptedText`: The encrypted string to decrypt.
  - `InputIV`: Initialization vector (IV) for decryption.
  - `InputSalt`: Salt for key derivation.
  - `showInputValues`: If true, displays the encrypted text, IV, and salt for debugging.

### `DecryptedTextBox/index.ts`

- **PCF control entry point** that implements the `ComponentFramework.ReactControl` interface.
- **Maps PowerApps properties** to the `InputControl` React component props.
- Handles lifecycle methods (`init`, `updateView`, `getOutputs`, `destroy`).

### `DecryptedTextBox/ControlManifest.Input.xml`

- **Declares the control's properties**:
  - `label` (string, optional, default: "Password")
  - `fontSize` (number, optional, default: 14)
  - `secretKey` (string, required)
  - `encryptedText` (string)
  - `InputIV` (string)
  - `InputSalt` (string)
  - `showInputValues` (boolean, optional, default: false)
- **Resources**: Specifies React and Fluent UI as dependencies.

## Usage

1. **Build the control**:
   ```powershell
   npm install
   npm run build
   ```
2. **Import the solution** into your Power Platform environment.
3. **Add the control** to a form or view and configure the properties as needed.

## Development

- **Lint**: `npm run lint`
- **Start (test harness)**: `npm start`
- **Rebuild**: `npm run rebuild`

## Dependencies

- [React 16.14.0](https://reactjs.org/)
- [Fluent UI v9](https://react.fluentui.dev/)
- [CryptoJS](https://github.com/brix/crypto-js)

## License

MIT
