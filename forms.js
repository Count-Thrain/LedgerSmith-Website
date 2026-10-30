// Submits every .js-form to its Formspree endpoint without leaving the page.
// Set your form ID in each form's action: https://formspree.io/f/YOUR_FORM_ID
(function () {
  document.querySelectorAll('.js-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  document.querySelectorAll('form.js-form').forEach(function (form) {
    var status = form.querySelector('.form-status');
    var button = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (form.action.indexOf('YOUR_FORM_ID') !== -1) {
        if (status) status.textContent = 'This form isn’t connected yet. Add your Formspree form ID to send submissions.';
        return;
      }

      var label = button ? button.textContent : '';
      if (button) { button.disabled = true; button.textContent = 'Sending…'; }
      if (status) status.textContent = '';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          if (!response.ok) throw new Error('Request failed');
          form.reset();
          if (status) status.textContent = 'Thanks! We’ll be in touch within one business day.';
        })
        .catch(function () {
          if (status) status.textContent = 'Something went wrong. Please email us at hello@ledgersmithbookkeeping.com.';
        })
        .finally(function () {
          if (button) { button.disabled = false; button.textContent = label; }
        });
    });
  });
})();
