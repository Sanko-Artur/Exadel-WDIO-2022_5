// noinspection NpmUsedModulesInstalled
const { When, Then, Given } = require('@cucumber/cucumber');
const YAML = require('yaml');
const { Login } = require('../../src/PO/login.po');
const { CustomPage } = require('../../src/PO/custom_page.po');
const { CustomPage2 } = require('../../src/PO/custom_page_2.po');
const { Table } = require('../../src/PO/tables/table.po');
const Subscribe = require('../../src/PO/forms/subscribe.model');

When(/^I go to "([^"]*)"$/, async function (url) {
  await browser.maximizeWindow();
  await browser.url(url);
});

When(/^I login as: "([^"]*)" and "([^"]*)"$/, async function (login, password) {
  await $('#login').setValue(login);
  await $('#password').setValue(password);
});

Then(/^After log in I get "([^"]*)" message$/, async function (message) {
  const elem = await $('#error');
  await expect(elem).toHaveText(message);
});

When(
  /^I check the texts after unsuccessful log in:$/,
  async function (datatable) {
    const rows = datatable.hashes();
    for (const row of rows) {
      await $('#login').setValue(row.login);
      await $('#password').setValue(row.password);
      await $('button').click();
      expect(await $('#error')).toHaveText(row.message);
    }
  }
);

When(/I click button Login/, async function () {
  await $('button').click();
  await $('//div[@class="spinner-border text-light"]').waitForDisplayed({
    timeout: 15000,
    reverse: true,
    timeoutMsg: `After 15 sec the element: '//div[@class="spinner-border text-light"]' was not disappear`,
  });
});

When(/^I check the texts of the elements:$/, async function (table) {
  const rows = table.hashes();
  for (const row of rows) {
    expect(await $(row.selector).getText()).toEqual(row.text);
  }
});

When(
  /^I expect element: "([^"]*)" (text|value): "([^"]*)"$/,
  async function (selector, type, text) {
    const methods = {
      text: 'getText',
      value: 'getValue',
    };
    expect(await $(selector)[methods[type]]()).toEqual(text);
  }
);

When('I go to {string} menu item', async function (item) {
  await $(`//a[text()[contains(.,"${item}")]]`).click();
});

When('I login as: {string}, {string}', async function (login, password) {
  await Login.login({ username: login, password: password });
});

async function invokeMethodOnPo(action, pretext, po, element, parameters) {
  if ('string' === typeof parameters) {
    if (parameters.includes('[')) {
      paramsArr = JSON.parse(parameters);
      await eval(po)[element][action](...paramsArr);
      return;
    }
    await eval(po)[element][action](parameters);
  }
}

When(
  /^I (\w+) (on|at|in|into) (\w+) (\w+)(?:| with parameters:)$/,
  async function (action, pretext, po, element) {
    await invokeMethodOnPo(action, pretext, po, element);
  }
);

When(
  /^I (\w+) (on|at|in|into) (\w+) (\w+) with parameters: '([^']*)'$/,
  async function (action, pretext, po, element, parameters) {
    await invokeMethodOnPo(action, pretext, po, element, parameters);
  }
);

When(/^I search for "([^"]*)"$/, async function (text) {
  await CustomPage.search.setValue(text);
  await CustomPage2.header.search.setValue(text);
});

When(/^I sort table by "([^"]*)"$/, async function (name) {
  const data = await Table.data();
  const head = await (await Table.headers())
    .filter((item) => item.name === name)[0]
    .element.click();
  console.log({ head });
  console.log({ data });
  // console.log(JSON.stringify(data));
});

When(/^I fill form:$/, async function (formYaml) {
  const formData = YAML.parse(formYaml);

  async function setValue(selector, value) {
    await $(selector).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${selector} was not displayed`,
    });
    await $(selector).setValue(value);
  }

  async function clickCreateButton() {
    await $("//button[@type='submit']").waitForDisplayed({ timeout: 5000 });
    await $("//button[@type='submit']").click();
  }

  for (const data in formData) {
    switch (data) {
      case 'email':
        await setValue(`#${data}`, formData[data]);
        break;
      case 'password':
        await setValue(`#${data}`, formData[data]);
        break;
      case 'address1':
        await setValue(`#${data}`, formData[data]);
        break;
      case 'address2':
        await setValue(`#${data}`, formData[data]);
        break;
      case 'city':
        await setValue(`#${data}`, formData[data]);
        break;
      case 'zip':
        await setValue(`#${data}`, formData[data]);
        break;
      case 'description':
        await setValue(`#${data}`, formData[data]);
        break;
    }
  }
  await clickCreateButton();
});
