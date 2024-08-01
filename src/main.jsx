import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ModalProvider } from "./contexts/ModalContext";

const Widget = {
	render(self) {

    const FormPayment_div = document.querySelector('.react-app__academy-tema');
    if (FormPayment_div)  { FormPayment_div.remove() }
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.setAttribute('class', 'react-app__academy-tema');

    ReactDOM.createRoot(
      div,
    ).render(
        <ModalProvider>
          <App widget={self}/>
        </ModalProvider>,
    );

		return true;
	},
	init() {

		return true;
	},
	bind_actions() {
		return true;
	},
	settings() {
		return true;
	},
	onSave() {
    return true;
  },
	destroy() {
    return true;
  },
};



export default Widget;