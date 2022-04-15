const baseMethods = require('./BaseMethods');

const ball = '#ball';
const pad = '#pad';
const propX = 'x';
const buttonA = ['a'];
const buttonD = ['d'];

describe('The game', function () {
  before(async function () {
    await baseMethods.openURL();
    await baseMethods.clickButtonPlay();
  });

  it('should get more than 100 points ', async function () {
    await browser.waitUntil(
      async () => {
        let propBall = await baseMethods.getLocationOfElement(ball, propX);
        let propPad = await baseMethods.getLocationOfElement(pad, propX);

        if (propBall > propPad) {
          await baseMethods.performActions(
            await baseMethods.pressButton(buttonD)
          );
        } else if (propPad > propBall) {
          await baseMethods.performActions(
            await baseMethods.pressButton(buttonA)
          );
        }

        const points = parseInt(await $('#points').getText(), 10);
        if (points > 100) return true;
        console.log({ points });
      },
      { timeout: 600000, interval: 10 }
    );
  });
});

// npx wdio run ./wdio.conf.js
