'use strict';

const TELEGRAM_BOT_TOKEN = '6848506487:AAG7dbzS-AqoYUMELZLgWqJifQ5zajGJrOA';
const TELEGRAM_CHAT_ID = '@TestFormSend';
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

async function sendEmailTelegram(event) {
   event.preventDefault();

   const form = event.target;
   const formBtn = document.querySelector('.form__submit-button button');
   const formSendResult = document.querySelector('.form__send-result');

   formSendResult.textContent = '';

   // where data will be sent
   // we can remove it a little later

   //const formData = new FormData(form);
   //const formDataObject = Object.fromEntries(formData.entries());

   const { name, email, pass, phone } = Object.fromEntries(
      new FormData(form).entries()
   );

   // create variable to which i will send form message result

   const text = `Application from ${name}\nEmail: ${email}\nPhone: ${phone}\nPassport data: ${pass}`;

   try {
      formBtn.textContent = 'Loading...';

      const response = await fetch(API, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text,
         }),
      });

      if (response.ok) {
         formSendResult.textContent = `Thank you! we will contact you shortly`;
         form.reset();
      } else {
         throw new Error(response.statusText);
      }
   } catch (error) {
      console.error(error);
      formSendResult.textContent = `The application wasn't sent. Try again later`;
      formSendResult.style.color = 'red';
   } finally {
      formBtn.textContent = 'Send Request';
   }
}
