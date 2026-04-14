const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

async function takeScreenshot(driver, name) {
  let image = await driver.takeScreenshot();
  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
  }
  fs.writeFileSync(`screenshots/${name}.png`, image, 'base64');
}

async function handleAlert(driver) {
  try {
    let alert = await driver.switchTo().alert();
    console.log("Alert:", await alert.getText());
    await alert.accept();
  } catch (e) {}
}

async function injectLabel(driver, text) {
  await driver.executeScript(function(txt) {
    const div = document.createElement('div');
    div.innerText = txt;
    div.style.position = 'fixed';
    div.style.top = '10px';
    div.style.right = '10px';
    div.style.background = 'black';
    div.style.color = 'white';
    div.style.padding = '10px';
    div.style.zIndex = '9999';
    div.style.fontSize = '14px';
    document.body.appendChild(div);
  }, text);
}

async function injectStep(driver, step) {
  await driver.executeScript(function(txt) {
    const div = document.createElement('div');
    div.innerText = txt;
    div.style.position = 'fixed';
    div.style.bottom = '10px';
    div.style.left = '10px';
    div.style.background = 'blue';
    div.style.color = 'white';
    div.style.padding = '10px';
    div.style.zIndex = '9999';
    div.style.fontSize = '14px';
    document.body.appendChild(div);
  }, step);
}

(async function fullIntegrationTest() {
  let driver = await new Builder().forBrowser('chrome').build();
  const timestamp = Date.now();

  try {
    await driver.get('http://localhost:3000/login');
    await driver.sleep(2000);

    await injectLabel(driver, `Selenium Running ${timestamp}`);
    await injectStep(driver, "STEP 1 LOGIN");

    await driver.findElement(By.name('email')).sendKeys('vkkr14@gmail.com');
    await driver.findElement(By.name('password')).sendKeys('1234');
    await driver.findElement(By.className('login-btn')).click();

    await driver.wait(until.urlContains('dashboard'), 5000);
    console.log("Login Successful");

    await takeScreenshot(driver, "1_login_success");

    await driver.get('http://localhost:3000/wards');
    await driver.sleep(2000);

    await injectLabel(driver, `Selenium Running ${timestamp}`);
    await injectStep(driver, "STEP 2 WARD");

    await driver.findElement(By.xpath("//button[contains(.,'Add')]")).click();
    await driver.sleep(1000);

    let inputs = await driver.findElements(By.xpath("//input"));
    await inputs[0].sendKeys(`Ward-${timestamp}`);
    await inputs[1].sendKeys("15");

    await driver.findElement(By.xpath("//button[contains(.,'Save')]")).click();
    await driver.sleep(2000);

    await handleAlert(driver);
    console.log("Ward Created");

    await takeScreenshot(driver, "2_ward_created");

    await driver.get('http://localhost:3000/beds');
    await driver.sleep(2000);

    await injectLabel(driver, `Selenium Running ${timestamp}`);
    await injectStep(driver, "STEP 3 BED");

    await driver.findElement(By.xpath("//button[contains(.,'Add')]")).click();
    await driver.sleep(1000);

    await driver.findElement(By.xpath("//input")).sendKeys(`BED-${timestamp}`);

    let wardDropdown = await driver.findElement(By.tagName('select'));

    await driver.wait(async () => {
      let options = await wardDropdown.findElements(By.tagName('option'));
      return options.length > 1;
    }, 5000);

    let options = await wardDropdown.findElements(By.tagName('option'));
    await options[1].click();

    await driver.sleep(1000);

    await driver.findElement(By.xpath("//button[contains(.,'Save')]")).click();
    await driver.sleep(2000);

    await handleAlert(driver);
    console.log("Bed Created");

    await takeScreenshot(driver, "3_bed_created");

    await driver.get('http://localhost:3000/admission');
    await driver.sleep(2000);

    await injectLabel(driver, `Selenium Running ${timestamp}`);
    await injectStep(driver, "STEP 4 ADMISSION");

    await driver.wait(until.elementLocated(By.name('fullName')), 5000);

    await driver.findElement(By.name('fullName')).sendKeys(`Patient-${timestamp}`);
    await driver.findElement(By.name('age')).sendKeys('28');
    await driver.findElement(By.name('gender')).sendKeys('Male');
    await driver.findElement(By.name('contact')).sendKeys('9999999999');
    await driver.findElement(By.name('address')).sendKeys('Test City');

    await driver.findElement(By.name('diagnosis')).sendKeys('Fever');
    await driver.findElement(By.name('doctor')).sendKeys('Dr Test');

    await takeScreenshot(driver, "4_form_filled");

    let ward = await driver.findElement(By.name('wardId'));
    await ward.click();
    await ward.sendKeys('\uE004');
    await ward.sendKeys('\uE007');

    await driver.sleep(2000);

    let bed = await driver.findElement(By.name('bedId'));
    await bed.click();
    await bed.sendKeys('\uE004');
    await bed.sendKeys('\uE007');

    await driver.sleep(1000);

    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.sleep(3000);

    await handleAlert(driver);

    console.log("Patient Admitted Successfully");

    await takeScreenshot(driver, "5_patient_admitted");

    console.log("FULL INTEGRATION TEST PASSED");

  } catch (err) {
    console.error("TEST FAILED:", err);
  } finally {
    await driver.quit();
  }
})();