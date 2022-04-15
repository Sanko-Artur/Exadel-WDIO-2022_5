class BaseMethods {
  constructor() {
    this.url = 'https://viktor-silakov.github.io/course-sut/arkanoid.html';
    this.buttonPlay = '//button[text() = "PLAY"]';
  }

  async openURL() {
    await browser.maximizeWindow();
    await browser.url(this.url);
  }

  async clickButtonPlay() {
    await $(this.buttonPlay).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${this.buttonPlay} was not displayed`,
    });
    await $(this.buttonPlay).click();
  }

  async pressButton(button) {
    await browser.keys(button);
  }

  async getLocationOfElement(selector, prop) {
    let propElem = await $(selector).getLocation(prop);
    return propElem;
  }

  async performActions(actions) {
    await browser.performActions(actions);
  }
}

module.exports = new BaseMethods();
